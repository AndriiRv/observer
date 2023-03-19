package com.defaultvalue.observer.networkcheck.model;

import com.defaultvalue.observer.networkcheck.enums.NetworkStatus;

import java.util.Objects;

public class NetworkCheck {

    private Integer id;
    private String name;
    private String path;
    private NetworkStatus status;

    public NetworkCheck(Integer id, String name, String path) {
        this.id = id;
        this.name = name;
        this.path = path;
    }

    public NetworkCheck(Integer id) {
        this.id = id;
    }

    public NetworkCheck() {
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

    public NetworkStatus getStatus() {
        return status;
    }

    public void setStatus(NetworkStatus status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NetworkCheck networkCheck = (NetworkCheck) o;
        return Objects.equals(id, networkCheck.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Network{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", path='" + path + '\'' +
                ", status=" + status +
                '}';
    }
}
