const sgMail = require('@sendgrid/mail');

// const sendgridAPIkey = ''
// sgMail.setApiKey(sendgridAPIkey)

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendNewTaskEmail = (email , name)=>{

    sgMail.send({
        to : email,
        from : 'kushwahshubham679@gmail.com',
        subject: 'New Task ✔',
        text: `Hello.,  ${name} You Have New Task In a Row.`,
    }).then((res)=> console.log(res))
    .catch(err => console.log(err))
}

const sendUpdateTaskEmail = (email, name)=>{

    sgMail.send({
        to : email,
        from : 'kushwahshubham679@gmail.com',
        subject: 'Task Updated ✔',
        text: `Hello.,  ${name} You Have New Updations In Your Tasks.`,
    }).then((res)=> console.log(res))
    .catch(err => console.log(err))
}

module.exports = {
    sendNewTaskEmail,
    sendUpdateTaskEmail
}