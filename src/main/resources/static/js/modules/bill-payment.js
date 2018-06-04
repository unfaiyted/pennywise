const api = require('../lib/local.js');

module.exports = {

    init: () => {
        module.exports.initHandlers();
    },

    initHandlers: () => {

        $(`[data-target='#pay-modal']`).click(function () {
            console.log("yo");

            $('.modal-content').hide();

            $('.status').fadeIn(); // will first fade out the loading animation
            $('.preloader').fadeIn();



            console.log($(this).data('id'));
            console.log($(this).data('web'));
            console.log($(this).data('name'));

            // $(`#pay-modal-website`).attr('href', $(this).data('web'));
            // $(`#pay-modal-user`).text($(this).data('name'));

            api.getData('bill/' + $(this).data('id')).then(function(data) {
                console.log(data);
                $('.status').fadeOut(); // will first fade out the loading animation
                $('.preloader').delay(1200).fadeOut('slow'); // will fade out the white DIV that covers the website.
                $('.modal-content').delay(1200).show();



            })





        });

    }





};