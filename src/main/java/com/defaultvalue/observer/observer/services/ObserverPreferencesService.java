package com.defaultvalue.observer.observer.services;

import com.defaultvalue.observer.observer.entities.ObserverElement;
import org.apache.commons.lang3.StringUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public interface ObserverPreferencesService<T extends ObserverElement> extends ObserverService<T> {

    default boolean swap(Integer selectedNetworkId, Integer newSelectedIndex) {
        List<T> elements = findAll();

        T selectedElement = elements.stream()
                .filter(e -> e.getId().equals(selectedNetworkId))
                .findFirst().orElseThrow();
        int selectedElementIndex = elements.indexOf(selectedElement);

        T newSelectedElement = elements.stream()
                .filter(e -> e.getId().equals(newSelectedIndex))
                .findFirst().orElseThrow();
        int nextSelectedElementIndex = elements.indexOf(newSelectedElement);

        elements.remove(selectedElementIndex);
        elements.add(nextSelectedElementIndex, selectedElement);

        return saveAll(elements);
    }

    void importObject(MultipartFile file) throws IOException;

    default boolean isFileHasSpecificType(MultipartFile file, String fileType) {
        String fileName = file.getOriginalFilename();
        if (StringUtils.isBlank(fileName)) {
            return false;
        }

        String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
        return fileExtension.equalsIgnoreCase(fileType);
    }

    default String validateImportedElements(String stringContent, Predicate<String> predicate) {
        return Arrays.stream(stringContent.split("\n")).collect(Collectors.toList()).stream()
                .filter(predicate)
                .collect(Collectors.joining("\n"));
    }

    ByteArrayResource exportObject() throws IOException;

}
