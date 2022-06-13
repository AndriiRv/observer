package com.defaultvalue.observer.observer.services;

import com.defaultvalue.observer.resources.models.Resource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObserverResourcePreferencesServiceImpl implements ObserverService<Resource> {

    private final ObserverService<Resource> observerService;

    public ObserverResourcePreferencesServiceImpl(@Qualifier("observerResourceFileServiceImpl") ObserverService<Resource> observerService) {
        this.observerService = observerService;
    }

    @Override
    public boolean save(Resource obj) {
        return observerService.save(obj);
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
}
