import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent implements AfterViewInit {

  @ViewChild('checkbox') checkbox!: ElementRef;

  @Input() checked: boolean = false;

  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngAfterViewInit(): void {
    if (this.checkbox && this.checkbox.nativeElement) {
      this.checkbox.nativeElement.checked = this.checked;
    }
  }

  onChange(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.checked = isChecked;
    this.change.emit(isChecked);
  }

}
