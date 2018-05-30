import styles from '../../css/module/progressBar.css'


module.exports = {


    settings: {
        current_fs : [],
        next_fs: [],
        previous_fs: [],//fieldsets
        left: [],
        opacity:[],
        scale: {}, //fieldset properties which we will animate
        animating: false //flag to prevent quick multi-click glitches

    },

    init: () => {
        module.exports.initHandlers();
    },


    initHandlers: () => {
        //jQuery time


        $(".next").click(function(){
            let settings = module.exports.settings;

            if(settings.animating) return false;
            settings.animating = true;

            module.exports.confirmBillAddForm();

            settings.current_fs = $(this).parent().parent().parent();
            settings.next_fs = $(this).parent().parent().parent().next();

            //activate next step on progressbar using the index of next_fs
            $("#progressbar li").eq($("fieldset").index(settings.next_fs)).addClass("active");

            //show the next fieldset
            settings.next_fs.show();
            //hide the current fieldset with style
            settings.current_fs.animate({opacity: 0}, {
                step: function(now, mx) {
                    //as the opacity of current_fs reduces to 0 - stored in "now"
                    //1. scale current_fs down to 80%
                    settings.scale = 1 - (1 - now) * 0.2;
                    //2. bring next_fs from the right(50%)
                    settings.left = (now * 50)+"%";
                    //3. increase opacity of next_fs to 1 as it moves in
                    settings.opacity = 1 - now;
                    settings.current_fs.css({
                        'transform': 'scale('+settings.scale+')',
                        'position': 'absolute'
                    });
                    settings.next_fs.css({'left': settings.left, 'opacity': settings.opacity});
                },
                duration: 800,
                complete: function(){
                    settings.current_fs.hide();
                    settings.animating = false;
                },
                //this comes from the custom easing plugin
                easing: 'easeInOutBack'
            });
        });

        $(".previous").click(function(e){
            let settings = module.exports.settings;
            e.preventDefault();
            if(settings.animating) return false;
            settings.animating = true;

            settings.current_fs = $(this).parent().parent().parent();
            settings.previous_fs = $(this).parent().parent().parent().prev();

            //de-activate current step on progressbar
            $("#progressbar li").eq($("fieldset").index(settings.current_fs)).removeClass("active");

            //show the previous fieldset
            settings.previous_fs.show();
            //hide the current fieldset with style
            settings.current_fs.animate({opacity: 0}, {
                step: function(now, mx) {
                    //as the opacity of current_fs reduces to 0 - stored in "now"
                    //1. scale previous_fs from 80% to 100%
                    settings.scale = 0.8 + (1 - now) * 0.2;
                    //2. take current_fs to the right(50%) - from 0%
                    settings.left = ((1-now) * 50)+"%";
                    //3. increase opacity of previous_fs to 1 as it moves in
                    settings.opacity = 1 - now;
                    settings.current_fs.css({'left': settings.left});
                    settings.previous_fs.css({'transform': 'scale('+settings.scale+')',
                        'opacity': settings.opacity});

                },
                duration: 800,
                complete: function(){
                    settings.current_fs.hide();
                    settings.animating = false;
                    settings.previous_fs.css('position','relative');
                },
                //this comes from the custom easing plugin
                easing: 'easeInOutBack'
            });
        });

        $(".submit").click(function(){
            return true;
        })


    },

    confirmBillAddForm: () => {

        // Page 1 - Basics
        $(`#merchant-name`).text( $(`#merchant\\.name`).val());
        $(`#payment-amount`).text( $(`#payment`).val());
        $(`#payment-freq`).text( $(`#frequency`).find('option:selected').text());
        $(`#due-date`).text( $(`#firstDueDate`).val());
        $(`#payment-category`).text( $(`#category`).find('option:selected').text());

        // Page 2 - Address Info
        $(`#addressee`).text( $(`#merchant\\.address\\.title`).val());
        $(`#address`).text( $(`#merchant\\.address\\.street`).val());
        $(`#city`).text( $(`#merchant\\.address\\.city`).val());
        $(`#state`).text( $(`#merchant\\.address\\.state`).val());
        $(`#zip-code`).text( $(`#merchant\\.address\\.zipCode`).val());


        //Page 3 - Details
        $(`#website`).text( $(`#merchant\\.website`).val());
        $(`#webUsername`).text( $(`#merchant\\.websiteUsername`).val());
        $(`#bill-interestRate`).text( $(`#interestRate`).val());
        $(`#bill-interestType`).text( $(`#interestType`).find('option:selected').text());
        $(`#bill-totalOwed`).text( $(`#totalOwed`).val());

    }



};




