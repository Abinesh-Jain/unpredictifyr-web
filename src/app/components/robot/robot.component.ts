import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-robot',
  standalone: true,
  imports: [],
  templateUrl: './robot.component.html',
  styleUrl: './robot.component.scss'
})
export class RobotComponent {

  @Input() name!: String;

  @ViewChild('robot') robot!: ElementRef;

  onImageLoaded(event: any, loaded: boolean) {
    const element: HTMLElement = this.robot.nativeElement;
    if (loaded) {
      element.classList.remove('d-none');
    } else {
      element.classList.add('d-none');
    }
  }
}
