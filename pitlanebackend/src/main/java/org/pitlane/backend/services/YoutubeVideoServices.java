package org.pitlane.backend.services;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@Service
public class YoutubeVideoServices {

    private final ObjectMapper objectMapper;
    private final Path filePath;

    public YoutubeVideoServices(
            ObjectMapper objectMapper,
            @Value("${youtube.videos.file}") String videosFile
    ) {
        this.objectMapper = objectMapper;
        this.filePath = Path.of(videosFile);
    }

    public List<String> getVideos() {
        try {
            ensureFileExists();

            return objectMapper.readValue(
                    filePath.toFile(),
                    new TypeReference<List<String>>() {}
            );

        } catch (IOException e) {
            throw new RuntimeException("Could not read YouTube videos file", e);
        }
    }

    public List<String> updateVideos(List<String> videoIds) {
        try {
            ensureFileExists();

            List<String> cleanVideoIds = videoIds.stream()
                    .map(String::trim)
                    .filter(id -> !id.isBlank())
                    .distinct()
                    .toList();

            objectMapper.writerWithDefaultPrettyPrinter()
                    .writeValue(filePath.toFile(), cleanVideoIds);

            return cleanVideoIds;

        } catch (IOException e) {
            throw new RuntimeException("Could not update YouTube videos file", e);
        }
    }

    private void ensureFileExists() throws IOException {
        Path parent = filePath.getParent();

        if (parent != null && !Files.exists(parent)) {
            Files.createDirectories(parent);
        }

        if (!Files.exists(filePath)) {
            objectMapper.writerWithDefaultPrettyPrinter()
                    .writeValue(filePath.toFile(), new ArrayList<String>());
        }
    }
}
