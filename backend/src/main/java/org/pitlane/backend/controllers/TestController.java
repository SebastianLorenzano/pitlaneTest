package org.pitlane.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class TestController {

    @GetMapping("/test/")
    public Map<String, String> home() {
        return Map.of("message", "Connection established!");
    }



}
