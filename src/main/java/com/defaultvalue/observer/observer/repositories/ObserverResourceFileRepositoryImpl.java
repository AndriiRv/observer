package com.defaultvalue.observer.observer.repositories;

import com.defaultvalue.observer.observer.helpers.ObserverResourceFileValidator;
import com.defaultvalue.observer.observer.properties.ObserverFileSettings;
import com.defaultvalue.observer.resources.models.Resource;
import com.defaultvalue.observer.observer.helpers.ObserverFileHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class ObserverResourceFileRepositoryImpl implements ObserverRepository<Resource> {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverResourceFileRepositoryImpl.class);

    private final ObserverFileHelper observerFileHelper;
    private final ObserverResourceFileValidator observerResourceFileValidator;
    private final ObserverFileSettings observerFileSettings;

    public ObserverResourceFileRepositoryImpl(ObserverFileHelper observerFileHelper,
                                              ObserverResourceFileValidator observerResourceFileValidator,
                                              ObserverFileSettings observerFileSettings) {
        this.observerFileHelper = observerFileHelper;
        this.observerResourceFileValidator = observerResourceFileValidator;
        this.observerFileSettings = observerFileSettings;
    }

    @Override
    public boolean save(Resource resource) {
        Collection<Resource> resources = findAll();
        resources.add(resource);
        return saveAll(resources);
    }

    boolean saveAll(Collection<Resource> resources) {
        StringBuilder sb = new StringBuilder();
        for (Resource obj : resources) {
            sb.append(obj.getName()).append(observerFileSettings.getSeparateCharacter()).append(obj.getPath()).append("\n");
        }

        try {
            return observerFileHelper.saveToFile(sb.toString());
        } catch (IOException e) {
            LOG.error("Exception during save all resources to the file.", e);
            return false;
        }
    }

    @Override
    public Optional<Resource> findById(Integer id) {
        try {
            return findAll().stream()
                    .filter(e -> e.getId().equals(id))
                    .findFirst();
        } catch (Exception e) {
            LOG.error("Exception during find resource by id to the file. id = {}", id, e);
            return Optional.empty();
        }
    }

    @Override
    public Collection<Resource> findAll() {
        String separateCharacter = observerFileSettings.getSeparateCharacter();
        String commentCharacter = observerFileSettings.getCommentCharacter();

        try {
            List<String> strings = observerFileHelper.readTheFile();
            List<Resource> resources = new ArrayList<>();

            int index = 0;
            for (String line : strings) {
                if (observerResourceFileValidator.isResourceEmpty(line)) {
                    continue;
                }

                if (observerResourceFileValidator.isResourceStartsWithCommentChar(line, commentCharacter)) {
                    continue;
                }

                if (observerResourceFileValidator.isResourceContainsMoreThanOneCommentChar(line, commentCharacter)) {
                    continue;
                }

                if (!observerResourceFileValidator.isResourceContainsSeparateLine(line, separateCharacter)) {
                    continue;
                }

                String name = line.substring(0, line.indexOf(separateCharacter));
                String path = line.substring(line.indexOf(separateCharacter) + 1);
                resources.add(new Resource(index + 1, name, path));
                index++;
            }

            return resources;
        } catch (Exception e) {
            LOG.error("Exception during find all resources.", e);
            return Collections.emptyList();
        }
    }

    @Override
    public boolean deleteById(Integer id) {
        try {
            Collection<Resource> resources = findAll();
            resources.remove(new Resource(id));
            return saveAll(resources);
        } catch (Exception e) {
            LOG.error("Exception during delete resource by id. id = {}", id, e);
            return false;
        }
    }
}
