package com.example.studentmanagement.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
@Data                       // Creates getter, setter, toString, equals, hashCode
@NoArgsConstructor          // Empty constructor
@AllArgsConstructor         // Constructor with all fields
public class Student {

    @Id
    private String id;

    private String name;
    private String email;
    private String PhoneNo;
    private int age;
    private String address;
    private String profileImagePath;

}
