import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { catchError, throwError } from 'rxjs';

import { StudentService, Student } from '../services/student.service';//Because you go up one folder (..) from student/ to app/ then into services/.
//Angular's Component and OnInit lifecycle hook.
//FormBuilder and FormGroup to work with reactive forms.
//The StudentService and the Student interface for type safety and API communication.

import { CommonModule } from '@angular/common'; // Import for directives like *ngIf
//CommonModule is an Angular module from @angular/common.It provides many common directives and pipes like:Structural directives: *ngIf, *ngFor Attribute directives: ngClass, ngStyle Pipes: DatePipe, CurrencyPipe, etc.
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-student-panel',
  
  template: `<h2>Student Panel works!</h2>`,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HttpClientModule],
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.css']
})
export class StudentComponent implements OnInit {

    updateMessage: string = '';       // <-- Add this to hold update success message
    lastUpdatedStudentId: string | null = null;  // To track which student was updated
    
    
    student = {
      id: '',
      name: '',
      email: '',
      phoneNo: '',
      age: '',
      address: ''
    };
    studentForm!: FormGroup;
    students: Student[] = [];
    selectedStudentId: string | null = null;
    selectedFile!: File;
    
    constructor(private fb: FormBuilder, private studentService: StudentService) {}//Injects FormBuilder to create the form and StudentService to make HTTP calls.
    
 ngOnInit(): void {
      //Called when the component is initialized.nitializes the form and fetches all students from the server.
      
      this.initForm();
      this.fetchStudents();
    }
    
    //Form initialization
  initForm(): void {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      age: ['', [Validators.required, Validators.min(1)]],
      address: ['', Validators.required]
    });
  }

  
  searchQuery: string = '';

  get filteredStudents() {
      if (!this.searchQuery) return this.students;
      return this.students.filter(stu =>
        stu.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
  }


  //fetch all students.
  fetchStudents(): void {
      this.studentService.getAll().subscribe(data => this.students = data);
  }

  //handle submission
  onSubmit(): void {
        if (this.selectedStudentId) {
          const updatedStudent: Student = {
            id: this.selectedStudentId,
            ...this.studentForm.value
          };
          const formData = new FormData();
          formData.append('student', new Blob([JSON.stringify(updatedStudent)], {
            type: 'application/json'
          }));
          if (this.selectedFile) {
            formData.append('profileImage', this.selectedFile);
          }

          this.studentService.updateWithFormData(this.selectedStudentId, formData).subscribe(() => {
              this.updateMessage = 'Successfully updated!';
              this.lastUpdatedStudentId = this.selectedStudentId;  // Track updated student
              this.resetForm();
              this.fetchStudents();
          
              // Optionally clear the message after a few seconds
              setTimeout(() => {
                this.updateMessage = '';
                this.lastUpdatedStudentId = null;
              }, 3000);
            });

            } else {
        const newStudentEmail = this.studentForm.get('email')?.value?.trim().toLowerCase();

        if (!newStudentEmail) {
          this.updateMessage = 'Email is required.';
          setTimeout(() => this.updateMessage = '', 3000);
          return;
        }

        const emailExists = this.students.some(
          stu => stu.email?.toLowerCase() === newStudentEmail
        );

        if (emailExists) {
          this.updateMessage = 'User with this email already exists.';
          setTimeout(() => this.updateMessage = '', 3000);
          return;
        }

        const newStudent: Student = this.studentForm.value;

        const formData = new FormData();
        formData.append('student', new Blob([JSON.stringify(newStudent)], {
          type: 'application/json'
        }));
        if (this.selectedFile) {
          formData.append('profileImage', this.selectedFile);
        }

        this.studentService.add(formData).subscribe({
          next: (student) => {
          

            this.updateMessage = 'Student added successfully!';
            this.fetchStudents();
            this.resetForm();

            setTimeout(() => this.updateMessage = '', 3000);
          },
          error: (err) => {
            console.error('Error adding student:', err);
            this.updateMessage = 'Error adding student. Please try again.';
            setTimeout(() => this.updateMessage = '', 3000);
          }
        });
        }

        }



  previewImageUrl: string | ArrayBuffer | null = null;
  

  // onFileChange updated to generate preview 
  //handle file input :Captures a selected image file when a user chooses it via an <input type="file">.
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.previewImageUrl = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  editStudent(student: Student): void {
    this.selectedStudentId = student.id!;
    this.previewImageUrl = null; // clear any previous preview

    // Patch reactive form values
    this.studentForm.patchValue({
      name: student.name,
      email: student.email,
      phoneNo: student.phoneNo,
      age: student.age,
      address: student.address
    });

    this.selectedFile = undefined as any; // Clear selected file
  }

  resetForm(): void {
    this.studentForm.reset();
    this.studentForm.markAsPristine();
    this.studentForm.markAsUntouched();
    this.selectedStudentId = null;
    this.selectedFile = undefined as any;
    this.previewImageUrl = null;
    this.updateMessage = '';
    this.lastUpdatedStudentId = null;

    // Also clear search query
    this.searchQuery = '';

    // Optionally reload students from server to refresh data if needed
    this.fetchStudents();
  }



  deleteStudent(id: string): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.delete(id).subscribe(() => {
        this.fetchStudents();
        this.resetForm();
      });
    }
  }
  


  onImageError(event: Event): void {
  (event.target as HTMLImageElement).src = 'assets/images/default-profile.png'; // Use a placeholder icon path
}

  uploadProfileImage(studentId: string): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('profileImage', this.selectedFile);
      this.studentService.uploadProfileImage(studentId, formData).subscribe();
    }
  }

  imageUrls: { [id: string]: string } = {};

getImageUrl(id: string): string {
  if (!this.imageUrls[id]) {
    this.imageUrls[id] = `http://localhost:8070/api/students/${id}/profile-image?ts=${Date.now()}`;
  }
  return this.imageUrls[id];
}

// When you want to refresh the image URL (e.g., after update)
refreshImageUrl(id: string): void {
  this.imageUrls[id] = `http://localhost:8070/api/students/${id}/profile-image?ts=${Date.now()}`;
}
}


/*
1.How do Standalone Components relate to CommonModule?

Since standalone components don’t belong to a module, they need to explicitly import any dependencies, including CommonModule, inside their imports array.

Without importing CommonModule (or other relevant modules), you cannot use directives like *ngIf or *ngFor in that standalone component’s template.

2. What is a Standalone Component in Angular?

Angular traditionally organizes code into NgModules — collections of components, directives, pipes, and services. You import and export these modules to manage dependencies.

Standalone Component (introduced in Angular 14):
Standalone components are components that don't need to be declared inside an NgModule.

They can directly declare their dependencies (like other components, directives, pipes) inside their own imports array.

This means you can use a component without wrapping it inside a module.

It simplifies module management, reduces boilerplate, and improves tree-shaking (removing unused code).*/