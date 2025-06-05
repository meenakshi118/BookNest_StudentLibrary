package com.example.studentmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {

    @Id
    private String id;


    private String title;
    private String authorName;
    private String edition;
    private String publisher;
    private String ISBN;
    private String category;
    private String language;
    private int pages;
    private int totalCopies;
    private int availableCopies;
    private LocalDate publishedDate;
    private LocalDate addedDate;
    private String rackNumber;
    private String status;
}
