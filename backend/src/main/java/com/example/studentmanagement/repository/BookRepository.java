package com.example.studentmanagement.repository;

import com.example.studentmanagement.model.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BookRepository extends MongoRepository<Book, String> {
    Optional<Book> findByISBN(String isbn);
}
