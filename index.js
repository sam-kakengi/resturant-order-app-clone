import menuArray from './data.js'

function menuArrayHtml(arr) {
    return menuArray.map((item) => {
        
        const {name, ingredients, id, price, emoji} = item
        
        return `
        <div class="menu-item">
                <div class="left-container">
                    <div class="emoji-container">
                        <p class="emoji">${emoji}</p>
                    </div>
                    
                    <div class="menu-description-container">
                        <h1 class="item-name">${name}</h1>
                        <p class="item-ingredients">${ingredients}</p>
                        <h2 class="item-price">£${price}</h2>
                    </div>
                </div>
                
                
                <div class="right-container">
                        <button id="item-btn" class="item-btn" data-name="${name}" data-price="${price}">+</button>
                </div>
        </div>
        <hr class="divider">`
        
    }).join('')
}


const mainSection = document.getElementById("container")

mainSection.innerHTML = menuArrayHtml(menuArray)


const itemBtns = document.querySelectorAll(".item-btn")
let basket = []
const basketLayout = document.getElementById("your-order-prices")
const removeBtns = document.querySelectorAll(".remove-btn")
const completeOrderBtn = document.getElementById("complete-order-btn")
const yourOrderContainer = document.getElementById('your-order-container')
const paymentDiv = document.getElementById("payment-div")


itemBtns.forEach(itemBtn => {
    itemBtn.addEventListener("click", function(e) {
        const itemName = e.target.dataset.name
        const itemPrice = parseFloat(e.target.dataset.price)
        basket.push({ name: itemName, price: itemPrice })
        console.log(basket)
        basketLayout.innerHTML += `<div id="basket-item"">
                                        <div class="item-details">
                                            <p>${itemName}</p>
                                            <button class="remove-btn">remove</button>
                                        </div>
                                        <p>£${itemPrice}</p>
                                        
                                    </div>`
                                    
        renderTotal();
                                    
        
        
    });
});

document.addEventListener("click", function(event) {

    if (event.target.classList.contains("remove-btn")) {
        
        const divToRemove = event.target.closest("#basket-item")
        
    
        const itemName = divToRemove.querySelector("p").textContent
        //basket = basket.filter(item => item.name !== itemName);
        const indexToRemove = basket.findIndex(item => item.name === itemName)
        
        if (indexToRemove !== -1) {
            basket.splice(indexToRemove, 1)
        }
        
        divToRemove.remove()
            
        renderTotal()
        
    }
})


completeOrderBtn.addEventListener("click", function() {
    paymentDiv.innerHTML = `
                            
                            <form action="" id="paymentForm" method="POST">
                                <ul id="payment-list">
                                
                                    <h1 id="payment-form-title">Enter card details</h1>
                                    <li id="form-li-input">
                                        <input class="form-input" type="text" id="name" name="customer_name" placeholder="Enter your name" required />
                                    </li>
                                    
                                    <li id="form-li-input">
                                        <input class="form-input" type="text" id="card_number" name="card_num" placeholder="Enter your card number" maxlength="19" required />
                                    </li>
                                    
                                    <li id="form-li-input">
                                        <input class="form-input" type="password" id="cvv" name="card_security_num" placeholder="Enter your CVV" minlength="3" maxlength="3" required />
                                    </li>
                                    
                                    <li class="payment-button-li">
                                        <button type="submit" id="payment-btn">Pay</button>
                                    </li>
                                    
                                    
                                </ul>
                            </form>`
                        
                            
    paymentDiv.classList.remove("no-display")
    
    const paymentForm = document.getElementById("paymentForm")
    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let name = document.getElementById("name")

        paymentDiv.innerHTML = `<div class="modal-inner-loading">
                                    <img src="images/pulse.svg" class="loading">
                                    <p id="confirmationText">
                                        Confirming your payment details...
                                    </p>
                                </div>`
        
        setTimeout(function() { 
            
        
            paymentDiv.classList.add("no-display")
    
            yourOrderContainer.innerHTML = `<h1 class="thank-you-msg">Thanks ${name.value}, your order is on it's way!</h1>`

            setTimeout(function() {
                localStorage.clear();
                location.reload()
            }, 5000)}, 5000)

        })
})







function calculateTotalPrice() {
    return basket.reduce((total, item) => total + item.price, 0)
}

// Function to render the total price in the basket
function renderTotal() {
    const totalPriceElement = document.getElementById('total-price');
    if(basket.length === 0) {
        yourOrderContainer.classList.add("no-display")
    } else {
        yourOrderContainer.classList.remove("no-display")
        totalPriceElement.innerHTML = `<p id="total-p">Total:</p> <p id="caculation-p">£${calculateTotalPrice().toFixed(2)}</p>`
        
    }
    
}



