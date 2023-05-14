package com.defaultvalue.observer.observer.helpers;

import com.defaultvalue.observer.observer.enums.ObserverFile;
import com.defaultvalue.observer.observer.exceptions.ObserverException;
import com.defaultvalue.observer.observer.properties.ObserverFileSettings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.BufferedWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Component
public class ObserverFileHelper {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverFileHelper.class);

    private final ObserverFileSettings observerFileSettings;

    public ObserverFileHelper(ObserverFileSettings observerFileSettings) {
        this.observerFileSettings = observerFileSettings;
    }

    /**
     * Read the file with resources.
     *
     * @return list of each line of file.
     */
    public List<String> readTheFile(ObserverFile observerFile) {
        try {
            Path fileNamePath = createFile(observerFile);
            return Files.readAllLines(fileNamePath);
        } catch (IOException e) {
            String errorId = UUID.randomUUID().toString();
            LOG.error("Exception has occurred during read the file. Error id = {}", errorId, e);
            throw new ObserverException("Unable to read the observer file");
        }
    }

    public Path getPathOfFile(ObserverFile observerFile) {
        try {
            return createFile(observerFile);
        } catch (Exception e) {
            String errorId = UUID.randomUUID().toString();
            LOG.error("Exception has occurred during getting the file. Error id = {}", errorId, e);
            throw new ObserverException("Unable to get the observer file");
        }
    }

    /**
     * Save content as string to file.
     *
     * @param content resources as string.
     */
    public boolean saveToFile(String content, ObserverFile observerFile) {
        Path fileNamePath = createFile(observerFile);

        try (BufferedWriter bufferedWriter = Files.newBufferedWriter(fileNamePath)) {
            bufferedWriter.append(content);
            return true;
        } catch (IOException e) {
            String errorId = UUID.randomUUID().toString();
            LOG.error("Exception has occurred during save to file. Error id = {}", errorId, e);
            throw new ObserverException("Unable to save to the observer file");
        }
    }

    /**
     * Create file.
     *
     * @return {@link Path} object with file.
     */
    Path createFile(ObserverFile observerFile) {
        try {
            Path fileNamePath = Paths.get(buildFilename(observerFile));
            if (Files.notExists(fileNamePath)) {
                Files.createFile(fileNamePath);
            }
            return fileNamePath;
        } catch (IOException e) {
            String errorId = UUID.randomUUID().toString();
            LOG.error("Exception has occurred during create the file. Error id = {}", errorId, e);
            throw new ObserverException("Unable to create the observer file");
        }
    }

    /**
     * Builder of file name depends on Observer file type.
     *
     * @param observerFile {@link ObserverFile} obj.
     * @return built String file name.
     */
    String buildFilename(ObserverFile observerFile) {
        if (observerFile.equals(ObserverFile.RESOURCES)) {
            return observerFileSettings.getResources().getFilename() + "." + observerFileSettings.getResources().getFiletype();
        } else if (observerFile.equals(ObserverFile.NETWORKS)) {
            return observerFileSettings.getNetworks().getFilename() + "." + observerFileSettings.getNetworks().getFiletype();
        }
        return "";
    }
}
