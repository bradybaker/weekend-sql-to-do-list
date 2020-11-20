console.log('Hello from JS')

$(document).ready(readyNow);

function readyNow() {
    console.log('Hello from JQ')
}

function getList() { //Getting TODO list from the server
    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response) {
        console.log(response);
        renderList(response);
    }).catch(function (error) {
        console.log('error in client GET', error);
    });
}