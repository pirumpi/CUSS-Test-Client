import { Component, OnInit, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { CussService } from "./services/cuss.service";
import { RequiredDevices } from "./interfaces/requiredDevices";
import { EnvironmentComponent } from "./interfaces/environmentComponent";
import { ComponentName } from "./interfaces/componentNames";
import { ApplicationStates } from "./interfaces/models";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  environmentData$: BehaviorSubject<boolean> = this.cussService
    .environment_received;
  components$: BehaviorSubject<EnvironmentComponent[]> = this.cussService
    .components$;
  query_completed: BehaviorSubject<boolean> = this.cussService.query_completed;
  token$: BehaviorSubject<boolean> = this.cussService.token_received;
  listener_created$: BehaviorSubject<boolean> = this.cussService
    .listener_created;
  component_validation_completed: BehaviorSubject<boolean> = this.cussService
    .component_validation_completed;
  alive: boolean = true;
  validation_completed: BehaviorSubject<boolean> = this.cussService
    .component_validation_completed;
  available: BehaviorSubject<boolean> = this.cussService
    .available_event_received;
  unavailable: BehaviorSubject<boolean> = this.cussService
    .unavailable_event_received;
  wrongstate: BehaviorSubject<boolean> = this.cussService
    .wrong_state_event_received;

  requiredDevices: RequiredDevices[] = [
    { name: ComponentName.BARCODE_READER, found: false, status: false },
    { name: ComponentName.BAGTAG_PRINTER, found: false, status: false },
    { name: ComponentName.BOARDINGPASS_PRINTER, found: false, status: false }
  ];

  constructor(private cussService: CussService) {}

  async ngOnInit() {
    /**
     * CUSS 2.0 Sequence
     */
    // get token
    await this.cussService.getToken();

    // stablish listener
    // TODO - Update token sending flow
    await this.cussService.getListener();
    // listen for CUSS Events
    this.cussService.setMessageHandler();
    // get environment
    await this.cussService.getEnvironment();
    // query all devices after receiving components
    this.components$
      .pipe(takeWhile(() => this.alive))
      .subscribe(async (list: any) => {
        await this.cussService.queryComponents();
      });
    // wait for the query process to be completed
    this.cussService.query_completed
      .pipe(takeWhile(() => this.alive))
      .subscribe((completed) => {
        if (completed) {
          console.log("Query Completed");
          // find required devices
          this.cussService.findRequiredDevices(this.requiredDevices);
        }
      });
    // all component verification completed
    this.component_validation_completed
      .pipe(takeWhile(() => this.alive))
      .subscribe((done) => {
        // all components were found and available
        if (done) {
          console.log("Application moving to an available state");
          if (
            !this.requiredDevices.filter((d) => !d.status || !d.found).length
          ) {
            this.cussService.stateRequest(ApplicationStates.AVAILABLE, {
              applicationBrand: "",
              executionMode: "MAM",
              accessibleMode: false,
              executionOptions: "",
              languageID: "en-US",
              transferData: ""
            });
          } else {
            this.cussService.stateRequest(ApplicationStates.UNAVAILABLE, {
              applicationBrand: "",
              executionMode: "MAM",
              accessibleMode: false,
              executionOptions: "",
              languageID: "en-US",
              transferData: ""
            });
          }
        }
      });

    // get components
    await this.cussService.getComponents();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
