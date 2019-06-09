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
            // querying the database to get the records
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
            const name = req.params.names;       

            // querying the database to get the records
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
            const jsonData = JSON.stringify(req.body);

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
            const filmToModify = req.body.existingFilmName;
            const newFilmName = req.body.newFilmName;
            const newFilmPoster = req.body.newFilmPoster;
            const newFilmComment = req.body.newFilmComment;

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
        
        app.listen(port, (err) => {
            if (err) throw new Error('Something bad happened...');
        
            console.log(`The server is listening on port ${port}`);
        });  
    };
});

// let succeesMessage = [];
// let errorMessage = [];
// let recordsNumber = 0;
// for(let i=0;i<jsonData.length;i++) {
//     request.input('name', sql.NVarChar, jsonData[i].name);
//     request.input('poster', sql.NVarChar, jsonData[i].poster);
//     request.input('comment', sql.NVarChar, jsonData[i].comment);
//     request.execute('InsertMoviesByArray', (err, result) => {
//         if (err) {
//             console.log(err);
//             errorMessage.push(`Error when trying to save the movie ${jsonData[i].name}.`);
//         } else {
//             succeesMessage.push(`The movie ${jsonData[i].name} is correctly saved!`);
//             recordsNumber += result.rowsAffected;
//         }
//     });
// };
// succeesMessage.push(recordsNumber);
// res.status(200).send(`${succeesMessage} + ${errorMessage}`);