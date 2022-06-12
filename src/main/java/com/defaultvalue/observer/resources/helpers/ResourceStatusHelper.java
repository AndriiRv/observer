package com.defaultvalue.observer.resources.helpers;

import com.defaultvalue.observer.resources.enums.ResourceStatus;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class ResourceStatusHelper {

    public ResourceStatus buildResourceStatus(int httpResponseStatus) {
        if (httpResponseStatus == HttpStatus.REQUEST_TIMEOUT.value()) {
            return ResourceStatus.ORANGE;
        } else if (httpResponseStatus == HttpStatus.BAD_REQUEST.value()) {
            return ResourceStatus.RED;
        }
        return ResourceStatus.GREEN;
    }
}
