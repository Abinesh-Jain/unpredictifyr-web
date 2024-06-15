import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PicsumDirective } from '../../directives/picsum/picsum.directive';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RobotComponent } from "../../components/robot/robot.component";

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  imports: [PicsumDirective, ReactiveFormsModule, CommonModule, RobotComponent, RouterModule]
})
export class LoginPageComponent implements OnInit, AfterViewInit {
  name = new FormControl('', Validators.required)

  constructor(private router: Router) { }


  ngOnInit(): void {
    const name = localStorage.getItem('name');
    if (name) this.name.setValue(this.tryParse(name));
  }

  tryParse(name: string) {
    try {
      return JSON.parse(name);
    } catch (error) {
      return name;
    }
  }

  ngAfterViewInit(): void {
    document.querySelector('input')?.focus();
  }

  submit() {
    if (this.name.valid) {
      localStorage.setItem('name', this.name.value!);
      this.router.navigate(['chat']);
    } else {
      document.querySelector('input')?.focus();
    }
  }

}
