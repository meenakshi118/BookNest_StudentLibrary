// book-assign.component.ts
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { LibraryService } from '../services/library.service';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-book-assign',
  standalone:true,
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './book-assign-panel.component.html',
  styleUrls: ['./book-assign-panel.component.css']
})
export class BookAssignPanelComponent implements OnInit {
  @Input() selectedStudent: any;
  books: any[] = [];
  selectedBooks: any[] = [];
  bookSearch: string = '';

   constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private libraryService: LibraryService,
    private studentService: StudentService //  Inject
  ) {}

  ngOnInit() {
    const studentId = this.route.snapshot.paramMap.get('id');
    
    console.log('Student ID:', studentId); 
    if (studentId) {
      this.studentService.getStudentById(studentId).subscribe(data => {
        this.selectedStudent = data; //  Fetch full student details
      });
    }

    this.fetchBooks();
  }

  
  fetchBooks() {
    this.bookService.getBooks().subscribe(data => {
      this.books = data;
    });
    
  }

  filteredBooks() {
    const term = this.bookSearch.toLowerCase();
    return this.books.filter(book =>
      book?.name?.toLowerCase().includes(term) ||
    book?.author?.toLowerCase().includes(term) ||//This ensures that if book, book.name, book.author, or book.isbn is undefined, it won't throw an error.
    book?.isbn?.toLowerCase().includes(term)
    );
  }

  isSelected(book: any): boolean {
    return this.selectedBooks.some(b => b.isbn === book.isbn);
  }

  onBookToggle(book: any) {
    if (this.isSelected(book)) {
      this.selectedBooks = this.selectedBooks.filter(b => b.isbn !== book.isbn);
    } else {
      this.selectedBooks.push(book);
    }
  }

  removeBook(book: any) {
    this.selectedBooks = this.selectedBooks.filter(b => b.isbn !== book.isbn);
  }

  assignBooks() {
  if (!this.selectedStudent || this.selectedBooks.length === 0) return;

  const studentId = this.selectedStudent.id;
  const isbns = this.selectedBooks.map(book => book.isbn);

  this.libraryService.issueBooks(studentId, isbns).subscribe({
    next: (res) => {
      console.log('Books issued:', res);
      alert('Books assigned successfully!');
      this.selectedBooks = [];
      this.fetchBooks(); // Refresh available books
    },
    error: (err) => {
      console.error('Error issuing books:', err);
      alert('Failed to assign books. Please try again.');
    }
  });
}
  getProfileImageUrl(studentId: string): string {
  return `http://localhost:8070/api/students/${studentId}/profile-image`;
}

onImageError(event: Event) {
  // fallback if image not found or error
  (event.target as HTMLImageElement).src = 'assets/images/default-profile.png';
}

}
