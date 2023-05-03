const socket = io();

// Swal.fire({
//     title: 'Hola',
//     text: 'Bienvenido',
//     icon: 'success'
// })

let user;
const chatBox = document.getElementById('chatBox');
const messageLogs = document.getElementById('messageLogs');

Swal.fire({
    title: 'Hi to the best chat',
    input: 'text',
    text: 'To continue please indentify you',
    inputValidator: (value) => {
        return !value && 'You need to enter a user to be able to access'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    socket.emit('authenticated', user);
});

chatBox.addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        if(chatBox.value.trim().length > 0) {
            socket.emit('message', {user, message: chatBox.value});
            chatBox.value = '';
        }
    }
})

socket.on('messageLogs', data => {
    let log = document.getElementById('messageLogs');
    let messages = [];
    data.forEach(message => {
        messages += `${message.user} dice: ${message.message}<br/>`
    });
    log.innerHTML = messages;
});

socket.on('userConnected', data => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmationButton: false,
        timer: 3000,
        title: `${data} has joined the chat`,
        icon: 'success'
    })
})