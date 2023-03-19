package com.defaultvalue.observer.observer.services;

import com.defaultvalue.observer.networkcheck.model.NetworkCheck;

import com.defaultvalue.observer.observer.enums.ObserverFile;
import com.defaultvalue.observer.observer.exceptions.ObserverException;
import com.defaultvalue.observer.observer.helpers.ObserverFileHelper;
import com.defaultvalue.observer.observer.properties.ObserverFileSettings;
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
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ObserverNetworkCheckPreferencesServiceImpl implements ObserverPreferencesService<NetworkCheck> {

    private final ObserverService<NetworkCheck> observerService;
    private final ObserverFileHelper observerFileHelper;
    private final ObserverFileSettings observerFileSettings;

    public ObserverNetworkCheckPreferencesServiceImpl(@Qualifier("observerNetworkCheckFileServiceImpl") ObserverService<NetworkCheck> observerService,
                                                      ObserverFileHelper observerFileHelper,
                                                      ObserverFileSettings observerFileSettings) {
        this.observerService = observerService;
        this.observerFileHelper = observerFileHelper;
        this.observerFileSettings = observerFileSettings;
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
    public boolean swap(Integer selectedNetworkId, Integer newSelectedIndex) {
        List<NetworkCheck> resources = findAll();

        NetworkCheck selectedNetwork = resources.stream()
                .filter(e -> e.getId().equals(selectedNetworkId))
                .findFirst().orElseThrow();
        int selectedNetworkIndex = resources.indexOf(selectedNetwork);

        NetworkCheck newSelectedNetwork = resources.stream()
                .filter(e -> e.getId().equals(newSelectedIndex))
                .findFirst().orElseThrow();
        int nextSelectedNetworkIndex = resources.indexOf(newSelectedNetwork);

        resources.remove(selectedNetworkIndex);
        resources.add(nextSelectedNetworkIndex, selectedNetwork);

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
            observerFileHelper.saveToFile(stringContent, ObserverFile.NETWORKS);
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

    @Override
    public ByteArrayResource exportObject() throws IOException {
        try (InputStream inputStream = new FileInputStream(observerFileHelper.getPathOfFile(ObserverFile.NETWORKS).toFile())) {
            return new ByteArrayResource(inputStream.readAllBytes());
        }
    }
}
