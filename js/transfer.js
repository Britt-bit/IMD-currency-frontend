fetch("http://localhost:3000/api/transaction", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
}).catch(err => {
    window.location.href = "login.html";
});

/* add transaction to database */

var btnTransfer = document.querySelector(".transfer--btn").addEventListener("click", (e) => {
    console.log('clicked');
    let toUser = document.querySelector('#name').value;
    let coins = document.querySelector('#coins').value;
    let reason = document.querySelector('#reason').value;
    let message = document.querySelector('#message').value;

    console.log(toUser);
    console.log(coins);
    console.log(reason);
    console.log(message);
    
        fetch("http://localhost:3000/api/transaction", {
            method: "post",
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            
            body: JSON.stringify({
                "toUser": toUser,
                "coins": coins,
                "reason": reason,
                "message": message
            })
        })
        .then(result => {
            return result.json();
        }).then(json => {
            console.log(json);
            let transaction = 
            console.log(json.data._id);
            console.log(json.data.toUser);
            console.log(json.data.coins);
            console.log(json.data.reason);
                console.log(json.data.message);
                `<p> Thank you for your transaction</p>`;
             document.querySelector(".transaction__new").insertAdjacentHTML('afterend', transaction);
        }).catch(err => {
            console.log(err)
        }); e.preventDefault();
    });
