// Initial data

let allItems = document.querySelectorAll('.item');
let allAreas = document.querySelectorAll('.area');
let startingZone = document.querySelector('.neutralArea');
let areas = {
    a: null,
    b: null,
    c: null
};


// Events

    startingZone.addEventListener('dragover', dragOverNeutral);
    startingZone.addEventListener('dragleave', dragLeaveNeutral);
    startingZone.addEventListener('drop', dropNeutral);

allItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
})

allAreas.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
    item.addEventListener('drop', drop);
})


// Functions Item

function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

// Functions Area

function dragOver(e) {
    if(e.currentTarget.querySelector('.item') === null){
        e.preventDefault();
        e.target.classList.add('hover');
    }
}

function dragLeave(e) {
    e.target.classList.remove('hover');
}

function drop(e) {
    let draggedItem = document.querySelector('.item.dragging');
    e.target.classList.remove('hover');

    if(e.currentTarget.querySelector('.item') === null) {
        e.currentTarget.appendChild(draggedItem);
        updateAreas();
    };
}

// Function Neutral Area

function dragOverNeutral(e) {
    e.preventDefault();
    e.target.classList.add('hover');
}

function dragLeaveNeutral(e) {
    e.target.classList.remove('hover');
}

function dropNeutral(e) {
    let draggedItem = document.querySelector('.item.dragging');
    e.target.classList.remove('hover');
    e.currentTarget.appendChild(draggedItem);
    updateAreas();
}

// Logic Functions

function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name');

        if(area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    });
    if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct')
        document.querySelector('.tips').innerHTML = "Congratulations, you did it!"
    } else {
        document.querySelector('.areas').classList.remove('correct')
        document.querySelector('.tips').innerHTML = "Try putting the squares in the following order: 1, 2, 3"
    }
}