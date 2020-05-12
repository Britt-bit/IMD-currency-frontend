fetch("http://localhost:3000/api/transaction", {
    'headers': {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    //console.log(json.data);
}).catch(err => {
    window.location.href = "login.html";
});




/* add transaction to database */

var btnTransfer = document.querySelector(".transfer--btn").addEventListener("click", (e) => {
    console.log('clicked');
    let toUser = document.querySelector('#name').value;
    let coins = document.querySelector('#amount').value;
    let reason = document.querySelector('#reason').value;
    let message = document.querySelector('#message').value;

    console.log(toUser);
    
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
            window.location.href = "thankYou.html";
        }).catch(err => {
            console.log(err)
        }); e.preventDefault();
    });
