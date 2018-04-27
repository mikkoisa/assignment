// const socket = io.connect('https://localhost:3000');
const socket = io.connect('https://bestgame.jelastic.metropolia.fi');

let moveInterval = '';

socket.on('connect', () => {
    socket.emit('join', document.getElementById('roomId').innerHTML)
});

socket.on('disconnect', () => {
    console.log("user left")
    socket.emit('messageleave')
});

socket.on('closeRoom', (msg) => {
    console.log(msg)
    $('#myModal').modal()
});

$('#myModal').on('hidden.bs.modal', () => {
    window.location.href = '/'
})

// Test game commands

let slow = 0

const move = (direction) => {
    console.log('moving' + direction)
    moveInterval = setInterval(() => {
        console.log(slow)
        socket.emit('move object', direction, slow)
    }, 1000 / 60);
} 
 

/* window.addEventListener('keydown', (event) => {
    console.log('keydown')
    const key = event.keyCode;
    let direction = '';
    if (key == 37) {
        direction = 'left'
    } else if (key == 38) {
        direction = 'up'
    } else if (key == 39) {
        direction = 'right'
    } else if (key == 40) {
        direction = 'down'
    }
    move(direction)
});

window.addEventListener('keyup', (event) => {
    clearInterval(moveInterval);
}); */

$('button').on('mousedown mouseup', (e) => {
    if (e.type == 'mousedown') {
        socket.emit('move object', e.currentTarget.attributes[1], slow)
    } else if (e.type == 'mouseup') {
        console.log('end hold')
    }
});

window.addEventListener('mouseup', (event) => {
    clearInterval(moveInterval);
    slow = 0
    // slow = 2;
    /* setTimeout(() => {
        console.log('clear')
        
        slow = 0;
    }, 500) */
})

window.addEventListener('touchend', (event) => {
    clearInterval(moveInterval);
    slow = 0
    // slow = 2;
    /* setTimeout(() => {
        console.log('clear')
        
        slow = 0;
    }, 500) */
})


/* const moveup = () => {
    socket.emit('move object', 'up')
}

const movedown = () => {
    socket.emit('move object', 'down')
}

const moveleft = () => {
    socket.emit('move object', 'left')
}

const moveright = () => {
    socket.emit('move object', 'right')
} */
