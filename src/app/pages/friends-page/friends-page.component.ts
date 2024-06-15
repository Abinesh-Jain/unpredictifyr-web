import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ChatPageComponent } from "../chat-page/chat-page.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-friends-page',
  standalone: true,
  templateUrl: './friends-page.component.html',
  styleUrl: './friends-page.component.scss',
  imports: [CommonModule, ChatPageComponent, NavbarComponent]
})
export class FriendsPageComponent implements OnInit {

  users = [];
  selectedUser: any;
  subscriptions: Subscription[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.userService.getUsers().subscribe((res: any) => {
      this.users = res['results'];
    }))
  }

  selectUser(event: any, user: any) {
    this.selectedUser = !this.selectedUser ? user : this.selectedUser == user ? undefined : user;
  }

}
