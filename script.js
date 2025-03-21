document.addEventListener("DOMContentLoaded", function () {
    const tracks = [
        "music/2hollis-style.m4a",
        "music/osamason-newtune.m4a",
        "music/2hollis-trauma.m4a",
        "music/SL open.m4a",
        "music/SL open 2.m4a"
    ];

    let currentTrack = 0;
    let audio = new Audio(tracks[currentTrack]);
    audio.volume = 0.5;

    function playTrack(index) {
        currentTrack = index;
        audio.src = tracks[currentTrack];
        audio.load();
        audio.play().catch(err => console.error("Ошибка воспроизведения:", err));
        document.getElementById("play").textContent = "⏸";
    }

    document.getElementById("play").addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            this.textContent = "⏸";
        } else {
            audio.pause();
            this.textContent = "▶️";
        }
    });

    document.getElementById("next").addEventListener("click", function () {
        playTrack((currentTrack + 1) % tracks.length);
    });

    document.getElementById("prev").addEventListener("click", function () {
        playTrack((currentTrack - 1 + tracks.length) % tracks.length);
    });

    document.getElementById("volume").addEventListener("input", function () {
        audio.volume = this.value;
    });

    audio.addEventListener("ended", function () {
        playTrack((currentTrack + 1) % tracks.length);
    });

    function createTrackList() {
        const trackList = document.getElementById("track-list");
        trackList.innerHTML = "";
        tracks.forEach((track, index) => {
            let li = document.createElement("li");
            li.textContent = track.split("/").pop().replace(/\.[^/.]+$/, "");
            li.style.cursor = "pointer";
            li.addEventListener("click", () => playTrack(index));
            trackList.appendChild(li);
        });
    }

    document.getElementById("list").addEventListener("click", function () {
        const trackList = document.getElementById("track-list");
        if (trackList.style.display === "none" || trackList.style.display === "") {
            createTrackList();
            trackList.style.display = "block";
        } else {
            trackList.style.display = "none";
        }
    });
});
