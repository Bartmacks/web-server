console.log("Clienside Javascript file is loading.");

const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const weatherPic =   document.getElementById("weatherIcon");
const staticText = document.querySelectorAll(".staticText")

//staticText.forEach(el => el.style.visibility = "hidden");

weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = "";
        messageOne.textContent += data.location;
        messageTwo.textContent += "It is currently ";
        messageTwo.textContent += data.w_temp;
        messageTwo.textContent += " degrees out. It feels like ";
        messageTwo.textContent += data.w_feels
        messageTwo.textContent += "  degrees."
        weatherPic.src = data.imgSrc;
        
        //staticText.forEach(el => el.style.visibility = "visible");
      }
    });
  });
});
