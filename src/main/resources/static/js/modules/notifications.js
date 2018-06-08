import calStyle from '../../css/module/notifications.css'

const api = require('../lib/local');


//Constructor
function NotificationObject(settings) {
    let self = this;
    // Attach Div ID
    this.settings = settings;

    this.display = 4;

    this.notifications = [];

    // Get Events
    api.getData('notification').then(
        function(valid) {
            self.notifications = valid;
            self.init();
            self.renderList();
        }, function (error) {
            console.log("Error fetching notification data.");
        });

}

NotificationObject.prototype.init = function () {
    // Do something...

};

// Top 4 items displayed... add a view all link
NotificationObject.prototype.renderList = function () {
    let self = this;
    let unreadCount = 0;
    let count = 0;

    $('#notification-menu-list').empty()

    let notifyHTML = `<ul class="list-group notification-list-group">`;


    this.notifications.forEach(function (n) {

        if(n.userViewed === false) unreadCount++;

        // Limits display
        if(count < self.display) {
            notifyHTML += self.createItem(n);
        }
        count++;
    });

    if(count > self.display) notifyHTML += this.createOverflow(count);

    notifyHTML += ` </ul>`;

    $('#notificaiton-unread-count').text(unreadCount);

    $('#notification-menu-list').append(notifyHTML);


    $('.notification-view').click(function () {
        if($(this).attr('data-read') === "false") {
            console.log("unread");
            self.markRead($(this).attr('data-id'));
        }
    });


    $('.notification-delete-btn').click(function () {
        self.markRead($(this).attr('data-id'));
    });


};

NotificationObject.prototype.createItem = function (notification) {

    let n = notification;

    let badge = (n.userView) ? '' : `<span class="ml-2 badge badge-blue">New</span>`;

    return `
        <li class="list-group-item d-flex  align-items-left text-truncate notification-group-item" data-id="${n.id}">
            <div class="icon pr-4">
                <i class="${n.type.icon}"></i>
             </div>
             <div class="text-truncate">
                <p class="title text-truncate">${this.createNotificationLink(n)} ${badge}</p>
                <p class="description text-truncate">${n.message}</p>
                <span class="time">${n.age}</span>
            </div>
            <div class="ml-auto text-right">
            <i class="fas fa-times notification-delete-btn" data-id="${n.id}"></i>
</div>
        </li>`

};

NotificationObject.prototype.createNotificationLink = function (notification) {

    let n = notification;

    let htmlLink = `<a href="${window.location.origin}`;

    if(n.bill) {
        htmlLink += `/bill/view/${n.bill.id}`;
    } else if(n.systemMessage) {
        htmlLink += `/system/${n.id}`;
    } else if (n.income) {
       return `/income/${n.income.id}`;
    } else if (n.event) {
        return `/calendar/event/${n.event.id}`;
    }


    htmlLink += `" class="notification-view" data-id="${n.id}" data-read="${n.userViewed}">${n.title}</a>`;

    return htmlLink;

};

NotificationObject.prototype.createOverflow = function (count) {

    let diff = count - this.display;

    let noun = (diff > 1) ? 'notifications' : 'notification' ;

    return `
        <li class="list-group-item d-flex justify-content-end align-items-right text-truncate">
              <a href="${window.location.origin}/notifications"> View ${diff} more ${noun} </a>
        </li>`
};


NotificationObject.prototype.markRead = function (notificationId) {

    let  data = {
        identifier : notificationId
    };

    // Get Events
    api.updateData('notification/markRead', data).then(
        function(valid) {
        }, function (error) {
            console.log("Error fetching notification data.");
        });

};

NotificationObject.prototype.deleteItem = function (notificationId) {

    let  data = {
        identifier : notificationId
    };

    // Get Events
    api.deleteData('notification/delete', data).then(
        function(valid) {
        }, function (error) {
            console.log("Error deleting");
        });

};

module.exports = NotificationObject;




