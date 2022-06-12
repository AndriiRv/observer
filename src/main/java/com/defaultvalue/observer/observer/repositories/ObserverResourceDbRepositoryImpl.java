package com.defaultvalue.observer.observer.repositories;

import com.defaultvalue.observer.resources.models.Resource;

import java.util.Collection;
import java.util.Optional;

public class ObserverResourceDbRepositoryImpl implements ObserverRepository<Resource> {

    @Override
    public boolean save(Resource obj) {
        return false;
    }

    @Override
    public Optional<Resource> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public Collection<Resource> findAll() {
        return null;
    }

    @Override
    public boolean deleteById(Integer id) {
        return false;
    }
}
