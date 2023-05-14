package com.defaultvalue.observer.observer.services;

import com.defaultvalue.observer.networkcheck.enums.NetworkStatus;
import com.defaultvalue.observer.networkcheck.helpers.NetworkStatusHelper;
import com.defaultvalue.observer.networkcheck.model.NetworkCheck;
import com.defaultvalue.observer.networkcheck.service.NetworkCheckService;
import com.defaultvalue.observer.observer.repositories.ObserverRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class ObserverNetworkCheckFileServiceImpl implements ObserverService<NetworkCheck> {

    private final ObserverRepository<NetworkCheck> observerRepository;
    private final NetworkCheckService networkCheckService;
    private final NetworkStatusHelper networkStatusHelper;

    public ObserverNetworkCheckFileServiceImpl(ObserverRepository<NetworkCheck> observerRepository,
                                               NetworkCheckService networkCheckService,
                                               NetworkStatusHelper networkStatusHelper) {
        this.observerRepository = observerRepository;
        this.networkCheckService = networkCheckService;
        this.networkStatusHelper = networkStatusHelper;
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
        NetworkCheck networkCheck = observerRepository.findById(id).orElseThrow();
        networkCheck.setStatus(addStatus(networkCheck.getPath()));
        return networkCheck;
    }

    NetworkStatus addStatus(String path) {
        return networkStatusHelper.buildResourceStatus(networkCheckService.isNetworkAccessible(path));
    }

    @Override
    public boolean deleteById(Integer id) {
        return observerRepository.deleteById(id);
    }
}
