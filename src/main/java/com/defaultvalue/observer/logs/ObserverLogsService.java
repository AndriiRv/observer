package com.defaultvalue.observer.logs;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
public class ObserverLogsService {

    public ByteArrayResource export() throws IOException {
        try (InputStream inputStream = new FileInputStream("logs/observer.log")) {
            return new ByteArrayResource(inputStream.readAllBytes());
        }
    }
}
