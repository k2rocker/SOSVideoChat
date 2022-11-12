const express = require('express')
const res = require('express/lib/response')
const { Socket } = require('socket.io')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const accountSid = 'ACbf8cfeca568c0f035b25e4ba8025af71' //process.env.TWILIO_ACCOUNT_SID;
const authToken = '4b1e7e74f1e3b9cba593b7be88267c9d' //process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/',(req,res) => {
    res.redirect(`/${uuidV4()}`)
})

app.get('/:room',(req,res) => {
    res.render('room',{ roomId: req.params.room })
})

io.on('connection', socket => {
    socket.on('join-room',(roomId, userId) => {
        socket.join(roomId)
        console.log("room id: ",roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId) 
        //the below are for sending message with the room link
        client.messages
        .create({
            body: `https://bdbf-106-195-44-107.in.ngrok.io/${roomId}`,
            from: '+16204072669',
            to: '+919840575652'
            })
            .then(message => console.log(message.sid));
                socket.on('disconnect', () => {
                socket.broadcast.to(roomId).emit('user-disconnected',userId)   
            })
    
    })
})

server.listen(3000)