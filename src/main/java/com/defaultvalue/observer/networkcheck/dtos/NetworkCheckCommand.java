package com.defaultvalue.observer.networkcheck.dtos;

public class NetworkCheckCommand {

    private Integer id;
    private String name;
    private String path;

    public NetworkCheckCommand(Integer id, String name, String path) {
        this.id = id;
        this.name = name;
        this.path = path;
    }

    public NetworkCheckCommand() {
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
        return "NetworkCheckCommand{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", path='" + path + '\'' +
                '}';
    }
}
