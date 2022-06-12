package com.defaultvalue.observer.resources.dtos;

public class ResourceCommand {

    private String name;
    private String path;

    public ResourceCommand(String name, String path) {
        this.name = name;
        this.path = path;
    }

    public ResourceCommand() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
