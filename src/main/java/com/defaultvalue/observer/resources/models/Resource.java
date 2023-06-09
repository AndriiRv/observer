package com.defaultvalue.observer.resources.models;

import com.defaultvalue.observer.observer.entities.ObserverElement;
import com.defaultvalue.observer.observer.enums.ObserverFile;
import com.defaultvalue.observer.resources.enums.ResourceStatus;

import java.util.Objects;

public class Resource extends ObserverElement {

    private String name;
    private String path;
    private ResourceStatus status;

    public Resource(Integer id, String name, String path, ResourceStatus status) {
        this.setId(id);
        this.name = name;
        this.path = path;
        this.status = status;
    }

    public Resource(Integer id, String name, String path) {
        this.setId(id);
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

    public Resource(Integer id) {
        this.setId(id);
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
    public ObserverFile getObserverName() {
        return ObserverFile.RESOURCES;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Resource resource = (Resource) o;
        return Objects.equals(getId(), resource.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Resource{" +
                "id=" + getId() +
                ", name='" + name + '\'' +
                ", path='" + path + '\'' +
                ", status=" + status +
                '}';
    }
}
