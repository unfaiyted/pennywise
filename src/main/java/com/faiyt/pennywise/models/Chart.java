package com.faiyt.pennywise.models;

import java.util.ArrayList;
import java.util.Collections;
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
        normalizeLabels();
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
        normalizeLabels();
    }


    private void normalizeLabels() {

        List<String> normalizedLabels = new ArrayList<>();

        //Get Labels from the datasets
        for(ChartDataSet set: this.dataSets) {

            for(ChartDataPoint point :set.getSeries()) {
                if(!normalizedLabels.contains(point.getName())) {
                    //Add all labels to Labels String List
                    normalizedLabels.add(point.getName());
                }
                // Clears the data to reorder
                set.clearData();
            }
        }

        // Sort the labels(by date maybe?)
        Collections.sort(normalizedLabels);

        // Check if a datapoint exists and if so add to data array in order.
        for(String label : normalizedLabels) {

            //Look for value matching label
            for(ChartDataSet set: this.dataSets) {
                boolean matched = false;
                    for(ChartDataPoint point :set.getSeries()) {
                        // check if label is matching in series.
                        if(point.getName().equals(label)) {
                            set.addData(point.getValue());
                            matched = true;
                        }
                    }
                    // no match found
                if (!matched) set.addData(0D);
                }
            }


        this.labels = normalizedLabels;

    }



}
