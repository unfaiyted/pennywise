const api = require('./local.js');
const alert = require('./alert.js');

// Trigger on page to remove entries from page, settings need to be setup to delete
// both visual and database data from user.


//Constructor
function DeleteObject(settings) {
    // {dataSet, triggerClass, displayClass, deleteMsg}
    this.settings = settings;
    this.settings.triggerClass = typeof this.settings.triggerClass !== 'undefined' ? this.settings.triggerClass : 'delete-btn';
    this.settings.displayClass = typeof  this.settings.displayClass !== 'undefined' ?  this.settings.displayClass : "object-display";
    this.settings.deleteMsg = typeof this.settings.deleteMsg !== 'undefined' ? this.settings.deleteMsg : "Are you sure you'd like to delete this?";

    if(this.settings.dataSet !== null) {
        this.initHandler();
    }

}

// Function of Delete Object
DeleteObject.prototype.disp = function disp() {
    console.log(this.settings);
};


DeleteObject.prototype.initHandler = function() {
        let self = this;

    $('.' + this.settings.triggerClass).click(function() {
        let id = $(this).data("id");
        self.confirmRemove(id);
    })

};


DeleteObject.prototype.confirmRemove = function(id) {
    let self = this;
    alert.confirmPopUp(this.settings.deleteMsg).then(
        function() {
            self.updateServer(id)
                .then(self.removeVisual(id)).
            catch(function (data) {
                alert.displayPopUpAlert("Error removing item","danger")
            });
        }, //promise resolved
        function() { console.log('You clicked cancel'); }, //promise rejected

    );
};


DeleteObject.prototype.removeVisual = function(id) {
    $(`.${this.settings.displayClass}[data-id="${id}"]`).remove();
};

DeleteObject.prototype.updateServer = function(id) {
    let json = {identifier: id};
    return api.deleteData(this.settings.dataSet,  JSON.stringify(json));
};


//
module.exports = DeleteObject;




