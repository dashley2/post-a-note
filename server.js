const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./Develop/db/db.json')

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

const apiRoutes = require('./routes/apiRoutes/notesRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// listening route
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });