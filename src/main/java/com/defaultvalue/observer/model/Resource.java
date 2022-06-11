package com.defaultvalue.observer.model;

import com.defaultvalue.observer.enums.ResourceStatus;

public class Resource {

    private Integer id;
    private String name;
    private String path;
    private ResourceStatus status;

    public Resource(Integer id, String name, String path, ResourceStatus status) {
        this.id = id;
        this.name = name;
        this.path = path;
        this.status = status;
    }

    public Resource(Integer id, String name, String path) {
        this.id = id;
        this.name = name;
        this.path = path;
    }

    public Resource(String name, String path, ResourceStatus status) {
        this.name = name;
        this.path = path;
        this.status = status;
    }

    public Resource(String name, String path) {
        this.name = name;
        this.path = path;
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

    public ResourceStatus getStatus() {
        return status;
    }

    public void setStatus(ResourceStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Resource{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", path='" + path + '\'' +
                ", status=" + status +
                '}';
    }
}
