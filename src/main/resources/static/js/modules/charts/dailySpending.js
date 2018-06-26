
var Chart = require('chart.js');



var ctx = document.getElementById("chart-daily");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels : [ "2018-05-22", "2018-05-09", "2018-04-26", "2018-04-23", "2018-04-22", "2018-03-23", "2018-03-10", "2018-02-25", "2018-02-22", "2018-02-21", "2018-02-08", "2018-01-26", "2018-01-23", "2018-01-22", "2018-01-09", "2017-12-27", "2017-12-24", "2017-12-23", "2017-12-10", "2017-11-27", "2017-11-24", "2017-11-23", "2017-11-10", "2017-10-28", "2017-10-25", "2017-10-24", "2017-10-11", "2017-09-28", "2017-09-25", "2017-09-24", "2017-09-11", "2017-08-29", "2017-08-26", "2017-08-25" ],
        datasets: [
            {
            label: 'Chase Checking x9337',
            data : [ 89.4, 6.33, 5.4, 16.33, 89.4, 89.4, 6.33, 5.4, 16.33, 89.4, 6.33, 5.4, 16.33, 89.4, 6.33, 5.4, 16.33, 89.4, 6.33, 5.4, 16.33, 89.4, 6.33, 5.4, 16.33, 89.4, 6.33, 5.4, 16.33, 89.4, 6.33, 5.4, 16.33, 89.4 ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
            ],
            borderWidth: 1
            },{
            label: 'Chase Savings x0999',
            data : [ 11.4, 6.33, 5.4, 22.33, 89.4, 89.4, 6.33, 51.4, 29.33, 80.4, 63.33, 5.4, 16.33, 49.4, 6.33, 5.4, 16.33, 89.4, 6.33, 5.4, 16.33, 89.4, 6.33, 5.4, 16.33, 89.4, 6.33, 5.4, 16.33, 89.4, 6.33, 5.4, 16.33, 89.4 ],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1


        }]
    },
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