import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibraryService } from '../services/library.service';
import { StudentService, Student } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-return-book-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './return-book-panel.component.html',
  styleUrls: ['./return-book-panel.component.css']
})
export class ReturnBookPanelComponent implements OnInit {
  studentId!: string;
  studentData?: Student;
  allIssuedBooks: any[] = [];
  filteredBooks: any[] = [];
  searchIsbn: string = '';
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.studentId = params['studentId'];
      if (this.studentId) {
        this.fetchStudentData(this.studentId);
        this.fetchIssuedBooks();
      } else {
        this.errorMessage = 'Student ID not found in URL.';
      }
    });
  }

  fetchStudentData(id: string): void {
    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.studentData = student;
      },
      error: () => {
        this.studentData = undefined;
        this.errorMessage = 'Failed to load student details.';
      }
    });
  }

  fetchIssuedBooks(): void {
    this.loading = true;
    this.libraryService.getStudentHistory(this.studentId).subscribe({
      next: (books) => {
        this.allIssuedBooks = books.filter(book => book.status === 'ISSUED');
        this.filteredBooks = [...this.allIssuedBooks];
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load issued books.';
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    const query = this.searchIsbn.toLowerCase();
    this.filteredBooks = this.allIssuedBooks.filter(book =>
      book.bookIsbn.toLowerCase().includes(query)
    );
  }

  getProfileImageUrl(): string {
    return this.studentData
      ? this.studentService.getProfileImageUrl(this.studentData.id!)
      : 'assets/images/default-profile.png';
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/default-profile.png';
  }

  viewHistory(studentId: string) {
    this.router.navigate(['/student-history', studentId]);
  }

  returnBook(bookIsbn: string): void {
    this.libraryService.returnBook(bookIsbn, this.studentId).subscribe({
      next: () => {
        this.allIssuedBooks = this.allIssuedBooks.filter(b => b.bookIsbn !== bookIsbn);
        this.onSearchChange();
        alert(`Book with ISBN ${bookIsbn} returned successfully.`);
      },
      error: () => {
        alert('Failed to return the book.');
      }
    });
  }
}
