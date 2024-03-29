package com.defaultvalue.observer.observer.services.resources;

import com.defaultvalue.observer.observer.helpers.HttpClientHelper;
import com.defaultvalue.observer.observer.services.ObserverService;
import com.defaultvalue.observer.resources.helpers.ResourceStatusHelper;
import com.defaultvalue.observer.resources.models.Resource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class ObserverResourceServiceImpl implements ObserverService<Resource> {

    private final ObserverService<Resource> observerService;
    private final HttpClientHelper httpClientHelper;
    private final ResourceStatusHelper resourceStatusHelper;

    public ObserverResourceServiceImpl(@Qualifier("observerResourceFileServiceImpl") ObserverService<Resource> observerService,
                                       HttpClientHelper httpClientHelper,
                                       ResourceStatusHelper resourceStatusHelper) {
        this.observerService = observerService;
        this.httpClientHelper = httpClientHelper;
        this.resourceStatusHelper = resourceStatusHelper;
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
        Resource resource = observerService.findById(id);

        int responseStatus = httpClientHelper.getResponseStatus(resource.getPath());
        resource.setStatus(resourceStatusHelper.buildResourceStatus(responseStatus));
        return resource;
    }

    @Override
    public List<Resource> findAll() {
        return observerService.findAll();
    }

    @Override
    public boolean deleteById(Integer id) {
        return observerService.deleteById(id);
    }
}
