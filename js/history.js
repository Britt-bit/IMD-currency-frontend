const base_url = "https://imd-coin.herokuapp.com/";

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
        console.log(json);
        // console.log(json.data.data[0]._id);
        // let hits = json.data.data.length;
        // console.log(hits);
        // const htmlFromUser = document.querySelector("#fromUser");
        // const htmlToUser = document.querySelector("#toUser");
        // const htmlCoins = document.querySelector("#amountCoins");
        // const htmlReason = document.querySelector("#Reason");

        json.data.data.forEach(element => {

            // htmlFromUser.innerHTML = element.fromUser;
            // htmlToUser.innerHTML = element.toUser;
            // htmlCoins.innerHTML = element.coins + " coins";
            // htmlReason.innerHTML = element.reason;
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


    })
})