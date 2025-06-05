
import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-book-detail-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './book-detail-panel.component.html',
  styleUrls: ['./book-detail-panel.component.css']
})
export class BookDetailPanelComponent implements OnInit {

  bookForm!: FormGroup;
  books: any[] = [];
  isEditMode = false;
  selectedBookId: string = '';
  searchQuery: string = '';
  successMessage: string = '';


  constructor(private fb: FormBuilder, private bookService: BookService) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      authorName: ['', Validators.required],
      edition: [''],
      publisher: [''],
      isbn: ['', Validators.required],
      category: [''],
      language: [''],
      pages: [0],
      totalCopies: [0],
      availableCopies: [0],
      publishedDate: [''],
      addedDate: [''],
      rackNumber: [''],
      status: ['Available']
    });

    this.getBooks();
  }

   getBooks(): void {
  this.bookService.getBooks()
    .subscribe({
      next: data => {
        this.books = data;
      },
      error: err => alert('Failed to load books')
    });
}


  onSubmit(): void {
  if (this.bookForm.invalid) return;

  const bookData: any = this.bookForm.value;

  if (this.isEditMode) {
    this.bookService.updateBook(this.selectedBookId, bookData).subscribe({
      next: (book) => {
        this.getBooks();
        this.resetForm();
        this.successMessage = 'Book updated successfully!';
        // Clear message after 3 seconds
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => alert('Failed to update book')
    });
  } else {
    this.bookService.addBook(bookData).subscribe({
      next: (Book) => {
        this.getBooks();
        this.resetForm();
        this.successMessage = 'Book added successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: () => alert('Failed to add book')
    });
  }
}


 
editBook(book: any): void {
  this.isEditMode = true;
  this.selectedBookId = book.id ?? '';
  this.bookForm.patchValue(book);
  this.successMessage = ''; // clear any old messages
}


  deleteBook(id: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.getBooks(),
        error: () => alert('Failed to delete book')
      });
    }
  }

  resetForm(): void {
  this.bookForm.reset({
    title: '',
    authorName: '',
    edition: '',
    publisher: '',
    isbn: '',
    category: '',
    language: '',
    pages: 0,
    totalCopies: 0,
    availableCopies: 0,
    publishedDate: '',
    addedDate: '',
    rackNumber: '',
    status: ''
  });

  this.isEditMode = false;         // Ensure Add mode is active
  this.selectedBookId = '';
  this.successMessage = '';        // Clear previous success messages
}

 

get filteredBooks() {
  if (!this.searchQuery) return this.books;
  return this.books.filter(book =>
    Object.values(book).some(val =>
      String(val).toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  );
}



}
