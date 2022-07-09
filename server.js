const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes/notesRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


// listening route
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });