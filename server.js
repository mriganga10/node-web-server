const express = require('express');
const hbs = require('hbs');
var app = express();
var fs = require('fs');
hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();
});
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('screamIt',(text) => {
	return text.toUpperCase();
});
app.set('view engine', 'hbs');
app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n');
	next();
});
app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n');
	res.render('maintainance.hbs',{
		message:'page undermaintainance',
	});
});
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res) => {
	//res.send('Hello Express!');
	/* res.send({
		name:'Andrew',
		likes : ['hie','hllo'],
	}); */ 
	res.render('home.hbs',{
		pageTitle:'Home Page',
		welcomeMessage: 'Welcome to my website',
	});
});

app.get('/about',(req,res) => {
	res.render('about.hbs',{
		pageTitle:'About Page',	
	});	
});


app.listen(3000);