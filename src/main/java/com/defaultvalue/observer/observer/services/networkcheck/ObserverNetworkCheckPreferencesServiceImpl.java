package com.defaultvalue.observer.observer.services.networkcheck;

import com.defaultvalue.observer.networkcheck.dtos.NetworkCheckCommand;
import com.defaultvalue.observer.networkcheck.model.NetworkCheck;

import com.defaultvalue.observer.networkcheck.validator.NetworkCheckValidator;
import com.defaultvalue.observer.observer.enums.ObserverFile;
import com.defaultvalue.observer.observer.exceptions.ObserverException;
import com.defaultvalue.observer.observer.helpers.ObserverFileHelper;
import com.defaultvalue.observer.observer.properties.ObserverFileSettings;
import com.defaultvalue.observer.observer.services.ObserverPreferencesService;
import com.defaultvalue.observer.observer.services.ObserverService;
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
import java.util.Collection;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class ObserverNetworkCheckPreferencesServiceImpl implements ObserverPreferencesService<NetworkCheck> {

    private final ObserverService<NetworkCheck> observerService;
    private final ObserverFileHelper observerFileHelper;
    private final ObserverFileSettings observerFileSettings;
    private final NetworkCheckValidator networkCheckValidator;

    public ObserverNetworkCheckPreferencesServiceImpl(@Qualifier("observerNetworkCheckFileServiceImpl") ObserverService<NetworkCheck> observerService,
                                                      ObserverFileHelper observerFileHelper,
                                                      ObserverFileSettings observerFileSettings) {
        this.observerService = observerService;
        this.observerFileHelper = observerFileHelper;
        this.observerFileSettings = observerFileSettings;
        this.networkCheckValidator = new NetworkCheckValidator();
    }

    @Override
    public boolean save(NetworkCheck obj) {
        return observerService.save(obj);
    }

    @Override
    public boolean saveAll(Collection<NetworkCheck> resources) {
        return observerService.saveAll(resources);
    }

    @Override
    public NetworkCheck findById(Integer id) {
        return observerService.findById(id);
    }

    @Override
    public List<NetworkCheck> findAll() {
        return observerService.findAll();
    }

    @Override
    public boolean deleteById(Integer id) {
        return observerService.deleteById(id);
    }

    @Override
    public void importObject(MultipartFile file) throws IOException {
        if (!isFileHasSpecificType(file, observerFileSettings.getResources().getFiletype())) {
            throw new ObserverException("Uploaded file contains wrong type.");
        }

        try (BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
            String stringContent = bufferedReader.lines()
                    .collect(Collectors.joining("\n"));

            String separateChar = String.format("\\%s", observerFileSettings.getNetworks().getSeparateCharacter());
            Predicate<String> predicate = s -> networkCheckValidator.isValid(new NetworkCheckCommand(s.split(separateChar)[0], s.split(separateChar)[1]));

            observerFileHelper.saveToFile(validateImportedElements(stringContent, predicate), ObserverFile.NETWORKS);
        }
    }

    @Override
    public ByteArrayResource exportObject() throws IOException {
        try (InputStream inputStream = new FileInputStream(observerFileHelper.getPathOfFile(ObserverFile.NETWORKS).toFile())) {
            return new ByteArrayResource(inputStream.readAllBytes());
        }
    }
}
