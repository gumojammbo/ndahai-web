const secretInput = document.getElementById("jejeinput");
const secretBtn = document.getElementById("jeje");
const easterEgg = document.getElementById("easter-egg");
const secretVideo = document.getElementById("secret-video");
const closeEgg = document.getElementById("close-egg");

const secretCode = "tlohtzin";
const sejCode = "sej";

function showVideo() {
    const input = secretInput.value.toLowerCase();

    if (input === sejCode) {
        // Segundo easter egg
        secretVideo.src = "https://www.youtube.com/embed/-BoMd8De640?si=6QcQ1k6HLL_czykL&amp;start=38"; // puedes poner otro video
        easterEgg.style.display = "block";
        secretInput.value = "";
    } else {
        alert("jej");
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
