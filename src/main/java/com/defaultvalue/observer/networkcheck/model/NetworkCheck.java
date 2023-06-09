package com.defaultvalue.observer.networkcheck.model;

import com.defaultvalue.observer.networkcheck.enums.NetworkStatus;
import com.defaultvalue.observer.observer.entities.ObserverElement;
import com.defaultvalue.observer.observer.enums.ObserverFile;

import java.util.Objects;

public class NetworkCheck extends ObserverElement {

    private String name;
    private String path;
    private NetworkStatus status;

    public NetworkCheck(Integer id, String name, String path) {
        this.setId(id);
        this.name = name;
        this.path = path;
    }

    public NetworkCheck(Integer id) {
        this.setId(id);
    }

    public NetworkCheck() {
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

    public NetworkStatus getStatus() {
        return status;
    }

    public void setStatus(NetworkStatus status) {
        this.status = status;
    }

    @Override
    public ObserverFile getObserverName() {
        return ObserverFile.NETWORKS;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NetworkCheck networkCheck = (NetworkCheck) o;
        return Objects.equals(getId(), networkCheck.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "Network{" +
                "id=" + getId() +
                ", name='" + name + '\'' +
                ", path='" + path + '\'' +
                ", status=" + status +
                '}';
    }
}
