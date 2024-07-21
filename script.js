let file = 'http://127.0.0.1:5500/songs/'; // Assuming you have a file named 'songs.json'

const Songs_data  = [];

const fetchData = async (file) => {
    try {
        let response = await fetch(file);

        if (response.ok) {
            let textas = await response.text();

            let divi = document.createElement('div');
            divi.innerHTML = textas;

            let data = divi.querySelector('#wrapper');
            let list = data.getElementsByClassName('name');

             for (let i = 1; i <= list.length; i++) {
                 Songs_data.push(list[i].innerText)
                 }
             
            
            console.log("data:", list.length);


        } else {
            console.log("data is not here");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

async function playing(Songs) {

let add = document.getElementsByClassName('container')[0];


    for (let i = 0; i < Songs.length; i++) {
        add.innerHTML +=  `<div class='card'><p>${Songs[i]}</p><button><a href="http://127.0.0.1:5500/songs/${Songs[i]}"></a></button></div>`;   
    }
    var audio = new Audio(`http://127.0.0.1:5500/songs/${Songs[0]}`);
    audio.play();
}


async function name() {
    await fetchData(file);

    await playing(Songs_data)
  
}

name()
