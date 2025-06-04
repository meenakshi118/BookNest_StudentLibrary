import { Component }      from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule }   from '@angular/router';
import { Router }         from '@angular/router';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  constructor(private router: Router) {}

  openStudentPanel() {
    console.log('openStudentPanel called');
    this.router.navigate(['/student-panel']);
  }
  openBookPanel() {
    this.router.navigate(['/book-detail-panel']);
  }
  openAssignBookPanel() {
    this.router.navigate(['/student-list-panel']);
  }
  returnBookPanel(){
    this.router.navigate(['/return-book-panel'])
  }
}

