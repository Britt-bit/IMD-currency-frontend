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

//add transaction on enter

let input = document.querySelector(".transaction__input");
input.addEventListener("keyup", e => {
    if(e.keyCode === 13) {
        //on enter
        let message = input.value;
        fetch("http://localhost:3000/api/transaction", {
            method: "post",
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            
            body: JSON.stringify({
                "message": message
            })
        })
        .then(result => {
            return result.json();
        }).then(json => {
            console.log(json);
            let transaction = `<div class="transaction">
                <input type="checkbox" class="transaction__state">  
                <div class="transaction__text">${json.data.message}</div>
                <a class="transaction__delete" href="#" data-id="${json.data._id}">delete</a>
             </div>`;
             document.querySelector(".transaction__new").insertAdjacentHTML('afterend', transaction);
        }).catch(err => {
            console.log(err)
        })
    }
    e.preventDefault();
});