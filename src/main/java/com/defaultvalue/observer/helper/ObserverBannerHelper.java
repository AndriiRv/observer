package com.defaultvalue.observer.helper;

import com.defaultvalue.observer.observer.properties.ObserverBannerSettings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.InputStreamReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

@Component
public class ObserverBannerHelper {

    private static final Logger LOG = LoggerFactory.getLogger(ObserverBannerHelper.class);

    private final ObserverBannerSettings observerBannerSettings;

    public ObserverBannerHelper(ObserverBannerSettings observerBannerSettings) {
        this.observerBannerSettings = observerBannerSettings;
    }

    public void buildBanner() {
        if (!observerBannerSettings.getEnabled()) {
            return;
        }

        ResourceLoader resourceLoader = new DefaultResourceLoader();
        System.out.println(asString(resourceLoader.getResource("classpath:" + observerBannerSettings.getPath())));
    }

    private String asString(Resource resource) {
        try (Reader reader = new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8)) {
            return FileCopyUtils.copyToString(reader);
        } catch (Exception e) {
            LOG.error("Exception during convert resource to String", e);
            return "";
        }
    }
}
