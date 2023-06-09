package com.defaultvalue.observer.observer.services.networkcheck;

import com.defaultvalue.observer.networkcheck.model.NetworkCheck;
import com.defaultvalue.observer.observer.repositories.ObserverRepository;
import com.defaultvalue.observer.observer.services.ObserverService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class ObserverNetworkCheckFileServiceImpl implements ObserverService<NetworkCheck> {

    private final ObserverRepository<NetworkCheck> observerRepository;

    public ObserverNetworkCheckFileServiceImpl(ObserverRepository<NetworkCheck> observerRepository) {
        this.observerRepository = observerRepository;
    }

    @Override
    public boolean save(NetworkCheck resource) {
        if (resource.getName() == null) {
            resource.setName(observerRepository.findById(resource.getId()).orElseThrow().getName());
        } else if (resource.getPath() == null) {
            resource.setPath(observerRepository.findById(resource.getId()).orElseThrow().getPath());
        }
        return observerRepository.save(resource);
    }

    @Override
    public boolean saveAll(Collection<NetworkCheck> resources) {
        return observerRepository.saveAll(resources);
    }

    @Override
    public List<NetworkCheck> findAll() {
        return new ArrayList<>(observerRepository.findAll());
    }

    @Override
    public NetworkCheck findById(Integer id) {
        return observerRepository.findById(id).orElseThrow();
    }

    @Override
    public boolean deleteById(Integer id) {
        return observerRepository.deleteById(id);
    }
}
