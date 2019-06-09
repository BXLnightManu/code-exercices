const config = require('./conf');  // credentials to access database
const express = require('express');
const app = express();
const sql = require('mssql');
const port = 3000;

const bodyParser = require('body-parser');
// Support JSON-encoded bodies
app.use(bodyParser.json());
// Support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));

// connexion to database
sql.connect(config, err => {
    
    if (err) {
        console.log('Connexion to the server failed!');
    } else {

        // creation of Request object
        const request = new sql.Request();

        app.get('/api/movies', (req, res) => {
            
            // executing a stored procedure to get the all the records
            request.execute('SelectAllMovies', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error when trying to get the all the movies.');
                } else {
                    res.json(result);
                };
            });
        });
        
        app.get('/api/movies/:names', (req, res) => {
            
            // declaration of the variable which registers the parameter data
            const name = req.params.names;       

            // executing a stored procedure to get the record which includes the paramater value of the request body
            request.input('movie', sql.NVarChar, name);
            request.execute('SelectQueriedMovie', (err, result) => {
                if (err) {
                    res.status(500).send(`Error when trying to get the movie corresponding to ${name}.`);
                } else {
                    res.json(result);
                };
            });
        });

        app.post('/api/movies', (req, res) => {
            
            // transform the object - recieved from the body of the request - to a string, so the meet the format expected by the sql server
            const jsonData = JSON.stringify(req.body);

            // executing a stored procedure to post new entries given by the request body
            request.input('json', sql.NVarChar, jsonData);
            request.execute('InsertMoviesByJson', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error when trying to save the movie(s).');
                } else {
                    res.status(200).send(`${result.rowsAffected} Movie(s) saved!`);
                };
            });
        });

        app.put('/api/movies', (req, res) => {
            
            // declaration of the variable which registers the film already registered we want to modify
            const filmToModify = req.body.existingFilmName;

            // declaration of variables which register the new data (to update)
            const newFilmName = req.body.newFilmName;
            const newFilmPoster = req.body.newFilmPoster;
            const newFilmComment = req.body.newFilmComment;

            // executing a stored procedure to update film data
            request.input('existingFilmName', sql.NVarChar, filmToModify);
            request.input('newFilmName', sql.NVarChar, newFilmName);
            request.input('newFilmPoster', sql.NVarChar, newFilmPoster);
            request.input('newFilmComment', sql.NVarChar, newFilmComment);
            request.execute('UpdateMovie', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(`Error when trying to update the movie ${filmToModify}.`);
                } else {
                    res.status(200).send(`The Movie is correctly updated!`);
                };
            });
        });
        
        app.delete('/api/movies', (req, res) => {
            
            // declaration of the variable which registers the film already registered we want to delete
            const filmToDelete = req.body.existingFilmName;

            // executing a stored procedure to delete film data
            request.input('existingFilmName', sql.NVarChar, filmToDelete);
            request.execute('DeleteMovie', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send(`Error when trying to update the movie ${filmToDelete}.`);
                } else {
                    res.status(200).send(`The Movie corresponding to "${filmToDelete}" is correctly deleted!`);
                };
            });
        });

        app.listen(port, (err) => {
            if (err) throw new Error('Something bad happened...');
        
            console.log(`The server is listening on port ${port}`);
        });  
    };
});