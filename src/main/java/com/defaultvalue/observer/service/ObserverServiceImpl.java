package com.defaultvalue.observer.service;

import com.defaultvalue.observer.enums.ResourceStatus;
import com.defaultvalue.observer.helper.HttpClientHelper;
import com.defaultvalue.observer.model.Resource;
import com.defaultvalue.observer.repository.ObserverFileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ObserverServiceImpl implements ObserverService<Resource> {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverServiceImpl.class);

    private final ObserverFileRepository observerFileRepository;
    private final HttpClientHelper httpClientHelper;

    public ObserverServiceImpl(ObserverFileRepository observerFileRepository,
                               HttpClientHelper httpClientHelper) {
        this.observerFileRepository = observerFileRepository;
        this.httpClientHelper = httpClientHelper;
    }

    @Override
    public boolean save(Resource resource) {
        return false;
    }

    @Override
    public List<Resource> findAll() {
        List<Resource> resources = new ArrayList<>(observerFileRepository.findAll());
        resources.stream()
                .parallel()
                .forEach(resource -> {
                    int httpResponseStatus = httpClientHelper.performGetRequest(resource.getPath());
                    resource.setStatus(buildResourceStatus(httpResponseStatus));
                });

        return resources;
    }

    private ResourceStatus buildResourceStatus(int httpResponseStatus) {
        if (httpResponseStatus == HttpStatus.REQUEST_TIMEOUT.value()) {
            return ResourceStatus.ORANGE;
        } else if (httpResponseStatus == HttpStatus.BAD_REQUEST.value()) {
            return ResourceStatus.RED;
        }
        return ResourceStatus.GREEN;
    }

    @Override
    public Resource findById(Integer id) {
        for (Resource resource : observerFileRepository.findAll()) {
            if (resource.getId().equals(id)) {
                int httpResponseStatus = httpClientHelper.performGetRequest(resource.getPath());
                resource.setStatus(buildResourceStatus(httpResponseStatus));
                return resource;
            }
        }

        return null;
    }

    @Override
    public boolean deleteById(Integer id) {
        return false;
    }
}
