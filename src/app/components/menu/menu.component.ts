import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

export interface Option {
  label: string,
  onPressed: () => void,
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements AfterViewInit {

  @Input() label?: string;
  @Input() options: Option[] = [];

  @ViewChild('menu') menu!: ElementRef<HTMLButtonElement>;

  ngAfterViewInit(): void {
    this.menu.nativeElement.classList.remove('dropdown-toggle');
  }

}
