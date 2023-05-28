package com.defaultvalue.observer.observer.services;

import com.defaultvalue.observer.observer.enums.ObserverFile;
import com.defaultvalue.observer.observer.exceptions.ObserverException;
import com.defaultvalue.observer.observer.helpers.ObserverFileHelper;
import com.defaultvalue.observer.observer.properties.ObserverFileSettings;
import com.defaultvalue.observer.resources.dtos.ResourceCommand;
import com.defaultvalue.observer.resources.models.Resource;
import com.defaultvalue.observer.resources.validator.ResourceValidator;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ObserverResourcePreferencesServiceImpl implements ObserverPreferencesService<Resource> {

    private final ObserverService<Resource> observerService;
    private final ObserverFileHelper observerFileHelper;
    private final ObserverFileSettings observerFileSettings;
    private final ResourceValidator resourceValidator;

    public ObserverResourcePreferencesServiceImpl(@Qualifier("observerResourceFileServiceImpl") ObserverService<Resource> observerService,
                                                  ObserverFileHelper observerFileHelper,
                                                  ObserverFileSettings observerFileSettings) {
        this.observerService = observerService;
        this.observerFileHelper = observerFileHelper;
        this.observerFileSettings = observerFileSettings;
        this.resourceValidator = new ResourceValidator();
    }

    @Override
    public boolean save(Resource obj) {
        return observerService.save(obj);
    }

    @Override
    public boolean saveAll(Collection<Resource> resources) {
        return observerService.saveAll(resources);
    }

    @Override
    public Resource findById(Integer id) {
        return observerService.findById(id);
    }

    @Override
    public List<Resource> findAll() {
        return observerService.findAll();
    }

    @Override
    public boolean deleteById(Integer id) {
        return observerService.deleteById(id);
    }

    @Override
    public boolean swap(Integer selectedResourceId, Integer newSelectedIndex) {
        List<Resource> resources = findAll();

        Resource selectedResource = resources.stream()
                .filter(e -> e.getId().equals(selectedResourceId))
                .findFirst().orElseThrow();
        int selectedResourceIndex = resources.indexOf(selectedResource);

        Resource newSelectedResource = resources.stream()
                .filter(e -> e.getId().equals(newSelectedIndex))
                .findFirst().orElseThrow();
        int nextSelectedResourceIndex = resources.indexOf(newSelectedResource);

        resources.remove(selectedResourceIndex);
        resources.add(nextSelectedResourceIndex, selectedResource);

        return saveAll(resources);
    }

    @Override
    public void importObject(MultipartFile file) throws IOException {
        if (!isFileHasSpecificType(file)) {
            throw new ObserverException("Uploaded file contains wrong type.");
        }

        try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String stringContent = bufferedReader.lines()
                    .collect(Collectors.joining("\n"));
            observerFileHelper.saveToFile(validateImportedElements(stringContent), ObserverFile.RESOURCES);
        }
    }

    boolean isFileHasSpecificType(MultipartFile file){
        String fileName = file.getOriginalFilename();
        if (StringUtils.isBlank(fileName)) {
            return false;
        }

        String fileExtension = fileName.substring(fileName.lastIndexOf(".") + 1);
        return fileExtension.equalsIgnoreCase(observerFileSettings.getResources().getFiletype());
    }

    String validateImportedElements(String stringContent) {
        String separateChar = String.format("\\%s", observerFileSettings.getNetworks().getSeparateCharacter());
        return Arrays.stream(stringContent.split("\n")).collect(Collectors.toList()).stream()
                .filter(e -> resourceValidator.isValid(new ResourceCommand(e.split(separateChar)[0], e.split(separateChar)[1])))
                .collect(Collectors.joining("\n"));
    }

    @Override
    public ByteArrayResource exportObject() throws IOException {
        try (InputStream inputStream = new FileInputStream(observerFileHelper.getPathOfFile(ObserverFile.RESOURCES).toFile())) {
            return new ByteArrayResource(inputStream.readAllBytes());
        }
    }
}
