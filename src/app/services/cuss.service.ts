import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CussService {
  token: string = null;
  baseURL = "http://localhost:22222";
  cuss_env: any = null;
  socket: any = null;
  /**
   * Help to track how many components to query
   */
  queryPending = [];
  /**
   * Events subscriptions coming from CUSS Platform
   */
  cuss_events: BehaviorSubject<any> = new BehaviorSubject<any>({});
  /**
   * CUSS Websocket connection got disconnected
   */
  close_socket: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * Components Subscription triggers when components data is received from CUSS Platform
   */
  components$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  components_received: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  /**
   * Environment Subscription triggers when the environment data is received from CUSS Platform
   */
  environment$: BehaviorSubject<{}> = new BehaviorSubject<{}>({});
  environment_received: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  /**
   * Subcription tiggres when all compenet queries are received from CUSS Platform
   */
  query_completed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  /**
   * Application is ready to move to AVAILABLE
   */
  app_ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * Application was unable to find all required devices or required devices became unhealthy
   */
  app_failed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  /**
   * Retrieve a token from the CUSS Oauth Server using a client
   * id and client secret
   */
  getToken(): any {
    return this.http
      .post(`${this.baseURL}/oauth/token`, {
        client_id: "F9",
        client_secret: "6ab6323f-6212-40ca-bee7-a5f8dfebcf71"
      })
      .toPromise()
      .then((res: any) => {
        this.token = res.access_token;
        return true;
      });
  }

  /**
   * Connects the application to the CUSS Webocket server and generate listeners
   * for: Errors, Open, Message, Close
   */
  getListener() {
    return new Promise((rs, rj) => {
      this.socket = new WebSocket(
        `ws://localhost:22222/subscribe?access_token=${this.token}`
      );
      this.socket.addEventListener("open", () => {
        console.log("Socket open");
        rs("");
      });
      this.socket.addEventListener("error", (err) => {
        console.log("Socket error", err);
        this.close_socket.next(true);
        rs("");
      });
      this.socket.addEventListener("close", (evnt) => {
        console.log("Socket closed", evnt.reason);
        this.close_socket.next(true);
        rs("");
      });
      this.socket.addEventListener("message", (evnt: any) => {
        //console.log("Socket data", evnt);
        this.cuss_events.next(JSON.parse(evnt.data));
        rs("");
      });
    });
  }

  /**
   * Creating a handler for the events coming from the cuss platform
   */
  setMessageHandler() {
    this.cuss_events.subscribe((ev: any) => {
      console.log("CUSS", ev);
      if (ev.functionName === "environment") {
        this.environment$.next(ev.environmentLevel);
        this.environment_received.next(true);
      }
      if (ev.functionName === "components") {
        this.queryPending = ev.componentList.map((d) => d.id);
        this.components$.next(ev.componentList);
        this.components_received.next(true);
      }
      if (ev.functionName === "query") {
        this.updateDeviceState(ev);
      }
    });
  }

  /**
   * Helper function to generate authentication headers
   */
  getOauthHeader() {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`
    });
  }

  /**
   * Retrieve the cuss environment after stablishing the appropiate listener
   */
  getEnvironment(): any {
    return this.http
      .get(`${this.baseURL}/platform/environment`, {
        headers: this.getOauthHeader()
      })
      .toPromise();
  }

  /**
   * Retrieve the cuss component list
   */
  getComponents(): any {
    return this.http
      .get(`${this.baseURL}/platform/components`, {
        headers: this.getOauthHeader()
      })
      .toPromise();
  }

  queryComponents() {
    const calls = [];
    this.components_received.getValue().forEach((c) => {
      const url = `${this.baseURL}/peripherals/query/${c.componentID}`;
      console.log("URL", url);
      calls.push(
        this.http
          .get(url, {
            headers: this.getOauthHeader()
          })
          .toPromise()
      );
    });
  }

  /**
   * Helper function to update device status after queries or device changes
   * @param ev CUSSEvent events coming from cuss platform
   */
  updateDeviceState(ev) {
    const found = this.components_received
      .getValue()
      .find((c) => c.componentID === ev.componentID);
    if (found) {
      found["statusCode"] = ev.statusCode;
      found["eventCode"] = ev.eventCode;
      console.log("new Device", found);
      this.queryPending.splice(this.queryPending.indexOf(found.id), 1);
    }
    if (this.queryPending.length === 0) {
      this.query_completed.next(true);
    }
  }

  /**
   *
   */
  findRequiredDevices(requiredDevices) {}
}
