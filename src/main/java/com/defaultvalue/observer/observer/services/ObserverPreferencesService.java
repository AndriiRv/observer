package com.defaultvalue.observer.observer.services;

import com.defaultvalue.observer.resources.models.Resource;

public interface ObserverPreferencesService<T> extends ObserverService<Resource> {

    boolean swap(Integer selectedResourceId, Integer newSelectedIndex);

}
