package org.pitlane.backend.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class FileDownloadController {

    @Value("${pitlane.files.project.pdf}")
    private String filePath;

    @GetMapping(value = "/api/files/PitlaneProject.pdf", produces = MediaType.APPLICATION_PDF_VALUE)
    public ResponseEntity<InputStreamResource> downloadProjectFile() throws IOException {
        ClassPathResource pdf = new ClassPathResource(filePath);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filePath + "\"");
        headers.add(HttpHeaders.CACHE_CONTROL, "no-cache, no-store, must-revalidate");
        headers.add("Pragma", "no-cache");
        headers.add("Expires", "0");

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(pdf.contentLength())
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdf.getInputStream()));
    }
}