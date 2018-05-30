const api = require('./local.js');
const alert = require('./alert.js');

// Trigger on page to remove entries from page, settings need to be setup to delete
// both visual and database data from user.
module.exports = {

    settings: {
        triggerClass: "delete-btn", // Associated class that will be picked up
        displayClass: "object-display", //
        dataSet: null, // The url location to send for deletion
        deleteMsg: "Are you sure you'd like to delete this?" // Default Msg
    },

    init: ({dataSet, triggerClass, displayClass, deleteMsg}) => {
        module.exports.settings.dataSet = typeof dataSet !== 'undefined' ? dataSet : module.exports.settings.dataSet;
        module.exports.settings.triggerClass = typeof triggerClass !== 'undefined' ? triggerClass : module.exports.settings.triggerClass;
        module.exports.settings.displayClass = typeof displayClass !== 'undefined' ? displayClass : module.exports.settings.displayClass;
        module.exports.settings.deleteMsg = typeof deleteMsg !== 'undefined' ? deleteMsg : module.exports.settings.deleteMsg;

        if(module.exports.settings.dataSet != null) {
         return  module.exports.initHandlers();
        }

        console.log("Error: Init must contain a dataSet for deletion or be false");
    },

    initHandlers: () =>{

        $('.' + module.exports.settings.triggerClass).click(function() {
                let id = $(this).data("id");
                module.exports.confirmRemove(id);
        })
    },

    confirmRemove: (id) => {
        alert.confirmPopUp(module.exports.settings.deleteMsg).then(
            function() {
                module.exports.updateServer(id)
                    .then(module.exports.removeVisual(id)).
                catch(function (data) {
                        console.log(data);
                        alert.displayPopUpAlert("Error removing item","danger")
                });
            }, //promise resolved
            function() { console.log('You clicked cancel'); }, //promise rejected

        );
    },

    removeVisual: (id) => {
        $(`.${module.exports.settings.displayClass}[data-id="${id}"]`).remove();
    },

    updateServer: (id) => {

        console.log(module.exports.settings.dataSet);

        let json = {identifier: id};
        return api.deleteData(module.exports.settings.dataSet,  JSON.stringify(json));
    }

};