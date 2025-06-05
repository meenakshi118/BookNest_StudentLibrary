package com.example.studentmanagement.controller;

import com.example.studentmanagement.model.Student;
import com.example.studentmanagement.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService service;

    // Create (POST - no ID in path because ID is generated)
    // Add Student with Image
    @PostMapping(value = "/add",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Student addStudent(
            @RequestPart("student") Student student,
            @RequestPart(value = "profileImage", required = false)  MultipartFile profileImage) throws IOException {
        return service.addStudent(student, profileImage);
    }

    // Update Student with Image
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Student updateStudent(
            @PathVariable String id,
            @RequestPart("student") Student student,
            @RequestPart(name = "profileImage", required = false) MultipartFile profileImage) throws IOException {
        return service.updateStudent(id, student, profileImage);
    }



    // Read All (GET - no ID needed)
    @GetMapping
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    // Read One (GET with ID in path)
    @GetMapping("/info/{id}")
    public Student getStudentById(@PathVariable String id) {
        return service.getStudentById(id);
    }



    // Delete (DELETE with ID in path)
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable String id) {
        service.deleteStudent(id);
        return "Deleted student with id: " + id;
    }

    // Upload Profile Image
    @PostMapping("/{id}/upload-image")
    public Student uploadProfileImage(@PathVariable String id,
                                      @RequestParam("profileImage") MultipartFile profileImage) throws IOException {
        return service.uploadProfileImage(id, profileImage);
    }//If you want to avoid using @RequestParam for the file and instead use only @PathVariable,
    // that's not typical because file uploads are sent as multipart form data and files are usually extracted with @RequestParam.

    @GetMapping("/{id}/profile-image")
    public ResponseEntity<byte[]> getProfileImage(@PathVariable String id) throws IOException {
        byte[] image = service.getProfileImage(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // or IMAGE_PNG depending on the format

        return new ResponseEntity<>(image, headers, HttpStatus.OK);
    }

}



//@PathVariable is used when you want to specify the resource identifier as part of the URL path — great for read one, update, delete.
//
//@RequestBody is used when you’re sending the object data in the request payload — good for create and update.