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
            `<div class="transfers">
            <h3>From User:</h3>
            <p id="fromUser">"${element.fromUser}"</p>
            
            <h3>To User: </h3>
            <p id="toUser">"${element.toUser}"</p>
    
            <h3>Amount:</h3>
            <p id="amountCoins">"${element.coins}" coins</p>
            
            <h3>Reason:</h3>
            <p id="Reason">"${element.reason}" </p>
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
        console.log(json);
        // appendHistory(json);
    })
})