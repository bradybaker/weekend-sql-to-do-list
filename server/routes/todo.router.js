const express = require('express');
const toDoRouter = express.Router();

const pool = require('../modules/pool');

// Get the TODO list
toDoRouter.get('/', (req, res) => {
    let sqlText = 'SELECT * FROM "todo" ORDER BY "date_to_complete_by";';
    pool.query(sqlText)
        .then(result => {
            res.send(result.rows);
        })
        .catch(error => {
            console.log('error in router GET todo list', error);
            res.sendStatus(500);
        });
});

toDoRouter.post('/', (req, res) => {
    let newToDo = req.body
    console.log(newToDo)
    let sqlText = `INSERT INTO "todo" ("task", "date_to_complete_by") 
                    VALUES ($1, $2);`
    pool.query(sqlText, [newToDo.task, newToDo.date_to_complete_by])
        .then((result) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error in posting Koalas', error);
            res.sendStatus(500);
        })
})

toDoRouter.put('/:id', (req, res) => {
    let taskToDo = req.body;
    let id = req.params.id;
    let sqlText = `UPDATE todo SET completed='Yes' WHERE id=$1;`;
    pool.query(sqlText, [id])
        .then((result) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error when changing transfer status', error)
            res.sendStatus(500);
        })
    console.log(`Updating koala ${id} with`, taskToDo);
})

toDoRouter.delete('/:id', (req, res) => {
    let id = req.params.id;
    let sqlText = `DELETE FROM todo WHERE id=$1;`;
    pool.query(sqlText, [id])
        .then((result) => {
            console.log('Got back', result.rows);
            //delete sends back an ok status, client will then ask for all the data with a GET
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error from db', error);
            res.sendStatus(500);
        })
})

module.exports = toDoRouter;