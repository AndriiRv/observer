package com.defaultvalue.observer.resources.dtos;

import com.defaultvalue.observer.resources.validator.ResourceValid;

@ResourceValid
public class ResourceCommand {

    private Integer id;
    private String name;
    private String path;

    public ResourceCommand(Integer id, String name, String path) {
        this.id = id;
        this.name = name;
        this.path = path;
    }

    public ResourceCommand(String name, String path) {
        this.name = name;
        this.path = path;
    }

    public ResourceCommand() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    @Override
    public String toString() {
        return "ResourceCommand{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", path='" + path + '\'' +
                '}';
    }
}
