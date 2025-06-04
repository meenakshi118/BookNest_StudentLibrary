import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student-list-panel',
  standalone: true,
  imports: [CommonModule,FormsModule], // <-- Add this
  templateUrl: './student-list-panel.component.html',
  styleUrls: ['./student-list-panel.component.css']
})

export class StudentListPanelComponent implements OnInit {
  students: any[] = [];
  searchQuery: string = '';

 constructor(
  private studentService: StudentService,
  private router: Router // Inject Router here
) {}

  ngOnInit(): void {
    this.studentService.getAll().subscribe((data: any[]) => {
      this.students = data;
    
    });
  }

  filteredStudents(): any[] {
    const q = this.searchQuery.toLowerCase();
    return this.students.filter(s =>
      s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q)
    );
  }

  getProfileImageUrl(studentId: string): string {
  return this.studentService.getProfileImageUrl(studentId);
}

  selectStudent(student: any) {
    // navigate or open assign-book panel
    console.log('Selected student:', student);
    this.router.navigate(['/book-assign-panel', student.id]);
    
  }
  onImageError(event: any) {
  event.target.src = 'assets/images/default-profile.png';
}

}
