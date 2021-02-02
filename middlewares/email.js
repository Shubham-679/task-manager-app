const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendNewTaskEmail = (email , name)=>{

    sgMail.send({
        to : email,
        from : 'kushwahshubham679@gmail.com',
        subject: 'New Task ✔',
        text: `Hello.,  ${name} You Have New Task In a Row.`,
    })
}

const sendUpdateTaskEmail = (email, name)=>{
    
    sgMail.send({
        to : email,
        from : 'kushwahshubham679@gmail.com',
        subject: 'Task Updated ✔',
        text: `Hello.,  ${name} You Have New Updations In Your Tasks.`,
    })
}

module.exports = {
    sendNewTaskEmail,
    sendUpdateTaskEmail
}