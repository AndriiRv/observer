package com.defaultvalue.observer.service;

import java.util.List;

public interface ObserverService<T> {

    boolean save(T obj);

    T findById(Integer id);

    List<T> findAll();

    boolean deleteById(Integer id);

}
