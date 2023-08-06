package com.defaultvalue.observer.logs;

import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/logs")
@Profile("!test")
public class ObserverLogsRestController {

    private final ObserverLogsService observerLogsService;

    public ObserverLogsRestController(ObserverLogsService observerLogsService) {
        this.observerLogsService = observerLogsService;
    }

    @GetMapping(produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<ByteArrayResource> export() throws IOException {
        ByteArrayResource byteArrayResource = observerLogsService.export();

        return ResponseEntity.ok()
                .contentLength(byteArrayResource.contentLength())
                .contentType(MediaType.parseMediaType("application/octet-stream"))
                .header("Content-Disposition", "attachment; filename=observer.log")
                .body(byteArrayResource);
    }
}
