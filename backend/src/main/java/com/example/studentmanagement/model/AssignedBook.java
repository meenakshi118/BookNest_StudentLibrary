package com.example.studentmanagement.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@Document(collection = "assignedBooks")
public class AssignedBook {

    @Id
    private String id;

    private String studentId;   // Reference to Student id
    private String bookIsbn;    // Reference to Book isbn
    private LocalDate issueDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private String status; // "ISSUED" or "RETURNED"
}
