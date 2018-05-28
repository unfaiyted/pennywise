const Chartist = require('Chartist');

import styles from '../../../../../../node_modules/chartist/dist/scss/chartist.scss';


var data = {
    series: [5, 3, 4]
};

var sum = function(a, b) { return a + b };

new Chartist.Pie('.ct-chart', data, {
    labelInterpolationFnc: function(value) {
        return Math.round(value / data.series.reduce(sum) * 100) + '%';
    }
});


new Chartist.Line('.ct-chart-b', {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    series: [
        [12, 9, 7, 8, 5],
        [2, 1, 3.5, 7, 3],
        [1, 3, 4, 5, 6]
    ]
}, {
    fullWidth: true,
    chartPadding: {
        right: 40
    }
});