import styles from '../../../../../../node_modules/chartist/dist/scss/chartist.scss';

const Chartist = require('Chartist');
const lib = require('../lib/local.js');

module.exports = {

    // get data
    init: () => {

       let data = lib.getData('bill/billsByCategory').then(function(data) {


           let responsiveOptions = [
               ['screen and (min-width: 640px)', {
                   chartPadding: 10,
                   labelOffset: 100,
                   labelDirection: 'implode',
                   labelInterpolationFnc: function(value) {
                       return value;
                   }
               }],
               ['screen and (min-width: 1024px)', {
                   labelOffset: 25,
                   chartPadding: 25,
                   labelDirection: 'implode',
               }]
           ];


           let chart = new Chartist.Pie('.ct-chart', data, {
               donut: true,
               showLabel: true,
               showSeries: true
           }, responsiveOptions );


           chart.on('draw', function(data) {
               if(data.type === 'slice') {
                   // Get the total path length in order to use for dash array animation
                   var pathLength = data.element._node.getTotalLength();

                   // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                   data.element.attr({
                       'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                   });

                   // Create animation definition while also assigning an ID to the animation for later sync usage
                   var animationDefinition = {
                       'stroke-dashoffset': {
                           id: 'anim' + data.index,
                           dur: 500,
                           from: -pathLength + 'px',
                           to:  '0px',
                           easing: Chartist.Svg.Easing.easeOutQuint,
                           // We need to use `fill: 'freeze'` otherwise our animation will fall back to initial (not visible)
                           fill: 'freeze'
                       }
                   };

                   // If this was not the first slice, we need to time the animation so that it uses the end sync event of the previous animation
                   if(data.index !== 0) {
                       animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
                   }

                   // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                   data.element.attr({
                       'stroke-dashoffset': -pathLength + 'px'
                   });

                   // We can't use guided mode as the animations need to rely on setting begin manually
                   // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                   data.element.animate(animationDefinition, false);
               }
           });

        // For the sake of the example we update the chart every time it's created with a delay of 8 seconds
           chart.on('created', function() {
               if(window.__anim21278907124) {
                   clearTimeout(window.__anim21278907124);
                   window.__anim21278907124 = null;
               }
               window.__anim21278907124 = setTimeout(chart.update.bind(chart), 10000);
           });


       })


    },


};



if ($(".ct-chart")[0]){
    // Do something if class exists

    module.exports.init();
}






//
//
// new Chartist.Line('.ct-chart-b', {
//     labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//     series: [
//         [12, 9, 7, 8, 5],
//         [2, 1, 3.5, 7, 3],
//         [1, 3, 4, 5, 6]
//     ]
// }, {
//     fullWidth: true,
//     chartPadding: {
//         right: 40
//     }
// });