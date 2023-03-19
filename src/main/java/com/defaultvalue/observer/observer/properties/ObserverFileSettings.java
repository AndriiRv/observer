package com.defaultvalue.observer.observer.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("observer.files")
public class ObserverFileSettings {

    private final ObserverFileSettings.FileSettings resources = new FileSettings();
    private final ObserverFileSettings.FileSettings networks = new FileSettings();

    public FileSettings getResources() {
        return resources;
    }

    public FileSettings getNetworks() {
        return networks;
    }

    public static class FileSettings {

        private Boolean enabled;
        private String filename;
        private String filetype;
        private String separateCharacter;
        private String commentCharacter;

        public Boolean getEnabled() {
            return enabled;
        }

        public void setEnabled(Boolean enabled) {
            this.enabled = enabled;
        }

        public String getFilename() {
            return filename;
        }

        public void setFilename(String filename) {
            this.filename = filename;
        }

        public String getFiletype() {
            return filetype;
        }

        public void setFiletype(String filetype) {
            this.filetype = filetype;
        }

        public String getSeparateCharacter() {
            return separateCharacter;
        }

        public void setSeparateCharacter(String separateCharacter) {
            this.separateCharacter = separateCharacter;
        }

        public String getCommentCharacter() {
            return commentCharacter;
        }

        public void setCommentCharacter(String commentCharacter) {
            this.commentCharacter = commentCharacter;
        }
    }
}
