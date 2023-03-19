package com.defaultvalue.observer.observer.repositories;

import com.defaultvalue.observer.observer.enums.ObserverFile;
import com.defaultvalue.observer.observer.validators.ObserverFileValidator;
import com.defaultvalue.observer.observer.properties.ObserverFileSettings;
import com.defaultvalue.observer.resources.models.Resource;
import com.defaultvalue.observer.observer.helpers.ObserverFileHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Component
public class ObserverResourceFileRepositoryImpl implements ObserverRepository<Resource> {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverResourceFileRepositoryImpl.class);

    private final ObserverFileHelper observerFileHelper;
    private final ObserverFileValidator observerFileValidator;
    private final ObserverFileSettings observerFileSettings;

    public ObserverResourceFileRepositoryImpl(ObserverFileHelper observerFileHelper,
                                              ObserverFileValidator observerFileValidator,
                                              ObserverFileSettings observerFileSettings) {
        this.observerFileHelper = observerFileHelper;
        this.observerFileValidator = observerFileValidator;
        this.observerFileSettings = observerFileSettings;
    }

    @Override
    public boolean save(Resource resource) {
        List<Resource> resources = new ArrayList<>(findAll());
        Resource updatableResource = findById(resource.getId()).orElse(null);
        if (updatableResource != null) {
            int resourceIndex = resources.indexOf(updatableResource);
            resources.remove(resourceIndex);
            resources.add(resourceIndex, resource);
        } else {
            resources.add(resource);
        }
        return saveAll(resources);
    }

    @Override
    public boolean saveAll(Collection<Resource> resources) {
        StringBuilder sb = new StringBuilder();
        for (Resource obj : resources) {
            sb.append(obj.getName()).append(observerFileSettings.getResources().getSeparateCharacter()).append(obj.getPath()).append("\n");
        }
        return observerFileHelper.saveToFile(sb.toString(), ObserverFile.RESOURCES);
    }

    @Override
    public Optional<Resource> findById(Integer id) {
        return findAll().stream()
                .filter(e -> e.getId().equals(id))
                .findFirst();
    }

    @Override
    public Collection<Resource> findAll() {
        String separateCharacter = observerFileSettings.getResources().getSeparateCharacter();
        String commentCharacter = observerFileSettings.getResources().getCommentCharacter();

        List<Resource> resources = new ArrayList<>();

        int index = 0;
        for (String line : observerFileHelper.readTheFile(ObserverFile.RESOURCES)) {
            if (observerFileValidator.isElementEmpty(line)) {
                continue;
            }

            if (observerFileValidator.isElementStartsWithCommentChar(line, commentCharacter)) {
                continue;
            }

            if (observerFileValidator.isElementContainsMoreThanOneCommentChar(line, commentCharacter)) {
                continue;
            }

            if (!observerFileValidator.isElementContainsSeparateChar(line, separateCharacter)) {
                continue;
            }

            String name = line.substring(0, line.indexOf(separateCharacter));
            String path = line.substring(line.indexOf(separateCharacter) + 1);
            resources.add(new Resource(index + 1, name, path));
            index++;
        }

        return resources;
    }

    @Override
    public boolean deleteById(Integer id) {
        Collection<Resource> resources = findAll();
        resources.remove(new Resource(id));
        return saveAll(resources);
    }
}
