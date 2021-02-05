import { Component, OnInit, OnDestroy } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { CussService } from "./services/cuss.service";
import { RequiredDevices } from "./interfaces/requiredDevices";
import { EnvironmentComponent } from "./interfaces/environmentComponent";
import { ComponentName } from "./interfaces/componentNames";

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
  alive: boolean = true;

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
    // find required devices
    this.cussService.query_completed
      .pipe(takeWhile(() => this.alive))
      .subscribe((completed) => {
        if (completed) {
          console.log("Query Completed");
          this.cussService.findRequiredDevices(this.requiredDevices);
        }
      });
    // get components
    await this.cussService.getComponents();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
