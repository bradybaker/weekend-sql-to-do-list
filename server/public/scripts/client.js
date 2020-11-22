

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

function deleteTask() { // Selecting which task to delete, sending to server
    Swal.fire({
        title: 'Are you sure?',
        text: 'Your task will be gone forever!',
        icon: 'warning',
        heightAuto: false,
        showCancelButton: true,
        confirmButtonText: 'Yes!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            Swal.fire(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success',
                false
            )
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Task not deleted!',
                'error',
                false
            )
        }
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

function renderList(todo) { // Rendering tasks to the DOM/Formatting dates so they aren't ugly
    $('#theList').empty();
    for (let item of todo) {
        let dueDate = new Date(item.date_to_complete_by)
        let completedDate = new Date(item.completed)
        let dueDateString = `${dueDate.getMonth() + 1}/${dueDate.getDate()}/${dueDate.getFullYear()}`
        let completedDateString = `${completedDate.getMonth() + 1}/${completedDate.getDate()}/${completedDate.getFullYear()}`
        $('#theList').append(`
        <tr id="${item.id}" data-id="${item.id}">
        <td>${dueDateString}</td>
        <td>${item.task}</td>
        <td>${item.completed === null ? 'Not Completed' : completedDateString}</td>
        <td><button class="completeButton btn btn-light">Complete Task</button></td>
        <td><button class="deleteButton btn btn-light">Delete Task</button></td>
        </tr>
        `)

        if (item.completed) {
            $(`#${item.id}`).addClass('green')
        } else {
            $(`#${item.id}`)
        }
    }
}