package com.defaultvalue.observer.observer.services;

import com.defaultvalue.observer.resources.models.Resource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class ObserverResourcePreferencesServiceImpl implements ObserverPreferencesService<Resource> {

    private final ObserverService<Resource> observerService;

    public ObserverResourcePreferencesServiceImpl(@Qualifier("observerResourceFileServiceImpl") ObserverService<Resource> observerService) {
        this.observerService = observerService;
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

        Resource nextResource = resources.stream()
                .filter(e -> e.getId().equals(newSelectedIndex))
                .findFirst().orElseThrow();
        int nextResourceIndex = resources.indexOf(nextResource);

        Collections.swap(resources, selectedResourceIndex, nextResourceIndex);
        return saveAll(resources);
    }
}
