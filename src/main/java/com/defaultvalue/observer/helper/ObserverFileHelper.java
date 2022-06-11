package com.defaultvalue.observer.helper;

import com.defaultvalue.observer.properties.ObserverFileSettings;
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
    public void saveToFile(String content) throws IOException {
        Path fileNamePath = createFile();
        try (BufferedWriter bufferedWriter = Files.newBufferedWriter(fileNamePath)) {
            bufferedWriter.append(content);
        }
    }

    public void removeFromFile(Integer id) throws IOException {
        List<String> strings = readTheFile();

        StringBuilder sb = new StringBuilder();
        for (String strLine : strings) {
            if (strLine.contains(id.toString())) {
                strings.remove(strLine);
            }
            sb.append(strLine).append("\n");
        }

        saveToFile(sb.toString());

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
