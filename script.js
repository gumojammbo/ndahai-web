const secretInput = document.getElementById("jejeinput");
const secretBtn = document.getElementById("jeje");
const easterEgg = document.getElementById("easter-egg");
const secretVideo = document.getElementById("secret-video");
const closeEgg = document.getElementById("close-egg");

const secretCode = "tlohtzin";

function showVideo() {
    const input = secretInput.value.toLowerCase();
    if (input === secretCode) {
        secretVideo.src = "https://www.youtube.com/embed/19VUidcK24Q?si=JQQgzl3cUrC8saVX&autoplay=1";
        easterEgg.style.display = "block";
        secretInput.value = "";
    } else {
        alert("❌ Código incorrecto, inténtalo de nuevo...");
    }
}

secretBtn.addEventListener("click", showVideo);

secretInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        showVideo();
    }
});

closeEgg.addEventListener("click", function() {
    secretVideo.src = ""; 
    easterEgg.style.display = "none";
});
