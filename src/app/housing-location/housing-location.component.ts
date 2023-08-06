import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocation } from '../housing-location';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-housing-location",
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
      />
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p class="listing-location">
        {{ housingLocation.city }}, {{ housingLocation.state }}
      </p>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
      <button (click)="test()">TEST</button>
    </section>
  `,
  styleUrls: ["./housing-location.component.css"],
})

export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;//ออกสอบ
  @Output() notify: EventEmitter<string> = new EventEmitter();

  test(){
    this.notify.emit(this.housingLocation.name);
  }
}

