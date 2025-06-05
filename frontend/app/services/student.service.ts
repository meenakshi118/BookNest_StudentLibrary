//This service is responsible for interacting with your backend API to perform CRUD (Create, Read, Update, Delete) operations on Student data

import { HttpClient } from '@angular/common/http'; // For HTTP communication
import { Injectable } from '@angular/core';        // To make this class injectable
import { Observable } from 'rxjs';                  // To represent asynchronous data streams

//HttpClient is Angular's built-in HTTP client for sending requests to servers.
//Injectable marks this class as a service that can be injected into components or other services.
//Observable is from RxJS; it represents a stream of data that can be observed asynchronously (like HTTP responses).

export interface Student {
  id?: string;
  name: string;
  email: string;
  phoneNo: string;
  age: number;
  address: string;
  profileImagePath?: string; 
  //id and profileImagePath are optional (?), because when adding a new student you might not have them yet.
}

@Injectable({
  providedIn: 'root',
})
//The @Injectable decorator with { providedIn: 'root' } means Angular creates a singleton instance of this service available application-wide without needing to add it to a module's providers explicitly.

export class StudentService {
  private apiUrl = 'http://localhost:8070/api/students';

  constructor(private http: HttpClient) {}//The HttpClient is injected into this service. This allows you to use this.http to perform HTTP requests.

  getAll(): Observable<Student[]> {//This method sends an HTTP GET request to http://localhost:8070/api/students.It returns an Observable of an array of Student objects.
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(id: string): Observable<Student> {
  return this.http.get<Student>(`${this.apiUrl}/info/${id}`);
}


  add(formData: FormData): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/add`, formData);
  }

  update(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.id}`, student);
  }

  updateWithFormData(id: string, formData: FormData): Observable<Student> {
  return this.http.put<Student>(`${this.apiUrl}/${id}`, formData);
}

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadProfileImage(id: string, file: FormData): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/${id}/upload-image`, file);
  }
  getProfileImageUrl(studentId: string) {
  // This could be a simple URL like `/api/students/${studentId}/profile-image`
  return `${this.apiUrl}/${studentId}/profile-image`;
}
  
}



/*overview of how your Angular frontend and Spring Boot backend interact via localhost:

1. Angular Frontend

Runs on your local machine (usually on http://localhost:4200 by default).

Provides the user interface (UI) for managing students: form inputs, listing students, edit/delete buttons, etc.

Uses HttpClientModule to make HTTP requests (GET, POST, PUT, DELETE) to your backend API.

Calls REST API endpoints like:

GET http://localhost:8070/api/students to fetch all students.

POST http://localhost:8070/api/students to add a new student.

PUT http://localhost:8070/api/students/{id} to update a student.

DELETE http://localhost:8070/api/students/{id} to delete a student.

POST http://localhost:8070/api/students/{id}/upload-image to upload a profile image.

2. Spring Boot Backend

Runs on your local machine or server (in your case, http://localhost:8070).

Exposes RESTful endpoints (/api/students) to handle database operations.

Contains:

StudentController — Handles HTTP requests and responses.

StudentService — Business logic layer.

StudentRepository — Data access layer interacting with your database.

Stores data persistently in a database.

Processes the image upload and stores the profile picture.

Sends back JSON responses to Angular.

3. Communication
Angular frontend calls the Spring Boot backend APIs over HTTP.

Backend responds with data or status codes.

Angular updates the UI based on backend responses.

4. Why localhost?
During development, both apps run locally on your machine but on different ports:

Angular: usually 4200

Spring Boot: often 8070 or 8080

This separation helps keep frontend and backend loosely coupled.

For production, you might deploy both on the same domain or separate servers.

5. CORS
Since frontend and backend are on different ports, you must enable CORS (Cross-Origin Resource Sharing) in Spring Boot.

It allows the Angular app to call backend APIs without browser blocking due to different origins.

*/