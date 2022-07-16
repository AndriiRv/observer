package com.defaultvalue.observer.observer.services;

import java.util.Collection;
import java.util.List;

public interface ObserverService<T> {

    boolean save(T obj);

    boolean saveAll(Collection<T> resources);

    T findById(Integer id);

    List<T> findAll();

    boolean deleteById(Integer id);

}
