import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars/cars.service';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FilePickerComponent } from "../../components/file-picker/file-picker.component";

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, FilePickerComponent],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent implements OnInit {

  cars: any[] = [];
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.carsService.getCars().subscribe((response: any) => {
      const cars = response['results'] ?? [];
      this.cars = this.cars.concat(cars);
    })
  }


}
