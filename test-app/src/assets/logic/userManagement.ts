import { User } from '../model/user';

export class UserManagement{
    showError: boolean;

    userNameInput: string;
    userPassInput: string;
    userFNameInput: string;
    userLNameInput: string;
    userEmailInput: string;

    users: User[] = [
        {
          "username": "maman59",
          "password": "maman98",
          "fname": "David",
          "lname": "Peterbough",
          "email": "maman@gmail.com"
        },
        {
          "username": "maman68",
          "password": "maman68",
          "fname": "Viktor",
          "lname": "Gill",
          "email": "davar@gmail.com"
        },
        {
          "username": "some_stupid_username",
          "password": "some_stupid_password",
          "fname": "George",
          "lname": "Smith",
          "email": "george.smith@gmail.com"
        }
      ];
      userOnAddClick(): void {
        if (!this.userNameInput
          || !this.userNameInput.trim()
          || !this.userPassInput
          || !this.userPassInput.trim()
          || !this.userFNameInput
          || !this.userFNameInput.trim()
          || !this.userLNameInput
          || !this.userLNameInput.trim()
          || !this.userEmailInput
          || !this.userEmailInput.trim()
        ) {
          this.showError = true;
    
          return;
        }
    
        this.users.push({
          username: this.userNameInput,
          password: this.userPassInput,
          fname: this.userFNameInput,
          lname: this.userLNameInput,
          email: this.userEmailInput
        });
    
        this.userNameInput = null;
        this.userPassInput = null;
        this.userFNameInput = null;
        this.userLNameInput = null;
        this.userEmailInput = null;
      }
    
      userOnRemoveClick(index: number): void {
        delete this.users[index];
      }
    
      onRemoveByLastClick() {
        this.users.pop();
      }
    
  
}