package com.defaultvalue.observer.resources.dtos.transform;

import com.defaultvalue.observer.resources.dtos.ResourceCommand;
import com.defaultvalue.observer.resources.models.Resource;
import org.springframework.stereotype.Component;

@Component
public class ResourceTransform {

    public Resource transformFromCommand(ResourceCommand command) {
        return new Resource(command.getId(), command.getName(), command.getPath());
    }
}
