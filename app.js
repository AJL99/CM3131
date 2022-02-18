const authBtn = document.getElementById("auth-btn")
const app = express();
authBtn.addEventListener("click", authUser);

function authUser(){
  console.log("success");
  window.location.href="https://www.bungie.net/en/oauth/authorize?client_id=39377response_type=code&state=582FHbffn481niolS233n";
}