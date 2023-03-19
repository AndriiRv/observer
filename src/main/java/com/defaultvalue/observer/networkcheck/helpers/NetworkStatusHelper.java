package com.defaultvalue.observer.networkcheck.helpers;

import com.defaultvalue.observer.networkcheck.enums.NetworkStatus;
import org.springframework.stereotype.Component;

@Component
public class NetworkStatusHelper {

    public NetworkStatus buildResourceStatus(boolean isAccessible) {
        return isAccessible ? NetworkStatus.GREEN : NetworkStatus.RED;
    }
}
