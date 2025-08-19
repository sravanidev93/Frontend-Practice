import './style.css';
import playIcon from "./icons/play.svg";
import pauseIcon from "./icons/pause.svg";

const SONG_URL = "https://saavn.dev/api/search/songs";
const search = document.getElementById("search");
const main = document.getElementById("songCards");
const songInfo = document.getElementById("bottom");
const image = document.getElementById("songImage");
const title = document.getElementById("songTitle");
const songArtists = document.getElementById("songArtists");
const progressbar = document.getElementById("songProgressBar");
const playPause = document.getElementById("play-pause");
const playPauseBtn = document.getElementById("playPauseBtn");

document.addEventListener("DOMContentLoaded", () => {

    search.addEventListener("input", (event) => {
        debouncedSearch(event.target.value);
    })

    function debounce(func, timeout = 900) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        }

    }

    let audioEl;

    function buildSongInfo(songImageSrc, songName, artistsNames, songUrlSrc) {
        image.src = songImageSrc;
        title.innerText = songName;
        console.log(songArtists, artistsNames)
        songArtists.innerText = artistsNames;
        if (audioEl) {
            audioEl.pause();
        }
        audioEl = new Audio(songUrlSrc);
        audioEl.play();
        playPause.src = pauseIcon;
        playPauseBtn.addEventListener("click", () => {
            if (audioEl.paused) {
                audioEl.play();
                playPause.src = pauseIcon;
            } else {
                audioEl.pause();
                playPause.src = playIcon;
            }
        })
        console.log(playIcon, pauseIcon)
        audioEl.addEventListener("timeupdate", () => {
            progressbar.value = (audioEl.currentTime / audioEl.duration) * 100;
        })
        progressbar.addEventListener("input", () => {

            audioEl.currentTime = (progressbar.value / 100) * audioEl.duration;
        })
    }

    async function searchSongs(songName) {
        const response = await fetch(`${SONG_URL}?query=${songName}&page=0&limit=6`);
        // console.log(songName);
        const result = await response.json();
        const data = result.data;
        const songsData = data.results;
        // console.log(songsData);
        main.innerHTML = "";

        for (const song of songsData) {
            const { id, name, language, year } = song;
            // console.log(id, name, language, year);
            let songArtists = ""
            const { artists: { all: artistsNames }, image } = song;

            const firstPic = image[0]?.url;

            // const secondPic = image[1]?.url;

            // const thirdPic = image[2]?.url;

            const { downloadUrl } = song;
            let songElement = downloadUrl[downloadUrl.length - 1];
            const song_url = songElement.url;
            // console.log(artistsNames);
            for (var artist of artistsNames) {
                const { name } = artist;
                songArtists += name;
                songArtists += " ";
            }
            // console.log(songArtists);
            const songCard = document.createElement("section");

            songCard.addEventListener("click", () => {

                if (songInfo.classList.contains("hidden")) {
                    songInfo.classList.remove("hidden");
                    songInfo.classList.add("flex");
                    buildSongInfo(firstPic, name, songArtists, song_url);

                } else {
                    songInfo.classList.remove("flex");
                    songInfo.classList.add("hidden");
                }

            })

            songCard.setAttribute("song-id", id);
            console.log(song_url)
            songCard.className = "dark:bg-slate-700 border rounded-lg bg-white p-6 box-border flex flex-col items-center gap-4 m-6 shadow-lg ";
            songCard.innerHTML = `
            <div class="w-full   flex flex-row content-center justify-center  ">
             <img class="object-cover w-48 h-48" src="${firstPic}">
            </div>               
                <h2  class=" text-yellow-400 text-lg text-shadow-lg">${name}</h2>
                <p class="dark:text-white-900 text-shadow-md">${songArtists}</p>
                <audio controls>
                    <source src="${song_url}" type="audio/mp4">
                </audio>
            `;
            main.appendChild(songCard);
        }

    }
    const debouncedSearch = debounce(searchSongs, 900);
})

