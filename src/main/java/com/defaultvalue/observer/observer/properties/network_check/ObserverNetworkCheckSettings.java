package com.defaultvalue.observer.observer.properties.network_check;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("observer.network-check")
public class ObserverNetworkCheckSettings {

    private int requestsCount;

    public int getRequestsCount() {
        return requestsCount;
    }

    public void setRequestsCount(int requestsCount) {
        this.requestsCount = requestsCount;
    }
}
