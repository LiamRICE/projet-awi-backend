const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

var corsOptions = {
    origin: "https://localhost:3000" || "",
    optionsSuccessStatus: 204
};

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serveur à l'écoute sur le port ${port} !`);
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
})

require('./routes')(app);