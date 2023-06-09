package com.defaultvalue.observer.observer.entities;

import com.defaultvalue.observer.observer.enums.ObserverFile;

public class ObserverElement {

    private Integer id;
    private ObserverFile observerName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ObserverFile getObserverName() {
        return observerName;
    }

    @Override
    public String toString() {
        return "ObserverElement{" +
                "id=" + id +
                ", observerName=" + observerName +
                '}';
    }
}
