package com.example.studentmanagement.repository;

import com.example.studentmanagement.model.AssignedBook;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface AssignedBookRepository extends MongoRepository<AssignedBook, String> {
    List<AssignedBook> findByStudentId(String studentId);
    Optional<AssignedBook> findByBookIsbnAndStudentId(String bookIsbn, String studentId);
}
