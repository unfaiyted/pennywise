package com.faiyt.pennywise.models;

import java.util.ArrayList;
import java.util.List;

public class Chart {

    private String type = "line";
    private String name = "Unnamed Chart";

    private List<String> labels = new ArrayList<>();
    private List<ChartDataSet> dataSets;

    public Chart() {}

    public Chart(List<String> labels) {
        this.labels = labels;
    }

    public Chart(ArrayList<ChartDataSet> dataSets) {
        this.dataSets = dataSets;
    }

    public Chart(List<String> labels, List<Double> data) {
        this.labels = labels;
        dataSets.add(new ChartDataSet(data));
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ChartDataSet> getDataSets() {
        return dataSets;
    }

    public void setDataSets(List<ChartDataSet> dataSets) {
        this.dataSets = dataSets;
    }
}
