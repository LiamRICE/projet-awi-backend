const express = require('express');
const app = express();
const cors = require('cors');

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
    res.send("Le serveur est à l'écoute.");
})

require('./routes')(app);