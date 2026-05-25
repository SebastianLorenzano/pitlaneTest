package org.pitlane.backend.controllers;


import jakarta.validation.Valid;
import org.pitlane.backend.model.dto.ContactRequest;
import org.pitlane.backend.model.dto.ContactResponse;
import org.pitlane.backend.model.status.ContactStatus;
import org.pitlane.backend.services.ContactServices;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ContactController {

    private final ContactServices contactServices;

    public ContactController(ContactServices contactServices) {
        this.contactServices = contactServices;
    }

    @PostMapping(value = "/api/contact")
    public ResponseEntity<?> postContact(@Valid @RequestBody ContactRequest contact, BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return ResponseEntity.badRequest().body(
                    new ContactResponse(ContactStatus.VALIDATIONS_REQUIRED, errors)
            );
        }
        ContactResponse response = contactServices.processContact(contact);
        return (response.getStatus() == ContactStatus.SUCCESS) ?
                ResponseEntity.ok(response) :
                ResponseEntity.badRequest().body(response);
    }
}