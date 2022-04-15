//-------------------------------------------------------------------------------------------------
//         home page
//-------------------------------------------------------------------------------------------------
window.onload = init; //runs the code after the HTML is loaded
function init(){
console.log(localStorage.getItem("country"));


const contentFill = document.getElementById("content-shell");
const homeButton = document.getElementById("btn-home");
const countryButton = document.getElementById("btn-SC");
const currencyButton = document.getElementById("btn-EC");
homeButton.addEventListener("click", goHome);
currencyButton.addEventListener("click", openCurrencyPage);
countryButton.addEventListener("click", openCountryPage);

//used to reset the homepage. bit of a bodge but mostly works
function goHome(){
  contentFill.innerHTML = `
  <ion-list-header>Home</ion-list-header>

  <ion-item>
      <ion-icon color="dark" name="flag-outline"></ion-icon>
      <ion-button class="homepage-btn" id="btn-SC">Chose Country</ion-button>
  </ion-item>
  
  <ion-item>
      <ion-icon color="dark" name="card-outline"></ion-icon>
      <ion-button class="homepage-btn" id="btn-EC">Exchange Currency</ion-button>
  </ion-item>
  `
}

//-------------------------------------------------------------------------------------------------
//         currency page
//-------------------------------------------------------------------------------------------------
function openCurrencyPage(){

//when user clicks button it replaces the page content the currency exchanger
  contentFill.innerHTML = `
  <ion-select id="select-output" placeholder="Chose Home Currency" ></ion-select>

            <ion-card>
                <ion-item>
                    <!--user enters amount of currency here-->
                    <ion-label>
                        <ion-input placeholder="Enter Currency Amount" type="number" id="input-lbl"></ion-input>
                    </ion-label>
                    <!--currency converted to euros here-->

                </ion-item>
                <ion-item>
                    <ion-label id="output-lbl"></ion-label>
                </ion-item>
                    <ion-item>
                        <ion-button id="btn-convert-currency">
                            Convert
                        </ion-button>
                    </ion-item>
                    <ion-item>
                        <ion-button id="btn-VAT">
                            Show VAT
                        </ion-button>
                    </ion-item>
                <ion-card-content>
                    <ion-item id="image-display"><img src="https://countryflagsapi.com/png/${localStorage.getItem("country")}"></ion-item>
                </ion-card-content>
            </ion-card>

            <ion-list id="list-output">test</ion-list> <!--used for debugging-->
  `

  //default values for data, d suffix stands for default
var dCurrency = "GBP";
var dAmount = 1;
var dVAT = localStorage.getItem("country");

const selectOutput = document.getElementById("select-output");
const amountInput = document.getElementById("input-lbl");
const outputText = document.getElementById ("output-lbl");
const convertBtn = document.getElementById("btn-convert-currency");
const vatBtn = document.getElementById("btn-VAT");
convertBtn.addEventListener("click", convertCurrency);
vatBtn.addEventListener("click", findVAT);

const currencyCodeArray = ["GBP", "USD", "AUD", "EUR", "BGN", "HRK", "CZK", "DKK", "HUF", "PLN", "RON", "SEK", "CHF",]; //decided to make my own array rather than import one as I only wanted EU currencies and a few other large ones
//allows users to input their home currency and convert an amount into euros
function convertCurrency(){
  dAmount = amountInput.value;
var requestURL = `https://api.exchangerate.host/latest?amount=${dAmount}&base=${dCurrency}&symbols=EUR`;
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

//this is quite messy but the only way I could figure it out
request.onload = function() {
  var response = request.response;
  //console.log(response); //is grabs the response from the API after you input your number
  let convertedNumber = JSON.stringify(response.rates); //this turns the amount of money into a string, but that string is messy and has waste that I want to remove
  let currencyToChop = convertedNumber.length; //due to number having different length depending on the inputed number, you need to know the exact length of the string so that you can change the substring command to always remove only the last character
  let outputNumber = convertedNumber.substring(7, currencyToChop-1); //this removed the first 7 characters from the string as the first 7 characters will always be the same amount of junk, it then removes the curly bracket at the end
  outputText.textContent = `${dAmount}` + ` ${dCurrency} = €` + outputNumber; //finally the amount in euros is shown with non of the junk
  }

  const grabCurrency = document.getElementById("ion-select-option");
  console.log(grabCurrency);

}
//shows the user the VAT rates of a selected country, and shows how much they can expect prices to differ from the european average
function findVAT(){
  var requestURL = `https://api.exchangerate.host/vat_rates?symbols=${dVAT}`;
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  console.log(response);
}
}


function populateList(){
//populates the pop out list from the array
for(var i = 0; i < currencyCodeArray.length; i++) {
  var cCA = currencyCodeArray[i];
  var newElement = document.createElement('ion-select-option');
  newElement.textContent = cCA;
  newElement.value = cCA;
  selectOutput.appendChild(newElement);
}
}


populateList();

 }





