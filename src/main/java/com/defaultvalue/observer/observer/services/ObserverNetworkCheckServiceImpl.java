package com.defaultvalue.observer.observer.services;

import com.defaultvalue.observer.networkcheck.model.NetworkCheck;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class ObserverNetworkCheckServiceImpl implements ObserverService<NetworkCheck> {

    private final ObserverService<NetworkCheck> observerService;

    public ObserverNetworkCheckServiceImpl(@Qualifier("observerNetworkCheckFileServiceImpl") ObserverService<NetworkCheck> observerService) {
        this.observerService = observerService;
    }

    @Override
    public boolean save(NetworkCheck obj) {
        return observerService.save(obj);
    }

    @Override
    public boolean saveAll(Collection<NetworkCheck> resources) {
        return observerService.saveAll(resources);
    }

    @Override
    public NetworkCheck findById(Integer id) {
        return observerService.findById(id);
    }

    @Override
    public List<NetworkCheck> findAll() {
        return observerService.findAll();
    }

    @Override
    public boolean deleteById(Integer id) {
        return observerService.deleteById(id);
    }
}
