package com.defaultvalue.observer.observer.services;

import com.defaultvalue.observer.observer.repositories.ObserverRepository;
import com.defaultvalue.observer.resources.models.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class ObserverResourceFileServiceImpl implements ObserverService<Resource> {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverResourceFileServiceImpl.class);

    private final ObserverRepository<Resource> observerRepository;

    public ObserverResourceFileServiceImpl(ObserverRepository<Resource> observerRepository) {
        this.observerRepository = observerRepository;
    }

    @Override
    public boolean save(Resource resource) {
        return observerRepository.save(resource);
    }

    @Override
    public boolean saveAll(Collection<Resource> resources) {
        return observerRepository.saveAll(resources);
    }

    @Override
    public List<Resource> findAll() {
        return new ArrayList<>(observerRepository.findAll());
    }

    @Override
    public Resource findById(Integer id) {
        return observerRepository.findById(id).orElseThrow();
    }

    @Override
    public boolean deleteById(Integer id) {
        return observerRepository.deleteById(id);
    }
}
