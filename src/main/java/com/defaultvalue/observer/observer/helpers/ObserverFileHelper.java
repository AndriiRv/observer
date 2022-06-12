package com.defaultvalue.observer.observer.helpers;

import com.defaultvalue.observer.observer.properties.ObserverFileSettings;
import org.springframework.stereotype.Component;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Component
public class ObserverFileHelper {

    private final ObserverFileSettings observerFileSettings;

    public ObserverFileHelper(ObserverFileSettings observerFileSettings) {
        this.observerFileSettings = observerFileSettings;
    }

    /**
     * Read the file with resources.
     *
     * @return list of each line of file.
     * @throws IOException
     */
    public List<String> readTheFile() throws IOException {
        Path fileNamePath = createFile();
        return Files.readAllLines(fileNamePath);
    }

    /**
     * Save content as string to file.
     *
     * @param content  resources name with generated passwords as string.
     * @throws IOException
     */
    public boolean saveToFile(String content) throws IOException {
        Path fileNamePath = createFile();
        try (BufferedWriter bufferedWriter = Files.newBufferedWriter(fileNamePath)) {
            bufferedWriter.append(content);
        }
        return true;
    }

    /**
     * Create file.
     *
     * @return {@link Path} object with file.
     * @throws IOException
     */
    Path createFile() throws IOException {
        Path fileNamePath = Paths.get(observerFileSettings.getFilename() + "." + observerFileSettings.getFiletype());
        if (Files.notExists(fileNamePath)) {
            Files.createFile(fileNamePath);
        }

        return fileNamePath;
    }
}
