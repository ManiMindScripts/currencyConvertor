const apiKey = "ff80c8abd3b787e5a8698bfa"
const BASE_URL =
              `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`

const dropDowns = document.querySelectorAll(".drop-down select")
const btn= document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr= document.querySelector(".to select")
const msg = document.querySelector(".msg")
 
for (let select of dropDowns) {
    for (let currCode in countryList) {
        let newOptions = document.createElement("option")
        newOptions.innerText = currCode
        newOptions.value = currCode
        if (select.name === "from" && currCode === "USD") {
            newOptions.selected = "selected"
        }
        else if (select.name === "to" && currCode === "PKR") {
            newOptions.selected = "selected"
        }

        select.append(newOptions)
    }
    select.addEventListener("change", (evt) => {
        update(evt.target)
    })
}
const update = (element) => {
    let currCode = element.value
    let countryCode=  countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
    let img = element.parentElement.querySelector("img")
     img.src=newSrc
}
btn.addEventListener("click", async (evet) => {
    evet.preventDefault()
    let amount= document.querySelector(".amount input")
    let amtVa = amount.value
    if(amtVa === "" || amtVa < 1){
        amtVa = 1
        amount.value = "1"
    }
    /// api ///////
  const URL = `${BASE_URL}${fromCurr.value}`;
    try {
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Failed to fetch exchange rate.");
        }
        let data = await response.json();
        let rate = data.conversion_rates[toCurr.value];
        if (rate) {
            let fiAmt = amtVa * rate;
            msg.innerText = `${amtVa} ${fromCurr.value} = ${fiAmt.toFixed(2)} ${toCurr.value}`;
        } else {
            msg.innerText = "Exchange rate not available for the selected currency.";
        }
    } catch (error) {
        console.error(error);
        msg.innerText = "Error fetching exchange rate.";
    }
})
