import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

export interface Option {
  label: string,
  onPressed: () => void,
  icon?: string,
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgbDropdownModule, CommonModule, NgbTooltipModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements AfterViewInit {

  @Input() icon: string = 'three-dots-vertical';
  @Input() label?: string;
  @Input() options: Option[] = [];
  @Input() placement = 'start';

  @ViewChild('menu') menu!: ElementRef<HTMLButtonElement>;

  ngAfterViewInit(): void {
    this.menu.nativeElement.classList.remove('dropdown-toggle');
  }

}
