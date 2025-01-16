console.log("welcome to spotify")

let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterplay=document.getElementById('masterplay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif')
let playingname=document.getElementById('playingname')

let songitem=Array.from(document.getElementsByClassName("songitem"));

let songs=[
    {songName:"slame-e-ishq",filepath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songName:"second song",filepath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songName:"third song",filepath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songName:"fourth-song",filepath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songName:"fifth-song",filepath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songName:"sixth-song",filepath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songName:"seventh-song",filepath:"songs/7.mp3",coverPath:"covers/7.jpg"}
]


songitem.forEach((element,i)=>{
element.getElementsByTagName("img")[0].src=songs[i].coverPath;
element.getElementsByClassName("songname")[0].innerText=songs[i].songName;
});

/* audioElement.play(); */

//handle playpause
let x=0;
masterplay.addEventListener('click',()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
       audioElement.play();
       masterplay.classList.remove('fa-play-circle');
       masterplay.classList.add('fa-circle-pause');
       gif.style.opacity=1;
       if(x==0){
       playingname.innerText=songs[0].songName
      x=1; 
      }
    } else{
       audioElement.pause();
       masterplay.classList.add('fa-play-circle');
       masterplay.classList.remove('fa-circle-pause');
       gif.style.opacity=0;
      makeAllPlays();
      
    }
});

//listen to Events
audioElement.addEventListener('timeupdate',()=>{
 console.log('timeupdate');
 progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
 console.log(progress);
 myProgressBar.value=progress;
 if(progress==100){
    masterplay.classList.add('fa-play-circle');
       masterplay.classList.remove('fa-circle-pause');
       gif.style.opacity=0;
}
});
myProgressBar.addEventListener('change',()=>{
audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;

});


const makeAllPlays=(clicked)=>{
   Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
     if (element!=clicked){
      element.classList.remove('fa-circle-pause');
      element.classList.add('fa-play-circle');
     }
     
   });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
   element.addEventListener('click',(e)=>{
      makeAllPlays(e.target);
      songIndex=parseInt(e.target.id)-1;
      audioElement.src=`songs/${songIndex+1}.mp3`;
    if (e.target.classList.contains('fa-play-circle')){
      e.target.classList.remove('fa-play-circle');
      e.target.classList.add('fa-circle-pause');  
      audioElement.load()
      audioElement.currentTime=0;
      audioElement.play();
      masterplay.classList.remove('fa-play-circle');
      masterplay.classList.add('fa-circle-pause');
      gif.style.opacity=1;
      playingname.innerText=songs[`${songIndex}`].songName
      
    }
else{
   audioElement.pause();
      e.target.classList.add('fa-play-circle');
      e.target.classList.remove('fa-circle-pause');
      masterplay.classList.add('fa-play-circle');
       masterplay.classList.remove('fa-circle-pause');
       gif.style.opacity=0;
       playingname.innerText=songs[`${songIndex}`].songName
}

   });
});

document.getElementById('previous').addEventListener('click',(e)=>{
   if(songIndex==0){
      songIndex=6;
   }
   else{
      songIndex-=1;
   }
   audioElement.src=`songs/${songIndex+1}.mp3`;
   /* audioElement.load() */
      audioElement.currentTime=0;
      audioElement.play();
      masterplay.classList.remove('fa-play-circle');
      masterplay.classList.add('fa-circle-pause');
      gif.style.opacity=1;
      playingname.innerText=songs[`${songIndex}`].songName
      makeAllPlays();
      document.getElementById(`${songIndex+1}`).classList.remove('fa-play-circle');
      document.getElementById(`${songIndex+1}`).classList.add('fa-circle-pause');
});
document.getElementById('next').addEventListener('click',(e)=>{
   if(songIndex==6){
      songIndex=0;
   }
   
   else{
      songIndex+=1;
   }
   audioElement.src=`songs/${songIndex+1}.mp3`;
   audioElement.load()
      audioElement.currentTime=0;
      audioElement.play();
      masterplay.classList.remove('fa-play-circle');
      masterplay.classList.add('fa-circle-pause');
      gif.style.opacity=1;
      makeAllPlays()
      document.getElementById(`${songIndex+1}`).classList.remove('fa-play-circle');
      document.getElementById(`${songIndex+1}`).classList.add('fa-circle-pause');
      playingname.innerText=songs[`${songIndex}`].songName
      
});

