package com.defaultvalue.observer.observer.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotBlank;

@Component
@ConfigurationProperties("observer.info")
@Validated
public class ObserverInfoSettings {

    @NotBlank
    private String version;

    @NotBlank
    private String versionDate;

    @NotBlank
    private String environmentBanner;

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getVersionDate() {
        return versionDate;
    }

    public void setVersionDate(String versionDate) {
        this.versionDate = versionDate;
    }

    public String getEnvironmentBanner() {
        return environmentBanner;
    }

    public void setEnvironmentBanner(String environmentBanner) {
        this.environmentBanner = environmentBanner;
    }
}
