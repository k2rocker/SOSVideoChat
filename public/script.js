let i=0

const sosb = document.getElementById('sosbutton')
sosb.addEventListener("click",() => {
i=i+1
if(i>1){

}
else{
const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host: 'localhost',
    port: '3001'
})
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}

    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true  
      }).then(stream => {
          addVideoStream(myVideo,stream)
      
          myPeer.on('call', call => {
              call.answer(stream)
              const video = document.createElement('video') 
              call.on('stream',userVideoStream => {
                 addVideoStream(video, userVideoStream)
              })
          })
      
          socket.on('user-connected', userId => {
            console.log("user id: ",userId)
              setTimeout(connectToNewUser,1000,userId,stream)
          })
      })

      
socket.on('user-disconnected',userId => {
    if (peers[userId]) {
        peers[userId].close()
    }
})

myPeer.on('open',id => {
    socket.emit('join-room',ROOM_ID, id)
    console.log("id:",id)
})


socket.on('user-connected', userId => {
  console.log('user connected: ' + userId)
})


function connectToNewUser(userId,stream) {
    const call = myPeer.call(userId,stream)
    const video = document.createElement('video')
    call.on('stream',userVideoStream => {
        addVideoStream(userVideoStream)
    })
    call.on('close',() => {
       video.remove() 
    })

    peers[userId] = call
}

function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata',() => {
        video.play()
    })
    videoGrid.append(video)
}}


})

