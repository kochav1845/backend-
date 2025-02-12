const express = require('express');
const cors = require('cors');
const app = express();
const nodeMailer = require('nodemailer');

const PORT = process.env.PORT || 5000;

// middleware

app.use(express.json());
app.use(cors());


console.log(req.body.message);
app.post('/',(req, res)=>{
  console.log(req.body);
  const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth:{
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS

}});
const mailOptions = {
  from: 'a88933513@gmail.com',
  replyTo: req.body.email,
  to: 'a88933513@gmail.com',
  subject: `Message from ${req.body.name}: ${req.body.email}`,
  text: `Hi On Stage Studio, ${req.body.name} wants to schedule a show on ${req.body.date}, he left a message: ${req.body.message}.`
};
transporter.sendMail(mailOptions, (error, info)=>{
  if(error){
    console.log(error);
    res.send('error');
  }else{
      console.log('email sent')
      res.send('success');
  }})});

app.listen(
    PORT,()=>{
        console.log(`server is runing on port ${PORT}`);
       
    }
)