package com.defaultvalue.observer.helper;

import com.defaultvalue.observer.observer.properties.ObserverBannerSettings;
import com.defaultvalue.observer.observer.properties.ObserverInfoSettings;
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
    private final ObserverInfoSettings observerInfoSettings;

    public ObserverBannerHelper(ObserverBannerSettings observerBannerSettings,
                                ObserverInfoSettings observerInfoSettings) {
        this.observerBannerSettings = observerBannerSettings;
        this.observerInfoSettings = observerInfoSettings;
    }

    public void buildBanner() {
        if (!observerBannerSettings.getEnabled()) {
            return;
        }

        ResourceLoader resourceLoader = new DefaultResourceLoader();
        String strBanner = asString(resourceLoader.getResource("classpath:" + observerBannerSettings.getPath()));
        String appInfo = String.format(
                "Observer [%s mode] v%s (%s)",
                observerInfoSettings.getEnvironmentBanner(),
                observerInfoSettings.getVersion(),
                observerInfoSettings.getVersionDate()
        );
        strBanner = strBanner.concat("\n" + appInfo);

        LOG.info(strBanner);
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
