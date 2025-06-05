package com.example.studentmanagement.controller;

import com.example.studentmanagement.model.AssignedBook;
import com.example.studentmanagement.service.LibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})

@RestController
@RequestMapping("/assignedBooks")
public class LibraryController {

    private final LibraryService libraryService;

    // Constructor injection is preferred
    @Autowired
    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @PostMapping("/issue/{studentId}")
    public ResponseEntity<List<AssignedBook>> issueBooks(
            @PathVariable String studentId,
            @RequestBody List<String> isbns) {
        try {
            System.out.println("Student ID: " + studentId);
            System.out.println("Received ISBNs: " + isbns);
            List<AssignedBook> assignedBooks = libraryService.issueBooks(studentId, isbns);
            return ResponseEntity.ok(assignedBooks);
        } catch (Exception e) {
            e.printStackTrace(); // log full error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }



    @PutMapping("/return/{bookIsbn}/{studentId}")
    public ResponseEntity<AssignedBook> returnBook(@PathVariable String bookIsbn, @PathVariable String studentId) {
        AssignedBook returnedBook = libraryService.returnBook(bookIsbn, studentId);
        return ResponseEntity.ok(returnedBook);
    }

    @GetMapping
    public ResponseEntity<List<AssignedBook>> getAllAssignedBooks() {
        return ResponseEntity.ok(libraryService.getAllAssignedBooks());
    }

    @GetMapping("/history/{studentId}")
    public ResponseEntity<List<AssignedBook>> getAssignedBooksByStudentId(@PathVariable String studentId) {
        try {
            List<AssignedBook> history = libraryService.getAssignedBooksByStudentId(studentId);
            return ResponseEntity.ok(history);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
