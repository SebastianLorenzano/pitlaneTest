package org.pitlane.backend.model.dto;

import org.pitlane.backend.model.status.ContactStatus;

import java.util.Map;

public class ContactResponse {
    private ContactStatus status;
    private String message;
    private Map<String, String> errors; // optional — only set if validation fails

    // Constructor for success/error with message
    public ContactResponse(ContactStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    // Constructor for validation errors
    public ContactResponse(ContactStatus status, Map<String, String> errors) {
        this.status = status;
        this.errors = errors;
    }

    public ContactStatus getStatus() {
        return status;
    }

    public void setStatus(ContactStatus status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}
