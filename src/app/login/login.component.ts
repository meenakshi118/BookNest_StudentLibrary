import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // <-- add this
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  showAdminDashboard = false;

  constructor(private router: Router) {}


  login() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
    this.router.navigate(['/admin-dashboard']);
  }
}
