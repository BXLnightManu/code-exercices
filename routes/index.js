const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();
const path = require('path');
const port = 3000;

app.use(session({
    store: new FileStore({
        path: path.join(__dirname, '/tmp'),
        encrypt: true
    }),
    secret: 'Super Secret !',
    resave: true,
    saveUninitialized: true,
    name : 'sessionId'
}));

app.get('/session-in', (req, res) => {
    // Initialisation de la variable de sessions (song) contenant be bop a lula
    req.session.song = 'be bop a lula';
    res.send();
 });

 app.get('/session-out', (req, res) => {
     res.send(req.session.song);
 });

app.listen(port, err => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Listening on the port ${port}`);
    }
})