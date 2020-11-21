console.log('Hello from JS')

$(document).ready(readyNow);

function readyNow() {
    $('#submitButton').on('click', handleInputs)
    $('#theList').on('click', '.completeButton', completeTask)
    $('#theList').on('click', '.deleteButton', deleteTask)
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

function deleteTask() {
    let task = $(this).closest('tr').data('id');
    $.ajax({
        method: 'DELETE',
        url: `/todo/${task}`
    }).then((function (resposne) {
        getList();
    })).catch(function (error) {
        console.log('Error in client deleting task:', error);
        alert('Something bad happened. Try again later');
    })
}

function completeTask() { // Marking a task as complete
    let task = $(this).closest('tr').data('id');
    console.log(task);
    $.ajax({
        method: 'PUT',
        url: `/todo/${task}`,
        data: task
    }).then(function (response) {
        getList();
    }).catch(function (error) {
        console.log('Error in client PUT', error);
        alert('Something bad happened. Try again later');
    })
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
        <tr data-id="${item.id}">
        <td>${item.date_to_complete_by}</td>
        <td>${item.task}</td>
        <td>${item.completed}</td>
        <td><button class="completeButton">Complete Task</button></td>
        <td><button class="deleteButton">Delete Task</button></td>
        </tr>
        `)
    }
}