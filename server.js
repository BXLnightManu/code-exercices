const config = require('./conf');  // credentials to access database
const express = require('express');
const app = express();
const sql = require('mssql');
const port = 3000;

// connexion to database
sql.connect(config, err => {
    
    if (err) {
        console.log('Connexion to the server failed!');
    } else {

        // creation of Request object
        const request = new sql.Request();

        app.get('/api/movies', (req, res) => {
        
            // querying the database to get the records
            request.query('SELECT * FROM movie', (err, result) => {
                if (err) {
                    res.status(404).send('Error when trying to get the movie list.');
                } else {
                    res.json(result);
                };
            });
        });
        
        app.get('/api/movies/:names', (req, res) => {
            const name = req.params.names;       

            // querying the database to get the records
            request.query(`SELECT * FROM movie WHERE name LIKE '%${name}%';`, (err, result) => {
                if (err) {
                    res.status(404).send('Error when trying to get the movie list.');
                } else {
                    res.json(result);
                };
            });
        });
        
        app.listen(port, (err) => {
            if (err) throw new Error('Something bad happened...');
        
            console.log(`The server is listening on port ${port}`);
        });  
    };
});