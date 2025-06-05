import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibraryService } from '../services/library.service';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-history.component.html',
  styleUrls: ['./student-history.component.css']
})
export class StudentHistoryComponent implements OnInit {
  studentId: string = '';
  studentName: string = '';
  history: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private studentService: StudentService // ✅ Injected correctly
  ) {}

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id') || '';

    if (this.studentId) {
      // Fetch student name
      this.studentService.getStudentById(this.studentId).subscribe({
        next: (data) => this.studentName = data.name,
        error: (err) => console.error('Error fetching student name', err)
      });

      // Fetch student history
      this.libraryService.getStudentHistory(this.studentId).subscribe({
        next: (data) => this.history = data,
        error: (err) => console.error('Error fetching history', err)
      });
    }
  }
}
