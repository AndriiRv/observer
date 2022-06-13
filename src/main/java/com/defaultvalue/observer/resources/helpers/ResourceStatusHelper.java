package com.defaultvalue.observer.resources.helpers;

import com.defaultvalue.observer.observer.repositories.ObserverRepository;
import com.defaultvalue.observer.resources.enums.ResourceStatus;
import com.defaultvalue.observer.resources.models.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class ResourceStatusHelper {

    private final ObserverRepository<Resource> observerRepository;

    public ResourceStatusHelper(ObserverRepository<Resource> observerRepository) {
        this.observerRepository = observerRepository;
    }

    public ResourceStatus buildResourceStatus(int httpResponseStatus) {
        if (httpResponseStatus == HttpStatus.REQUEST_TIMEOUT.value()) {
            return ResourceStatus.ORANGE;
        } else if (httpResponseStatus == HttpStatus.BAD_REQUEST.value()) {
            return ResourceStatus.RED;
        }
        return ResourceStatus.GREEN;
    }

    public int countOfResources() {
        return observerRepository.findAll().size();
    }
}
