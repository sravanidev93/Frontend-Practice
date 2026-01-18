import './style.css';
import playIcon from "./icons/play.svg";
import pauseIcon from "./icons/pause.svg";
import muteIcon from "./icons/mute.svg";
import unMuteIcon from "./icons/unmute.svg";

const SONG_URL = "https://saavn.sumit.co/api/search/songs";
//curl 'https://saavn.sumit.co/api/search/songs?query=Believer&page=0&limit=10'
const search = document.getElementById("search");
const main = document.getElementById("songCards");
const songInfo = document.getElementById("bottom");
const image = document.getElementById("songImage");
const title = document.getElementById("songTitle");
const songArtists = document.getElementById("songArtists");
const progressbar = document.getElementById("songProgressBar");
const playPause = document.getElementById("play-pause");
const playPauseBtn = document.getElementById("playPauseBtn");
const volumeSlider = document.getElementById("volume-slider");
const muteBtn = document.getElementById("mute-btn");
const muteHandle = document.getElementById("muteToggle");

document.addEventListener("DOMContentLoaded", () => {

    search.addEventListener("input", (event) => {
        debouncedSearch(event.target.value);
    });
    let lastVolume;

    function debounce(func, timeout = 500) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        }

    }

    let audioEl;

    playPauseBtn.addEventListener("click", () => {
        if (!audioEl) {
            return
        }
        else if (audioEl.paused) {
            audioEl.play();
            playPause.src = pauseIcon;
        } else {
            audioEl.pause();
            playPause.src = playIcon;
        }
    });
    function handleAudio() {
        if (audioEl.volume > 0) {
            lastVolume = audioEl.volume;
            volumeSlider.value = 0;
            audioEl.volume = 0;
            muteHandle.src = unMuteIcon;
        } else {

            audioEl.volume = (lastVolume) ? lastVolume : 1;
            volumeSlider.value = lastVolume * 100;
            muteHandle.src = muteIcon;

        }
    }
    volumeSlider.addEventListener("input", () => {
        if (!audioEl) {
            return;
        }
        audioEl.volume = (volumeSlider.value / 100);
        lastVolume = audioEl.volume;
    });

    muteBtn.addEventListener("click", handleAudio);

    function onTimeUpdate() {
        progressbar.value = (audioEl.currentTime / audioEl.duration) * 100;
    }

    function onProgressChange() {
        if (!audioEl) {
            return
        }
        audioEl.currentTime = (progressbar.value / 100) * audioEl.duration;

    }

    function buildSongInfo(songImageSrc, songName, artistsNames, songUrlSrc) {
        image.src = songImageSrc;
        title.innerText = songName;
        console.log(songArtists, artistsNames)
        songArtists.innerText = artistsNames;
        if (audioEl) {
            audioEl.pause();
            audioEl.removeEventListener("timeppdate", onTimeUpdate);
            progressbar.removeEventListener("input", onProgressChange);
        }
        audioEl = new Audio(songUrlSrc);
        audioEl.play();

        audioEl.volume = lastVolume ?? 1;
        volumeSlider.value = audioEl.volume * 100;

        playPause.src = pauseIcon;

        audioEl.addEventListener("timeupdate", onTimeUpdate);
        progressbar.addEventListener("input", onProgressChange);

    }

    async function searchSongs(songName) {
        const response = await fetch(`${SONG_URL}?query=${songName}&page=0&limit=6`);
        // console.log(songName);
        const result = await response.json();
        const data = result.data;
        const songsData = data.results;
        // console.log(data, songsData);
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

                // if (songInfo.classList.contains("hidden")) {
                songInfo.classList.remove("hidden");
                songInfo.classList.add("flex");
                buildSongInfo(firstPic, name, songArtists, song_url);

                // } else {
                //     songInfo.classList.remove("flex");
                //     songInfo.classList.add("hidden");
                // }

            });


            songCard.setAttribute("song-id", id);
            // console.log(song_url)
            songCard.className = "dark:bg-slate-900 bg-white dark:border-yellow-400  border-4 border-yellow-200 rounded-lg  p-6 box-border flex flex-col items-center gap-4 m-6 shadow-2xl shadow-yellow-200 dark:shadow-lg dark:shadow-yellow-200 ";
            songCard.innerHTML = `
            <div class="w-full flex flex-row content-center justify-center  ">
             <img class="object-cover rounded-lg w-48 h-48 " src="${firstPic}">
            </div>               
                <h2  class=" text-yellow-400 text-lg text-shadow-lg">${name}</h2>
                <p class="dark:text-gray-300 text-gray-700 line-clamp-2  font-sans text-shadow-md">${songArtists}</p>
                <audio  class="w-full"  controls>
                    <source src="${song_url}"type="audio/mp4">
                </audio>
            `;
            main.appendChild(songCard);
        }

    }
    const debouncedSearch = debounce(searchSongs, 500);
})

