package com.faiyt.pennywise.models;

import java.util.ArrayList;
import java.util.List;

public class ChartDataSet {

    private String label = "No name";
    private List<ChartDataPoint> series = new ArrayList<>();
    private List<Double> data = new ArrayList<>();

    public ChartDataSet() {}

    public ChartDataSet(String label, List<ChartDataPoint> series) {
        this.label = label;
        setSeries(series);
    }

    public ChartDataSet(List<Double> data) {
        this.data = data;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public List<ChartDataPoint> getSeries() {
        return series;
    }

    public void setSeries(List<ChartDataPoint> series) {
        this.series = series;
        this.data = new ArrayList<>();

        for(ChartDataPoint point : series) {
            this.data.add(point.getValue());
        }

    }

    public void clearData() {
        this.data.clear();
    }

    public void addData(Double data) {
        this.data.add(data);
    }

    public List<Double> getData() {
        return data;
    }


}
