const express = require('express');
const toDoRouter = express.Router();

const pool = require('../modules/pool');

// Get the TODO list
toDoRouter.get('/', (req, res) => { // getting table info form the database 
    let sqlText = 'SELECT * FROM "todo" ORDER BY "completed" DESC;';
    pool.query(sqlText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error in router GET todo list', error);
            res.sendStatus(500);
        });
});

toDoRouter.post('/', (req, res) => { // sending new tasks to the database
    let newToDo = req.body
    console.log(newToDo)
    let sqlText = `INSERT INTO "todo" ("task", "date_to_complete_by") 
                    VALUES ($1, $2);`
    pool.query(sqlText, [newToDo.task, newToDo.date_to_complete_by])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error in server POST', error);
            res.sendStatus(500);
        })
})

toDoRouter.put('/:id', (req, res) => { // Updating table info the database and DOM
    let taskToDo = req.body;
    let id = req.params.id;
    let date = new Date()
    let sqlText = `UPDATE todo SET completed=$1 WHERE id=$2;`;
    pool.query(sqlText, [date, id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error in server PUT', error)
            res.sendStatus(500);
        })
    console.log(`Updating task ${id} with`, taskToDo);
})

toDoRouter.delete('/:id', (req, res) => { // Deleting info from the database and DOM
    let id = req.params.id;
    let sqlText = `DELETE FROM todo WHERE id=$1;`;
    pool.query(sqlText, [id])
        .then((result) => {
            console.log('Got back', result.rows);
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error in server DELETE', error);
            res.sendStatus(500);
        })
})

module.exports = toDoRouter;