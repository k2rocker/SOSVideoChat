//basic sample code for sending sms using twilio api


const accountSid = 'ACbf8cfeca568c0f035b25e4ba8025af71' //process.env.TWILIO_ACCOUNT_SID;
const authToken = '4b1e7e74f1e3b9cba593b7be88267c9d' //process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'http://localhost:3000/4aabef13-d330-4dda-9793-c7bf4abc6156',
     from: '+16204072669',
     to: '+919840575652'
   })
  .then(message => console.log(message.sid));
