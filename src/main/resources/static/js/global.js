import styles from '../css/global.css'
import hover from '../../../../../node_modules/hover.css/scss/hover.scss'

const panel = require('./lib/panel.js');
const chart = require('./modules/chart.js');
const NotificationObject = require("./modules/notifications.js");

(function($) {
    console.log("Please pay your bills!");
})(jQuery);

panel.init();


const notification = new NotificationObject();



