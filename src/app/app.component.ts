import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { CussService } from "./services/cuss.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  token: string = null;
  baseURL = "http://localhost:22222";
  cuss_env: any = null;
  socket: any = null;

  cuss_events: BehaviorSubject<any> = new BehaviorSubject<any>({});
  close_socket: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  components_received: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  query_completed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  app_ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  app_failed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  environmentData: any = null;
  components: any[];
  alive: boolean = true;
  queryPending = [];
  requiredDevices = [
    { name: "barcodeReader", found: false, status: false },
    { name: "boardingPassPrinter", found: false, status: false },
    { name: "bagtagPrinter", found: false, status: false }
  ];

  constructor(private http: HttpClient, private cussService: CussService) {}

  async ngOnInit() {
    /**
     * CUSS 2.0 Sequence
     */

    // get token
    // const { access_token } = await this.cussService.getToken();
    // this.token = access_token;

    // stablish listener
    // TODO - Update token sending flow
    // await this.cussService.getListener();

    // listen for CUSS Events
    //this.setMessageHandler();

    // get environment
    // await this.getEnvironment();

    // query all devices after receiving components
    this.components_received
      .pipe(takeWhile(() => this.alive))
      .subscribe(async (list: any) => {
        this.components = list;
        this.queryPending = list.map((d) => d.id);
        await this.queryComponents();
      });

    // get components
    // await this.getComponents();

    // find required devices
    this.query_completed
      .pipe(takeWhile(() => this.alive))
      .subscribe((completed) => {
        if (completed) {
          console.log("Query Completed");
          this.findRequiredDevices();
        }
      });
  }

  setMessageHandler() {
    this.cuss_events.pipe(takeWhile(() => this.alive)).subscribe((ev: any) => {
      console.log("CUSS", ev);
      if (ev.functionName === "environment") {
        this.environmentData = ev.environmentLevel;
      }
      if (ev.functionName === "components") {
        this.components_received.next(ev.componentList);
      }
      if (ev.functionName === "query") {
        this.updateDeviceState(ev);
      }
    });
  }

  getEnvironment(): any {
    return this.http
      .get(`${this.baseURL}/platform/environment`, {
        headers: this.getOauthHeader()
      })
      .toPromise();
  }

  getComponents(): any {
    return this.http
      .get(`${this.baseURL}/platform/components`, {
        headers: this.getOauthHeader()
      })
      .toPromise();
  }

  getOauthHeader() {
    return new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`
    });
  }

  queryComponents() {
    const calls = [];
    this.components.forEach((c) => {
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
    // Promise.all(calls).then((res) => {
    //   console.log("Devices Res", res);
    // });
  }

  updateDeviceState(ev) {
    const found = this.components.find((c) => c.componentID === ev.componentID);
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

  findRequiredDevices() {}

  ngOnDestroy() {
    this.alive = false;
  }
}
