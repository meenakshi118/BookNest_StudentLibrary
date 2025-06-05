package com.example.studentmanagement.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
//This is a custom exception. Instead of using generic RuntimeException or Exception, you define meaningful exception
// classes specific to your app’s logic — in this case, for missing resources like students or books.
