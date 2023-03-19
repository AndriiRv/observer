package com.defaultvalue.observer.networkcheck.dtos.transform;

import com.defaultvalue.observer.networkcheck.dtos.NetworkCheckCommand;
import com.defaultvalue.observer.networkcheck.model.NetworkCheck;

import org.springframework.stereotype.Component;

@Component
public class NetworkCheckTransform {

    public NetworkCheck transformFromCommand(NetworkCheckCommand command) {
        return new NetworkCheck(command.getId(), command.getName(), command.getPath());
    }
}
