package org.pitlane.backend.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public class ContactRequest {

    @NotBlank
    @NotNull
    @Pattern(regexp = "^[^<>]*$", message = "El nombre no puede contener los caracteres < o >")
    private String name;

    @NotBlank
    @NotNull
    @Email
    @Pattern(regexp = "^[^<>]*$", message = "El correo electrónico no puede contener los caracteres < o >")
    private String email;

    @Pattern(regexp = "^[^<>]*$", message = "El número no puede contener los caracteres < o >")
    private String number;

    @Pattern(regexp = "^[^<>]*$", message = "La empresa no puede contener los caracteres < o >")
    private String company;

    private String message;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = (number == null) ? "" : number;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = (company == null) ? "" : company;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = (message == null) ? "" : message;
    }

    @Override
    public String toString() {
        return "ContactRequest{" +
                "nombre='" + name + '\'' +
                ", email='" + email + '\'' +
                ", telefono='" + number + '\'' +
                ", empresa='" + company + '\'' +
                ", mensaje='" + message + '\'' +
                '}';
    }
}
