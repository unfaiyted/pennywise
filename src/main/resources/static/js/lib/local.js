// Functions for local json file interactions
module.exports = {

    settings: { //settings
        url: window.location.origin + "/api/",
        rateLimit: 5,
        token: $("meta[name='_csrf']").attr("content"),
        header: $("meta[name='_csrf_header']").attr("content")
    },

    //Inserts data into server
    addData: (location, data) => {
        location = typeof location !== 'undefined' ? location : "";
        return fetch(module.exports.settings.url + location, {
            method: "post",
            credentials: "same-origin",
            headers: {
                "X-CSRF-Token": module.exports.settings.token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json());
    },

    deleteData: (location, data) => {
        return module.exports.addData(location, data);
    },

    updateData: (location, data) => {
        return module.exports.addData(location, data);
    },

    post: (location, data) => {
        return module.exports.addData(location, data);
    },

    getData: (type, parameter, query) => {
        parameter = typeof parameter !== 'undefined' ? parameter : "";
        query = typeof query !== 'undefined' ? query : "";

        return fetch(module.exports.settings.url + type +"/"+ parameter + query,
            {
            method: 'GET',
                credentials: 'same-origin',
                redirect: 'follow',
                agent: null,
                headers: {
                    "Content-Type": "text/plain",
                    'Authorization': 'Basic '+btoa('username:password')
                }
            }).then((response) => {
                let json = response.json();
                if (response.status >= 200 && response.status < 300) {
                    return json;
                } else {
                    return json.then(Promise.reject.bind(Promise));
                }
        });
    }
};