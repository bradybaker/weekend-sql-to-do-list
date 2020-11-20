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
            console.log('error getting todo list', error);
            res.sendStatus(500);
        });
});

module.exports = toDoRouter;