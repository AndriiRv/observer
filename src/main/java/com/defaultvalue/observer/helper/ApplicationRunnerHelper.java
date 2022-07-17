package com.defaultvalue.observer.helper;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

/**
 * This bean is need for run any code after Spring Boot have run already.
 */
@Component
public class ApplicationRunnerHelper implements ApplicationRunner {

    private final ObserverBannerHelper observerBannerHelper;

    public ApplicationRunnerHelper(ObserverBannerHelper observerBannerHelper) {
        this.observerBannerHelper = observerBannerHelper;
    }

    @Override
    public void run(ApplicationArguments applicationArguments) {
        observerBannerHelper.buildBanner();
    }
}
