import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { EnvironmentLevel } from "../interfaces/environmentLevel";
import { PlatformData } from "../interfaces/platformData";
import { EnvironmentComponent } from "../interfaces/environmentComponent";
import { componentFinder } from "./component-finder";
import { ApplicationActivation } from "../interfaces/applicationActivation";
import { ApplicationStates } from "../interfaces/models";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CussService {
  baseURL = environment.baseURL;
  cuss_env: any = null;
  socket: any = null;

  /**
   * Help track the retriving of the authentication token
   */
  token_received: BehaviorSubject<boolean> = new BehaviorSubject(false);
  token: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  /**
   * Help to track how many components to query
   */
  queryPending = [];
  /**
   * Event tracking when a listener is created
   */
  listener_created: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  /**
   * Events subscriptions coming from CUSS Platform
   */
  cuss_events: BehaviorSubject<PlatformData> = new BehaviorSubject<
    PlatformData
  >({});
  /**
   * CUSS Websocket connection got disconnected
   */
  close_socket: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * Components Subscription triggers when components data is received from CUSS Platform
   */
  components$: BehaviorSubject<EnvironmentComponent[]> = new BehaviorSubject<
    EnvironmentComponent[]
  >([]);
  components_received: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  /**
   * Environment Subscription triggers when the environment data is received from CUSS Platform
   */
  environment$: BehaviorSubject<EnvironmentLevel> = new BehaviorSubject<
    EnvironmentLevel
  >({});
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
   * Subcription tiggres when all application required components are verified
   */
  component_validation_completed: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);
  /**
   * Subject trigger when the available event gets returns from the cuss platform
   */
  available_event_received: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  /**
   * Subject trigger when the available event gets returns from the cuss platform
   */
  unavailable_event_received: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  /**
   * Subject trigger when the active event gets returns from the cuss platform
   */
  active_event_received: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  /**
   * Subject trigger when the stopped event gets returns from the cuss platform
   */
  stopped_event_received: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  /**
   * Subject trigger when the suspended event gets returns from the cuss platform
   */
  suspended_event_received: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  /**
   * Subject trigger when the wrong state event gets returns from the cuss platform
   */
  wrong_state_event_received: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
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
        this.token.next(res.access_token);
        this.token_received.next(true);

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
        `ws://localhost:22222/subscribe?access_token=${this.token.getValue()}`
      );
      this.socket.addEventListener("open", () => {
        console.log("Socket open");
        this.listener_created.next(true);
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
        this.cuss_events.next(JSON.parse(evnt.data) as PlatformData);
        rs("");
      });
    });
  }

  /**
   * Creating a handler for the events coming from the cuss platform
   */
  setMessageHandler() {
    this.cuss_events.subscribe((ev: PlatformData) => {
      console.log("CUSS", ev);
      if (ev.functionName === "environment") {
        this.environment$.next(ev.environmentLevel);
        console.log("Environment", ev.environmentLevel);
        this.environment_received.next(true);
      }
      if (ev.functionName === "components") {
        // keep a list of all available components ids
        this.queryPending = ev.componentList.map((d) => d.id);
        this.components$.next(ev.componentList);
        this.components_received.next(true);
      }
      if (ev.functionName === "query") {
        this.updateDeviceState(ev);
      }
      if (ev.currentApplicationState === ApplicationStates.AVAILABLE) {
        this.available_event_received.next(true);
      }
      if (ev.currentApplicationState === ApplicationStates.UNAVAILABLE) {
        this.unavailable_event_received.next(true);
      }
    });
  }

  /**
   * Helper function to generate authentication headers
   */
  getOauthHeader() {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token.getValue()}`
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

  /**
   * Query all the components returned from the get component call
   */
  queryComponents() {
    const calls = [];
    this.components$.getValue().forEach((c) => {
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
   * Request an application state transfer to the cuss platform
   * @param state desire state from the application to the platform
   * @param activation Application required state
   */
  stateRequest(state: ApplicationStates, activation: ApplicationActivation) {
    return this.http
      .post(
        `${this.baseURL}/platform/applications/staterequest/${state}`,
        activation,
        {
          headers: this.getOauthHeader()
        }
      )
      .toPromise();
  }

  /**
   * Update device status after queries or device changes and triggers the query_completed event when is done
   * @param ev CUSSEvent events coming from cuss platform
   */
  updateDeviceState(ev) {
    const found = this.components$
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
   * Check the availability of the required components and triggers the component_validation_completed when is done
   * @param requiredDevices required components for the application
   */
  findRequiredDevices(requiredDevices) {
    console.log(requiredDevices);
    componentFinder(requiredDevices, this.components$.getValue()).finally(() =>
      this.component_validation_completed.next(true)
    );
  }
}
