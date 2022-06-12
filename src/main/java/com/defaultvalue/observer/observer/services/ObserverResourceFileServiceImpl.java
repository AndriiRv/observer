package com.defaultvalue.observer.observer.services;

import com.defaultvalue.observer.resources.models.Resource;
import com.defaultvalue.observer.resources.services.ResourceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObserverResourceFileServiceImpl implements ObserverService<Resource> {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverResourceFileServiceImpl.class);

    private final ResourceService resourceService;

    public ObserverResourceFileServiceImpl(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @Override
    public boolean save(Resource resource) {
        return resourceService.save(resource);
    }

    @Override
    public List<Resource> findAll() {
        return resourceService.findAll();
    }

    @Override
    public Resource findById(Integer id) {
        return resourceService.findById(id);
    }

    @Override
    public boolean deleteById(Integer id) {
        return resourceService.deleteById(id);
    }
}
