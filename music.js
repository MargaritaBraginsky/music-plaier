let body = document.body
let player = document.querySelector('.player')
let playerHeader = player.querySelector(".player__header")
let playerControl = player.querySelector(".player__controls")
let slider = player.querySelector(".slider")
let sliderContext = player.querySelector(".slider__context")
let playlistButton = player.querySelector(".playlist")
let playerPlayList = player.querySelectorAll(".player__song")
var playerSong = player.querySelectorAll(".audio")
let playButton = player.querySelector(".play")
let nextButton = player.querySelector(".next")
let backButton = player.querySelector(".back")
let playIcon = playButton.querySelector('img[alt="play-icon"]')
let pauseIcon = playButton.querySelector('img[alt="pause-icon"]')
let sliderContent = slider.querySelector(".slider__content")
let sliderName = sliderContext.querySelector(".slider__name")
let sliderTitle = sliderContext.querySelector(".slider__title")
let sliderContentLength = playerPlayList.length -1
let progres = player.querySelector('.progres')
let progresFilled = progres.querySelector(".progres__filled")
let sliderWidth = 100
let count = 0
let song = playerSong[count]
let isPlay = false
let isMove = false
const bgBody = ["#292b2d", "#373c40", "#2d3238", "#161a1f", "#07090a", "#121b24"]

function openPlayer(){
    playerHeader.classList.add("open-header")
    playerControl.classList.add("move")
    slider.classList.add("open-slider")  
    console.log("!")
    // console.log(slider)
}

function closePlayer(){
    playerHeader.classList.remove("open-header")
    playerControl.classList.remove("move")
    slider.classList.remove("open-slider")
    console.log("!")  
}

playButton.addEventListener("click", () => {
    isPlay = true
    playSong()} )
console.log(isPlay)

function playSong(){
    if(song.paused){
        song.play()
        playIcon.style.display = "none"
        pauseIcon.style.display = "block"
    } else{
        song.pause()
        isPlay = false
        playIcon.style.display = ""
        pauseIcon.style.display = ""
    }
}

function scurb(e){
    console.log("!")
    const width = progres.offsetWidth;
    const clickX = e.offsetX;
    const duration = song.duration;
    song.currentTime = (clickX/width)*duration
    console.log(width)
    console.log(clickX)
    console.log(duration)
}

function progresUpdate(){
    const progresFilledWidth = (this.currentTime/this.duration) * 100 + "%"
    progresFilled.style.width = progresFilledWidth
    if(isPlay && this.duration == this.currentTime){
        next()
    }
    if(count == sliderContentLength && song.currentTime == song.duration){
        console.log("!")
        playIcon.style.display = "block"
        pauseIcon.style.display = ""
        isPlay = false
    }
}

playerSong.forEach(song => {
    song.addEventListener("timeupdate", progresUpdate)
    song.addEventListener("loadeddata", durationSongs)
} )
console.log(progres)
progres.addEventListener("pointerdown", (e) => {
    scurb(e) 
    isMove = true
})

function changeSliderContext() {
    sliderContext.style.animationName = "opasity"
    // let textContent = sliderName, sliderTitle
    // console.log(textContent)
    sliderName.textContent = playerPlayList[count].querySelector(".player__song-name").textContent 
    sliderTitle.textContent = playerPlayList[count].querySelector(".player__title").textContent
    if(sliderName.textContent.length > 16){
        let textWrap = document.createElement("snap")
        textWrap.className = 'text-wrap'
        textWrap.innerHTML = sliderName.textContent + " " + sliderName.textContent
        sliderName.innerHTML = ""
        sliderName.append(textWrap)
    }
    if(sliderTitle.textContent.length > 18){
        let textWrap = document.createElement("snap")
        textWrap.className = 'text-wrap'
        textWrap.innerHTML = sliderTitle.textContent + " " + sliderTitle.textContent
        sliderTitle.innerHTML = ""
        sliderTitle.append(textWrap)
    }   
}
changeSliderContext()

document.addEventListener("pointermove", (e) => {
    if (isMove) {
        scurb(e);
        song.muted = true;
    }
});
    

function selectSong(){
    song = playerSong[count]
    for(const item of playerSong){
        if(item != song){
            item.pause()
            item.currentTime = 0
        }
        if(isPlay){
            song.play()
        }
    }
}

let left = 0

function next(index){
    count = index || count
    if(count == sliderContentLength){
         count = count
         return
    }
    left = (count + 1) * sliderWidth
    sliderContent.style.transform = `translate3d(-${left}%,0,0)` 
    count ++ 
    run()                                                                           
}

function back(index){
    count = index || count
    if(count == 0){
        count = count
        return
    }
    left = (count - 1) * sliderWidth
    sliderContent.style.transform = `translate3d(-${left}%,0,0)` 
    count -- 
    run()  
}

nextButton.addEventListener("click", () => {next(0)})
backButton.addEventListener("click", () => {back(0)})


playerPlayList.forEach((item, index) => {
    item.addEventListener("click", function (){
        if(index>count){
             next(index - 1)
             return
        }
        if(index<count){
            back(index + 1)
            return
        }
    })
})

function changeBgBody(){
    body.style.backgroundColor = bgBody[count]
    console.log("A")
}

function durationSongs(){
    let min = parseInt(this.duration/60)
    if(min < 10){
        min == "0" + min 
    }
    let sec = parseInt(this.duration%60)
    if(sec<10){
        sec == "0" + sec
    }
    let playerSongTime = `${min}:${sec}` 
    console.log(".player__song")

    this.closest(".player__song").querySelector(".player__song-time").append(playerSongTime)
    console.log("!")
}
// const a = [1, 2, 3]
console.log(song)
console.log(playerSong)

playerSong.forEach(song => (song.addEventListener("loadeddata", durationSongs)), console.log("1"))

sliderContext.addEventListener("click", openPlayer)

playlistButton.addEventListener('click', closePlayer)

function run(){
    changeSliderContext()
    selectSong()
    changeBgBody()
}
// console.log(sliderContext)