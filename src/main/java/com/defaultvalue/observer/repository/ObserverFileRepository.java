package com.defaultvalue.observer.repository;

import com.defaultvalue.observer.model.Resource;
import com.defaultvalue.observer.helper.ObserverFileHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ObserverFileRepository implements ObserverRepository<Resource> {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverFileRepository.class);

    private final ObserverFileHelper observerFileHelper;

    public ObserverFileRepository(ObserverFileHelper observerFileHelper) {
        this.observerFileHelper = observerFileHelper;
    }

    @Override
    public boolean save(Resource obj) {
        String resource = obj.getName() + obj.getPath();
        try {
            observerFileHelper.saveToFile(resource);
            return true;
        } catch (IOException e) {
            LOG.error("Exception during add resource.");
            return false;
        }
    }

    @Override
    public Resource findById(Integer id) {
        return findAll().stream()
                .filter(e -> e.getId().equals(id))
                .collect(Collectors.toList()).get(0);
    }

    @Override
    public Collection<Resource> findAll() {
        try {
            List<String> strings = observerFileHelper.readTheFile();

            List<Resource> resources = new ArrayList<>();
            for (int i = 0; i < strings.size(); i++) {
                String partOfResource = strings.get(i);
                String name = partOfResource.substring(0, partOfResource.indexOf("|"));
                String path = partOfResource.substring(partOfResource.indexOf("|") + 1);
                resources.add(new Resource(i + 1, name, path));
            }

            return resources;
        } catch (Exception e) {
            LOG.error("Exception during get all resources.");
            return Collections.emptyList();
        }
    }

    @Override
    public boolean deleteById(Integer id) {
        try {
            observerFileHelper.removeFromFile(id);
            return true;
        } catch (IOException e) {
            LOG.error("Exception during remove resource.");
            return false;
        }
    }
}
