package com.example.studentmanagement.repository;

import com.example.studentmanagement.model.Book;
import com.example.studentmanagement.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface StudentRepository extends MongoRepository<Student, String> {
    Optional<Student> findById(String StudentId);
    Optional<Student> findByEmail(String email);

}
