document.getElementById(img="Rome").addEventListener("click", () => {
    alert("Friends and me in Rome!");
  });
document.getElementById("Billionaires Bay").addEventListener("click", () => {
    alert("Billionaires Bay in Antibes, France");
  });
document.getElementById("Youtube").addEventListener("click", function() {
    window.location.href = "https://www.youtube.com/watch?v=QrR_gm6RqCo"; 
  });

  const myImage = document.getElementById("Billionaires Bay");
myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/AntibesBB.png") {
    myImage.setAttribute("src", "images/Swimming.png");
  } else {
    myImage.setAttribute("src", "images/AntibesBB.png");
  }
};

let myHeading = document.querySelector("h2");

function setUserName() {
  const myName = prompt("Please enter your name.");
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Nice to meet you ${myName}!`;
  }
}

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `Nice to meet you ${storedName}!`;
}

