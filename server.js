const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
//  res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name:'Shay',
  //   likes: [
  //     'Travel',
  //     'laugth',
  //     'Friends'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage:'Welcome to our web site!!!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
  // res.send('About page');
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle:'Our projects'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to fill this request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
