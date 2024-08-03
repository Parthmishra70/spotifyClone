const file = 'http://127.0.0.1:5500/songs/'; // Assuming you have a file named 'songs.json'

const Songs_data = [];
let currntSong = null;
let audio = null;
let playbutton = document.getElementsByClassName('audioControls')[0].getElementsByTagName('img')[1];
let count;

const fetchData = async (file) => {
    try {
        const response = await fetch(file);

        if (response.ok) {
            const textas = await response.text();

            const divi = document.createElement('div');
            divi.innerHTML = textas;

            const data = divi.querySelector('#wrapper');
            if (data) {
                const list = data.getElementsByClassName('name');
                for (let i = 0; i < list.length; i++) { // Corrected loop start and condition
                    Songs_data.push(list[i].innerText);
                }
                
                // playS(`${Songs_data[0]}.mp3`, true);

                console.log("Data length:", list.length);
            } else {
                console.log("#wrapper element is not found.");
            }
        } else {
            console.log("Data is not available.");
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


const addSongCards = (Songs) => {
    const container = document.querySelector('.container');
    Songs.forEach((song) => {
        container.innerHTML += `<div class='card'><p>${song}</p><div class="playcard"><img src="image/play.svg" alt="Play"></div></div>`;
    });
};

function format_time(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Pad with zeros if necessary
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}



async function playS(songindex, music = false) {
    if (!audio) {
        audio = new Audio();
    }

    if (currntSong !== songindex) {
        audio.src = `http://127.0.0.1:5500/songs/${songindex}`;
        currntSong = songindex;
        count = true;
        audio.play();
    } else if (!audio.paused) {
        audio.currentTime = 0; // Reset the current song
        audio.play();
        count = true;

    } else {
        audio.play();
        count = true;

    }

    if (music) {
        audio.pause();
        playbutton.src = './image/play.svg';
        count = true;
        return;
    }

    var audioadd = document.getElementsByClassName('controls')[0].getElementsByTagName('span')[0];
    var timeadd = document.getElementsByClassName('dur')[0].getElementsByTagName('span')[0];

    audioadd.innerText = songindex.slice(0, 30);

    audio.addEventListener('loadedmetadata', () => {
        playbutton.src = './image/pause.svg';
        count = true;

    });

    audio.addEventListener('timeupdate', () => {
        timeadd.innerText = `${format_time(audio.currentTime)}/${format_time(audio.duration)}`;
        document.getElementsByClassName('progress-bar')[0].getElementsByClassName('circle')[0].style.left = (audio.currentTime/audio.duration)*100 + "%";
    });

    playbutton.addEventListener('click', () => {
        if (count) {
            audio.pause();
            playbutton.src = './image/play.svg';
            count = false;


        } else {
            audio.play();
            playbutton.src = './image/pause.svg';
            count = true;
        }
    });


   
}

document.getElementsByClassName('progress-bar')[0].addEventListener('click', (e) => {
    let precent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.getElementsByClassName('progress-bar')[0].getElementsByClassName('circle')[0].style.left = precent + "%";
    audio.currentTime = ((audio.duration) * precent) /100;
})

document.getElementsByClassName('arrows')[0].getElementsByTagName('img')[0].addEventListener('click',()=> document.getElementsByTagName('nav')[0].style = 'left:0%;' )
document.getElementsByClassName('logo')[0].getElementsByTagName('img')[1].addEventListener('click',()=> document.getElementsByTagName('nav')[0].style = 'left:-100%;' )


const main = async () => {
    await fetchData(file);
    addSongCards(Songs_data);

    // Get all elements with the class name "card"
    const cards = document.getElementsByClassName('card');

    // Loop through each card and find its play button
    Array.from(cards).forEach((card) => {
        const playButton = card.querySelector('.playcard');

        playButton.addEventListener('click', () => {

            playS(`${card.querySelector('p').innerText}`)

        });
    });
};




main();

