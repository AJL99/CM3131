const heightDisplay = document.getElementById("image-display");
const munroTitle = document.getElementById("munro-name");
const outputSelect = document.getElementById("select-output");

const outputList = document.getElementById("list-output");

const munros = `https://github.com/HVinceH/munros/blob/468fbc6452d26c93000925be397c75fdd7b819c5/public/munros.json`;

function updateDispaly(jsonObj){
  let munroObjArray = jsonObj;
  let munroObj = munroObjArray[0];
  console.log(munroObj);

  let munroName = munroObj.Name;
  let munroHeight = munroObj.Height;

  munroTitle.textContent = munroName;
  heightDisplay.textContent = munroHeight;
}