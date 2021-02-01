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
  environmentData$ = this.cussService.environment_received;
  components$ = this.cussService.components$;
  alive: boolean = true;

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
