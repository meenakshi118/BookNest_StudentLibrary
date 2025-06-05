// src/app/services/library.service.ts
import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private baseUrl = 'http://localhost:8070/assignedBooks'; // update base URL to match your backend

  constructor(private http: HttpClient) {}

   // Assign books to a student
   issueBooks(studentId: string, isbns: string[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/issue/${studentId}`, isbns, { headers });
  }

  // Return a book for a student
  returnBook(bookIsbn: string, studentId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/return/${bookIsbn}/${studentId}`, {});
  }

  // Get all assigned books
  getAllAssignedBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  

  // Get books assigned to a student
  getAssignedBooks(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/assigned/${studentId}`);
  }
  
  getStudentHistory(studentId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/history/${studentId}`);
}

}
