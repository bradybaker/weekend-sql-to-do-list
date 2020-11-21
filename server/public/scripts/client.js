console.log('Hello from JS')

$(document).ready(readyNow);

function readyNow() {
    $('#submitButton').on('click', handleInputs)
    getList()
}

function handleInputs() { // Handle input values from the DOM 
    let newTask = {
        task: $("#taskInput").val(),
        date_to_complete_by: $('#dueInput').val()
    }
    console.log(newTask)
    postList(newTask)
}

function postList(newTask) { // Send input values to the server 
    console.log('In postList,', newTask);
    $.ajax({
        method: 'POST',
        url: '/todo',
        data: newTask
    }).then(function (response) {
        getList();
    }).catch(function (error) {
        console.log('Error in client POST', error);
    })
}

function getList() { //Getting TODO list from the server
    $.ajax({
        method: 'GET',
        url: '/todo'
    }).then(function (response) {
        console.log(response);
        renderList(response);
    }).catch(function (error) {
        console.log('error in client GET', error);
    });
}

function renderList(todo) {
    $('#theList').empty();
    for (let item of todo) {
        item.date_to_complete_by = (new Date()).toLocaleString("en-US", {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        })
        $('#theList').append(`
        <tr>
        <td>${item.date_to_complete_by}</td>
        <td>${item.task}</td>
        <td>${item.completed}</td>
        <td><button id"completeButton">Complete Task</button></td>
        <td><button id"deleteButton">Delete Task</button></td>
        </tr>
        `)
    }
}