package com.defaultvalue.observer.observer.services;

import com.defaultvalue.observer.resources.models.Resource;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ObserverPreferencesService<T> extends ObserverService<Resource> {

    boolean swap(Integer selectedResourceId, Integer newSelectedIndex);

    void importObject(MultipartFile file) throws IOException;

    ByteArrayResource exportObject() throws IOException;

}
