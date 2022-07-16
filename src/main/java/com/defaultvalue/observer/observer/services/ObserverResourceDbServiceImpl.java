package com.defaultvalue.observer.observer.services;

import com.defaultvalue.observer.resources.models.Resource;

import java.util.Collection;
import java.util.List;

public class ObserverResourceDbServiceImpl implements ObserverService<Resource> {

    @Override
    public boolean save(Resource obj) {
        return false;
    }

    @Override
    public boolean saveAll(Collection<Resource> resources) {
        return false;
    }

    @Override
    public Resource findById(Integer id) {
        return null;
    }

    @Override
    public List<Resource> findAll() {
        return null;
    }

    @Override
    public boolean deleteById(Integer id) {
        return false;
    }
}
