const Chart = require('chart.js');
const api = require('../../lib/local');



const colors = {
    backgroundColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ]

};


api.getData("institution/account/daily/spending/9").then(function (data) {
    console.log(data);

    let datasets = [];

    for(let i = 0; i < data.dataSets.length; i++) {

        datasets.push({
            label: data.dataSets[i].label,
            data: data.dataSets[i].data,
            backgroundColor: [colors.backgroundColor[i]],
            borderColor: [colors.borderColor[i]],

        })

    }


let chartData = {
    labels : data.labels,
    datasets: datasets
};

// Generate Chart
var ctx = document.getElementById("chart-daily");
var myChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    callback: function(value, index, values) {
                        return '$' + value.toFixed(2);
                    }
                }
            }]
        }
    }
});

});
