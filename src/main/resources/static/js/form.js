import pickadayStyle from '../../../../../node_modules/pikaday/scss/pikaday.scss'
var Pikaday = require('pikaday');

const stepForm = require('./modules/stepForm');



var picker = new Pikaday({
    field: document.getElementById('firstDueDate'),
//T10:15:30
    format: 'YYYY-MM-DD',
});


stepForm.init();