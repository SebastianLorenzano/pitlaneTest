package org.pitlane.backend.controllers;


import org.pitlane.backend.services.YoutubeVideoServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/youtube")
public class YoutubeVideoController {

    private final YoutubeVideoServices ytVideoServices;

    public YoutubeVideoController(YoutubeVideoServices ytVideoService) {
        this.ytVideoServices = ytVideoService;
    }

    @GetMapping("/videos")
    public ResponseEntity<List<String>> getVideos() {
        return ResponseEntity.ok(ytVideoServices.getVideos());
    }

    // Protected admin endpoint
    @PutMapping("/admin/videos")
    public ResponseEntity<List<String>> updateVideos(@RequestBody List<String> videoIds) {
        List<String> updatedVideos = ytVideoServices.updateVideos(videoIds);
        return ResponseEntity.ok(updatedVideos);
    }
}