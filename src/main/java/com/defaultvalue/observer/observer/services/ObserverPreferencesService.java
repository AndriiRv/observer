package com.defaultvalue.observer.observer.services;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ObserverPreferencesService<T> extends ObserverService<T> {

    boolean swap(Integer selectedElementId, Integer newSelectedIndex);

    void importObject(MultipartFile file) throws IOException;

    ByteArrayResource exportObject() throws IOException;

}
