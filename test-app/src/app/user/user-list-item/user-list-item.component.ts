import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { User } from 'src/assets/model/user';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.scss']
})
export class UserListItemComponent implements OnInit {

  @Input() user: User;

  @Output() userSelected = new EventEmitter<string>();
  @Output() userDeleted = new EventEmitter<number>();

  constructor() {
    this.user = {
      username: '',
      password: '',
      fname:'',
      lname:'',
      email:'', 
    };
   }

  onSelectClick(): void {
    this.userSelected.emit(this.user.username);
  }

  onDeleteClick(): void {
    this.userDeleted.emit(this.user.id);
  }

  ngOnInit(): void {
    
  }
  
}
