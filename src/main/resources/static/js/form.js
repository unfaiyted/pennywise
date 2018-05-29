
var Pikaday = require('pikaday');
import pickadayStyle from '../../../../../node_modules/pikaday/scss/pikaday.scss'
const stepForm = require('./modules/stepForm');

var picker = new Pikaday({ field: document.getElementById('firstDueDate') });

