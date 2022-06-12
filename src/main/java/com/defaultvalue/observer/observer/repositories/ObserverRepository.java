package com.defaultvalue.observer.observer.repositories;

import java.util.Collection;
import java.util.Optional;

public interface ObserverRepository<T> {

    boolean save(T obj);

    Optional<T> findById(Integer id);

    Collection<T> findAll();

    boolean deleteById(Integer id);

}
