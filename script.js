/*base funcs*/
function getNasaPhoto() {
    const dateInput = document.getElementById('birthday-input').value;
    const loadingText = document.getElementById('loading-text');
    const spaceTitle = document.getElementById('space-title');
    const spaceImg = document.getElementById('space-img');
    const spaceExplanation = document.getElementById('space-explanation');
    const spaceCopyright = document.getElementById('space-copyright');
    const downloadBtn = document.getElementById('download-btn');
/* take the pic from nasa link based on the date*/

/*if n date picked, stop*/
    if (!dateInput) return;
    /*if a date is picked */

    loadingText.style.display = "block";
    spaceTitle.innerText = "";
    spaceImg.style.display = "none";
    spaceExplanation.style.display = "none";
    spaceCopyright.style.display = "none";
    downloadBtn.style.display = "none";
    /* API URL*/
    const url = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateInput}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        loadingText.style.display = "none";

        if (data.explanation) {
            spaceExplanation.innerText = data.explanation;
            spaceExplanation.style.display = "block";
        }
          /*Show  photographer credit*/
        if (data.copyright) {
            spaceCopyright.innerText = "© " + data.copyright.trim();
        } else {
            spaceCopyright.innerText = "Courtesy NASA / Public Domain";
        }
        spaceCopyright.style.display = "block";

        if (data.media_type === "image") {
            spaceTitle.innerText = data.title;
            spaceImg.src = data.url;
            spaceImg.style.display = "block";

            /*download button*/
            const downloadUrl = data.hdurl || data.url;
            downloadBtn.href = downloadUrl;
            downloadBtn.download = `NASA_APOD_${dateInput}.jpg`;
            downloadBtn.style.display = "inline-block";
        } 
        
    })
    /*failed no internet sad😔*/
    .catch(error => {
        loadingText.style.display = "none";
        spaceTitle.innerText = "Connection failed! Please check your internet.";
        spaceImg.src = "";
    });
}
/*grab the window by clicking and holding the header bar*/

function makeWindowDraggable(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = elmnt.querySelector('.window-header');

    if (header) {
        header.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

document.querySelectorAll('.window').forEach(win => {
    makeWindowDraggable(win);
})
/*make sure the wind is in the mid*/
function centerWindow(el) {
    const rect = el.getBoundingClientRect();
    el.style.top = Math.max(20, (window.innerHeight - rect.height) / 2) + "px";
    el.style.left = Math.max(20, (window.innerWidth - rect.width) / 2) + "px";
}

window.addEventListener('load', () => {
    document.querySelectorAll('.window').forEach(centerWindow);
});