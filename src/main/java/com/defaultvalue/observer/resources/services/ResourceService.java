package com.defaultvalue.observer.resources.services;

import com.defaultvalue.observer.observer.helpers.HttpClientHelper;
import com.defaultvalue.observer.observer.repositories.ObserverRepository;
import com.defaultvalue.observer.resources.helpers.ResourceStatusHelper;
import com.defaultvalue.observer.resources.models.Resource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class ResourceService {

    private final ObserverRepository<Resource> observerRepository;
    private final HttpClientHelper httpClientHelper;
    private final ResourceStatusHelper resourceStatusHelper;

    public ResourceService(ObserverRepository<Resource> observerRepository,
                           HttpClientHelper httpClientHelper,
                           ResourceStatusHelper resourceStatusHelper) {
        this.observerRepository = observerRepository;
        this.httpClientHelper = httpClientHelper;
        this.resourceStatusHelper = resourceStatusHelper;
    }

    public boolean save(Resource resource) {
        return observerRepository.save(resource);
    }

    public Resource findById(Integer id) {
        Optional<Resource> optionalResource = observerRepository.findById(id);
        Resource resource = optionalResource.orElseThrow();

        int httpResponseStatus = httpClientHelper.performGetRequest(resource.getPath());
        resource.setStatus(resourceStatusHelper.buildResourceStatus(httpResponseStatus));
        return resource;
    }

    public List<Resource> findAll() {
        Collection<Resource> resources = observerRepository.findAll();
        resources.stream()
                .parallel()
                .forEach(resource -> {
                    int httpResponseStatus = httpClientHelper.performGetRequest(resource.getPath());
                    resource.setStatus(resourceStatusHelper.buildResourceStatus(httpResponseStatus));
                });

        return new ArrayList<>(resources);
    }

    public boolean deleteById(Integer id) {
        return observerRepository.deleteById(id);
    }
}
