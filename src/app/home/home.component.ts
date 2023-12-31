import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from 
   "../housing-location/housing-location.component";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housing-location";


@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter (input)="filterResults(filter.value)"/>
        <!-- ถ้าข้อมูลมากไม่ควรใช้  (input)="filterResults(filter.value) ควรใช้ button Search มากกว่า-->
        <button class="primary" type="button"
                (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <!-- สำคัญ -->
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation"
        (notify)="notifyFromChild($event)"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ["./home.component.css"],
})


export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredLocationList: HousingLocation[] = [];
  //housingService: HousingService = inject(HousingService);


  constructor(private housingService: HousingService) {
    this.housingService.getAllHousingLocations()
      .then((housingLocationList: HousingLocation[]) => {
        this.housingLocationList = housingLocationList;
        this.filteredLocationList = housingLocationList;
      });
  }
  


  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }


    this.filteredLocationList = this.housingLocationList.filter(
      (housingLocation) =>
        housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }

  notifyFromChild(evt : any){
    console.log('notify From Child ' + evt);
  }
}



