const base_url = "https://imd-coin.herokuapp.com/";

primus = Primus.connect(base_url, {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
            ,
        min: 500 // Number: The minimum delay before we try reconnect.
            ,
        retries: 10 // Number: How many times we should try to reconnect.
    }
});

primus.on('data', (json) => {
    if (json.action === "updateHistory") {
        appendHistory(json.data);
    }
});

let appendHistory = (json) => {
    json.data.data.forEach(element => {

        var newTransfer =
            `<div class="history">
            <h2 class = "history__info--bold">From User:</h2>
            <h2 class = "history__info" id="fromUser">"${element.fromName}"</h2>
            
            <h2 class = "history__info--bold">To User: </h2>
            <h2 class = "history__info">"${element.toName}"</h2>
    
            <h2 class = "history__info--bold">Amount:</h2>
            <h2 class = "history__info">"${element.coins}" coins</h2>
            
            <h2 class = "history__info--bold">Reason:</h2>
            <h2 class = "history__info">"${element.reason}" </h2>
            <h2 class = "history__info--bold">Message:</h2>
            <h2 class = "history__info">"${element.message}" </h2>
            </div>`;
        document.querySelector(".transfers").insertAdjacentHTML('afterend', newTransfer);
    });


}

fetch(base_url + "api/my_user_data/", {
    method: "get",
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {

    // console.log(json.data.data[0]._id);
    let UserID = json.data.data[0]._id;
    console.log(UserID);
    fetch(base_url + "api/my_user_data/" + UserID, {
        method: "get",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }

    }).then(result => {
        return result.json();
    }).then(json => {
        primus.write({
            "action": "updateHistory",
            "data": json
        });
        // appendHistory(json);
    })
})