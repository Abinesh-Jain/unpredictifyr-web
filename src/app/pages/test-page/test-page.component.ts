import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars/cars.service';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.scss'
})
export class TestPageComponent implements OnInit {

  cars: any[] = [];

  constructor(private carsService: CarsService) { }

  ngOnInit(): void {
    this.carsService.getCars().subscribe((response: any) => {
      const cars = response['results'] ?? [];
      this.cars = this.cars.concat(cars);
    })
  }


}
