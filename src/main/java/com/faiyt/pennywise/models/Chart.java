package com.faiyt.pennywise.models;

import java.util.ArrayList;
import java.util.List;

public class Chart {
    private List<String> labels = new ArrayList<>();
    private List<Double> series = new ArrayList<>();

    public Chart() {}

    public Chart(List<String> labels, List<Double> series) {
        this.labels = labels;
        this.series = series;
    }


    public Chart(List<ChartElement> elements) {
        for(ChartElement e : elements) {
            labels.add(e.getName());
            series.add(e.getValue());
        }
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    public List<Double> getSeries() {
        return series;
    }

    public void setSeries(List<Double> series) {
        this.series = series;
    }
}
