

import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; // ✅ Import ActivatedRoute

@Component({
  selector: 'app-student-list-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-list-panel.component.html',
  styleUrls: ['./student-list-panel.component.css']
})
export class StudentListPanelComponent implements OnInit {
  students: any[] = [];
  searchQuery: string = '';
  mode: string = 'assign';

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute // ✅ Inject route to read queryParams
  ) {}

  ngOnInit(): void {
    // ✅ Read the mode from query params
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'] || 'assign';
    });

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

  selectStudent(student: any): void {
    if (this.mode === 'assign') {
      console.log('Selected student:', student);
    this.router.navigate(['/book-assign-panel', student.id]);

    } else if (this.mode === 'return') {
      this.router.navigate(['/return-book-panel'], {
        queryParams: { studentId: student.id }
      });
    }
  }

  onImageError(event: any) {
    event.target.src = 'assets/images/default-profile.png';
  }
}
