package com.defaultvalue.observer.repository;

import java.util.Collection;

public interface ObserverRepository<T> {

    boolean save(T obj);

    T findById(Integer id);

    Collection<T> findAll();

    boolean deleteById(Integer id);

}
