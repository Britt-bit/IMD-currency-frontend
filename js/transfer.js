var btnTransfer = document.querySelector(".transfer--btn").addEventListener("click", (e) => {
    console.log('clicked');
    let name = document.querySelector('#name').value;
    let amount = document.querySelector('#amount').value;
    let reason = document.querySelector('#reason').value;
    let message = document.querySelector('#message').value;

    console.log(name);
    console.log(amount);
    console.log(reason);
    console.log(message);
});