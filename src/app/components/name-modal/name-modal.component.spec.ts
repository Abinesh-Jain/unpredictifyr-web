import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameModalComponent } from './name-modal.component';

describe('NameModalComponent', () => {
  let component: NameModalComponent;
  let fixture: ComponentFixture<NameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
