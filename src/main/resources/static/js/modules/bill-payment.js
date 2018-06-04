const api = require('../lib/local.js');
const alerts = require('../lib/alert');
module.exports = {

    settings: {
      data: null
    },

    init: () => {
        module.exports.initHandlers();
    },

    initHandlers: () => {

        $(`[data-target='#pay-modal']`).click(function () {

            $('.modal-content').hide();

            $('.status').fadeIn(); // will first fade out the loading animation
            $('.preloader').fadeIn();

            // $(`#pay-modal-website`).attr('href', $(this).data('web'));
            // $(`#pay-modal-user`).text($(this).data('name'));

            api.getData('bill/' + $(this).data('id')).then(function(data) {
                module.exports.settings.data = data;
                module.exports.updateModal(data);
            })

        });

        $('#pay-submit-form').click(function (e) {
            e.preventDefault();
            console.log("submit-form");

            if($.isNumeric($('#pay-amount').val())) {
                module.exports.confirmPayment();
            } else {
                return alerts.displayPopUpAlert('Input value is not valid number.','danger');
            }


        });

    },

    confirmPayment: () => {
        alerts.confirmPopUp("Are you sure you sure you want to complete this payment?").then(
            function() {
                module.exports.updateServer()
                    .then(alerts.displayPopUpAlert("Done!","primary")).
                catch(function () {
                    alerts.displayPopUpAlert("Error bill unable to add item","danger")
                });
            }, //promise resolved
            function() { console.log('You clicked cancel'); }, //promise rejected

        );
    },


    updateModal: (data) => {

            let merchantName = data.merchant.name;
            let method = data.method.name;

            //sets icon for header
            $('#pay-icon').removeAttr('class').addClass(data.method.icon);

            $('#pay-bill-name').text(merchantName);
            module.exports.updateBillMethod(method);

        $('.status').fadeOut(); // will first fade out the loading animation
        $('.preloader').delay(500).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('.modal-content').delay(500).show();

    },


    updateBillMethod: (method) => {
        $("#pay-bill-action").empty();

        let data = module.exports.settings.data;
        let childHTML = '';

        if (method === 'Mail') {

            childHTML += `
            <p>Please mail your payment to this following address:</p>
            <span>${data.merchant.address.title}</span>
            <span>${data.merchant.address.street}</span>
            <span>${data.merchant.address.city}</span>
             <span>${data.merchant.address.zipcode}</span>
              <span>${data.merchant.address.state.abbr}</span>`;

        } else if (method === 'In-Person') {
            childHTML += `<p>Plase Give the payment in person.</p>`;

        } else if (method.includes('Pay') || method === 'Website') {

            let webAddress = (method === 'Website') ? data.merchant.website : data.method.link;
            let payMethodName = method;
            let webUsername = data.merchant.websiteUsername;

            childHTML += `<a href="${webAddress}" class="mx-auto btn btn-primary" target="_blank" id="pay-modal-website">
            Go to ${payMethodName} </a>`;

            if(webUsername !== '') {
            childHTML += `<span class="ml-3 text-muted">  Your username is <strong id="pay-modal-user">${webUsername}</strong> </span>
            `;

            }
        }

        $("#pay-bill-action").append(childHTML);

    },


    updateServer: () => {

        let data = {
            billId: module.exports.settings.data.id,
            payAmount: $('#pay-amount').val()
        };

        return api.addData('bill/pay', JSON.stringify(data));

    }





};