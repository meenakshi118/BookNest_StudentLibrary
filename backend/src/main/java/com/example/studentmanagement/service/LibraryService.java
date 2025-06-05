package com.example.studentmanagement.service;

import com.example.studentmanagement.exception.ResourceNotFoundException;
import com.example.studentmanagement.model.AssignedBook;
import com.example.studentmanagement.model.Book;
import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.repository.AssignedBookRepository;
import com.example.studentmanagement.repository.BookRepository;
import com.example.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;


@Service
public class LibraryService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AssignedBookRepository assignedBookRepository;

    public List<AssignedBook> issueBooks(String studentId, List<String> isbns) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with ID: " + studentId));

        List<AssignedBook> assignedBooks = new ArrayList<>();

        for (String isbn : isbns) {
            Optional<Book> optionalBook = bookRepository.findByISBN(isbn);
            if (optionalBook.isEmpty()) {
                System.out.println("Book not found for ISBN: " + isbn);
                continue; // Skip if book not found
            }
            Book book = optionalBook.get();

            if ("Issued".equalsIgnoreCase(book.getStatus()) || book.getAvailableCopies() <= 0) {
                System.out.println("Book with ISBN " + isbn + " is not available.");
                continue; // skip unavailable book
            }

            book.setAvailableCopies(book.getAvailableCopies() - 1);
            if (book.getAvailableCopies() == 0) {
                book.setStatus("Issued");
            }
            bookRepository.save(book);

            AssignedBook assignedBook = new AssignedBook();
            assignedBook.setStudentId(student.getId());
            assignedBook.setBookIsbn(book.getISBN());
            assignedBook.setIssueDate(LocalDate.now());
            assignedBook.setDueDate(LocalDate.now().plusDays(30));
            assignedBook.setStatus("ISSUED");

            assignedBooks.add(assignedBookRepository.save(assignedBook));
        }

        return assignedBooks;
    }




    public AssignedBook returnBook(String bookIsbn, String studentId) {
        Optional<AssignedBook> opt = assignedBookRepository.findByBookIsbnAndStudentId(bookIsbn, studentId);
        AssignedBook assignedBook = opt.orElseThrow(() ->
                new ResourceNotFoundException("Assigned book not found for ISBN: " + bookIsbn + " and student ID: " + studentId));

        if ("RETURNED".equalsIgnoreCase(assignedBook.getStatus())) {
            throw new IllegalStateException("Book already returned");
        }

        assignedBook.setReturnDate(LocalDate.now());
        assignedBook.setStatus("RETURNED");
        assignedBookRepository.save(assignedBook);

        Book book = bookRepository.findByISBN(bookIsbn)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with ISBN: " + bookIsbn));

        book.setAvailableCopies(book.getAvailableCopies() + 1);
        book.setStatus("Available");
        bookRepository.save(book);

        return assignedBook;
    }

    public List<AssignedBook> getAssignedBooksByStudentId(String studentId) {
        // Optional: check if student exists (optional but safe)
        if (!studentRepository.existsById(studentId)) {
            throw new ResourceNotFoundException("Student with ID " + studentId + " not found");
        }

        return assignedBookRepository.findByStudentId(studentId);
    }


    public List<AssignedBook> getAllAssignedBooks() {
        return assignedBookRepository.findAll();
    }
}
