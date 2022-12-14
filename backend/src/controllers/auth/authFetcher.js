var axios = require('axios').default

function authFetcher(url) {
    return function (user, password) {
        return axios({
            url,
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            data: { user, password }
        })
    }
}

module.exports = authFetcher