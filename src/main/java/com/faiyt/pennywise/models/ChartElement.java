package com.faiyt.pennywise.models;


// Pojo Chart element for storing data that will
// eventually be displayed in chart format to the page.
public class ChartElement {

    private String name;
    private Double value;


    public ChartElement() {}

    public ChartElement(String name, Double value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }
}
