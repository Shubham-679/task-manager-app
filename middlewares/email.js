const nodemailer = require('nodemailer');

// const sendgridAPIkey = ''

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kushwahshubham679@gmail.com',
      pass: '7047833761'
    },

    tls:{
      rejectUnauthorized:false
    }
});

const sendNewTaskEmail = (email , name)=>{

    let message = {
        from: '"Task-Manager-App"kushwahshubham679@gmail.com',
        to: email,
        subject: 'New Task ✔',
        text: `Hello.,  ${name} You Have New Task In a Row.`,
    };
    
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('contact', {msg:'Email has been sent'});
    });
}

const sendUpdateTaskEmail = (email, name)=>{
    
    let message = {
        from: '"Task-Manager-App"kushwahshubham679@gmail.com',
        to: email,
        subject: 'Task Updated ✔',
        text: `Hello.,  ${name} You Have New Updations In Your Tasks.`,
    };
  
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        console.log('Message sent: %s', info.messageId);
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('contact', {msg:'Email has been sent'});
    });
}

module.exports = {
    sendNewTaskEmail,
    sendUpdateTaskEmail
}