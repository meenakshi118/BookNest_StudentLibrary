package com.example.studentmanagement.service;

import com.example.studentmanagement.exception.ResourceNotFoundException;
import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudentById(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student with ID " + id + " not found"));
    }

    public Student addStudent(Student student, MultipartFile profileImage) throws IOException {
        if (repository.findByEmail(student.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists.");
        }

        if (profileImage != null && !profileImage.isEmpty()) {
            String fileName = saveImageToDisk(profileImage);
            student.setProfileImagePath(fileName);
        }

        return repository.save(student);
    }

    public Student updateStudent(String id, Student updatedStudent, MultipartFile profileImage) throws IOException {
        Student existing = getStudentById(id);

        existing.setName(updatedStudent.getName());
        existing.setEmail(updatedStudent.getEmail());
        existing.setPhoneNo(updatedStudent.getPhoneNo());
        existing.setAge(updatedStudent.getAge());
        existing.setAddress(updatedStudent.getAddress());

        if (profileImage != null && !profileImage.isEmpty()) {
            String fileName = saveImageToDisk(profileImage);
            existing.setProfileImagePath(fileName);
        }

        return repository.save(existing);
    }

    private String saveImageToDisk(MultipartFile file) throws IOException {
        Files.createDirectories(Paths.get(uploadDir));
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);
        Files.write(filePath, file.getBytes());
        return fileName;
    }

    public void deleteStudent(String id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Cannot delete. Student with ID " + id + " not found");
        }
        repository.deleteById(id);
    }

    @Value("${student.profile.image.upload-dir}")
    private String uploadDir;

    public Student uploadProfileImage(String id, MultipartFile file) throws IOException {
        Student student = getStudentById(id);

        Files.createDirectories(Paths.get(uploadDir)); // Create the folder if not exists

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir, fileName);

        Files.write(filePath, file.getBytes());

        student.setProfileImagePath(fileName); // Store only the filename
        return repository.save(student);
    }

    public byte[] getProfileImage(String id) throws IOException {
        Student student = getStudentById(id);
        String fileName = student.getProfileImagePath();

        if (fileName == null) {
            throw new ResourceNotFoundException("No profile image found for student " + id);
        }

        Path imagePath = Paths.get(uploadDir).resolve(fileName);
        return Files.readAllBytes(imagePath);
    }




}