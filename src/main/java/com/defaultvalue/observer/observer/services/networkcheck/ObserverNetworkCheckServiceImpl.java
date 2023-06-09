package com.defaultvalue.observer.observer.services.networkcheck;

import com.defaultvalue.observer.networkcheck.helpers.NetworkStatusHelper;
import com.defaultvalue.observer.networkcheck.model.NetworkCheck;
import com.defaultvalue.observer.networkcheck.service.NetworkCheckService;
import com.defaultvalue.observer.observer.services.ObserverService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class ObserverNetworkCheckServiceImpl implements ObserverService<NetworkCheck> {

    private final ObserverService<NetworkCheck> observerService;
    private final NetworkCheckService networkCheckService;
    private final NetworkStatusHelper networkStatusHelper;

    public ObserverNetworkCheckServiceImpl(@Qualifier("observerNetworkCheckFileServiceImpl") ObserverService<NetworkCheck> observerService,
                                           NetworkCheckService networkCheckService,
                                           NetworkStatusHelper networkStatusHelper) {
        this.observerService = observerService;
        this.networkCheckService = networkCheckService;
        this.networkStatusHelper = networkStatusHelper;
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
        NetworkCheck networkCheck = observerService.findById(id);

        boolean isNetworkAccessible = networkCheckService.isNetworkAccessible(networkCheck.getPath());
        networkCheck.setStatus(networkStatusHelper.buildResourceStatus(isNetworkAccessible));
        return networkCheck;
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