//-------------------------------------------------------------------------------------------------
//         country select page
//-------------------------------------------------------------------------------------------------
const countryNamesArray = ["Austria", "Belgium", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Ireland", "Italy", "Latvia", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Sweden"];
const countryCodesArray = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"];


//array to populate the countries list to save having to write the same code 27 times... I know I ended up writing the same thing 27 times later but at least this saved 90 lines of code...
function openCountryPage(){
  let countryList = ""
  for (let i=0; i < countryNamesArray.length; i++){

    countryList +=
    `
    <ion-item>
        <ion-avatar><img src="https://countryflagsapi.com/png/${countryCodesArray[i]}"></ion-avatar>
        <ion-button class="country-btn" id="btn-${countryCodesArray[i]}">${countryNamesArray[i]}</ion-button>
    </ion-item>  
    `  
    ;
  }


  

  contentFill.innerHTML = countryList;
// yes I hardcored this but it wouldn't work without it. forgive me
  const buttonAT = document.getElementById("btn-AT");
  buttonAT.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/AT">`;
    localStorage.setItem("country", "AT");
  });

  const buttonBE = document.getElementById("btn-BE");
  buttonBE.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/BE">`;
    localStorage.setItem("country", "BE");
  });
  const buttonBG = document.getElementById("btn-BG");
  buttonBG.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/BG">`;
    localStorage.setItem("country", "BG");
  });
    
  const buttonHR = document.getElementById("btn-HR");
  buttonHR.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/HR">`;
    localStorage.setItem("country", "HR");
  });
  const buttonCY = document.getElementById("btn-CY");
  buttonCY.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/CY">`;
    localStorage.setItem("country", "CY");
  });
  const buttonCZ = document.getElementById("btn-CZ");
  buttonCZ.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/CZ">`;
    localStorage.setItem("country", "CZ");
  });
  const buttonDK = document.getElementById("btn-DK");
  buttonDK.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/DK">`;
    localStorage.setItem("country", "DK");
  });
  const buttonEE = document.getElementById("btn-EE");
  buttonEE.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/EE">`;
    localStorage.setItem("country", "EE");
  });
  const buttonFI = document.getElementById("btn-FI");
  buttonFI.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/FI">`;
    localStorage.setItem("country", "FI");
  });
  const buttonFR = document.getElementById("btn-FR");
  buttonFR.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/FR">`;
    localStorage.setItem("country", "FR");
  });
  const buttonDE = document.getElementById("btn-DE");
  buttonDE.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/DE">`;
    localStorage.setItem("country", "DE");
  });
  const buttonGR = document.getElementById("btn-GR");
  buttonGR.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/GR">`;
    localStorage.setItem("country", "GR");
  });
  const buttonHU = document.getElementById("btn-HU");
  buttonHU.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/HU">`;
    localStorage.setItem("country", "HU");
  });
  const buttonIE = document.getElementById("btn-IE");
  buttonIE.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/IE">`;
    localStorage.setItem("country", "IE");
  });
  const buttonIT = document.getElementById("btn-IT");
  buttonIT.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/IT">`;
    localStorage.setItem("country", "IT");
  });
  const buttonLV = document.getElementById("btn-LV");
  buttonLV.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/LV">`;
    localStorage.setItem("country", "LV");
  });
  const buttonLT = document.getElementById("btn-LT");
  buttonLT.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/LT">`;
    localStorage.setItem("country", "LT");
  });
  const buttonLU = document.getElementById("btn-LU");
  buttonLU.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/LU">`;
    localStorage.setItem("country", "LU");
  });
  const buttonMT = document.getElementById("btn-MT");
  buttonMT.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/MT">`;
    localStorage.setItem("country", "MT");
  });
  const buttonNL = document.getElementById("btn-NL");
  buttonNL.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/NL">`;
    localStorage.setItem("country", "NL");
  });
  const buttonPL = document.getElementById("btn-PL");
  buttonPL.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/PL">`;
    localStorage.setItem("country", "PL");
  });
  const buttonPT = document.getElementById("btn-PT");
  buttonPT.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/PT">`;
    localStorage.setItem("country", "PT");
  });
  const buttonRO = document.getElementById("btn-RO");
  buttonRO.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/RO">`;
    localStorage.setItem("country", "RO");
  });
  const buttonSK = document.getElementById("btn-SK");
  buttonSK.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/SK">`;
    localStorage.setItem("country", "SK");
  });
  const buttonSI = document.getElementById("btn-SI");
  buttonSI.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/SI">`;
    localStorage.setItem("country", "SI");
  });
  const buttonES = document.getElementById("btn-ES");
  buttonES.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/ES">`;
    localStorage.setItem("country", "ES");
  });
  const buttonSE = document.getElementById("btn-SE");
  buttonSE.addEventListener("click", function(){
    document.getElementById("chosenCountry").innerHTML=`<img src="https://countryflagsapi.com/png/SE">`;
    localStorage.setItem("country", "SE");
  });
  function countryChoice(){
    
}

}

}