const express = require('express');
const bodyParser = require('body-parser');
const mongojs = require('mongojs');

const port = process.env.PORT || 3001;
mongojs.Promise = global.Promise;

var questionsDb = mongojs('reviews', ['reviews']);
var profilesDb = mongojs('reviews', ['profiles']);
var feedbackDb = mongojs('reviews', ['feedback']);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


getRandomDataFromDb = (id, res) => {
	let data = {};
	profilesDb.profiles.find( {_id: id}, (err, docs) =>  {
		console.log("getting new data set from DB...")
		if (docs.length === 0) {
			res.send( {error: 'no such id profile'})
			console.log(err);
		} else {
			console.log(docs);
			const titles = docs[0].titles;
			const types = docs[0].types;
			const templates = docs[0].templates;
			getRandomItemFromArray = ( array ) => { return array[Math.floor(Math.random()*array.length)] };
			data.title = getRandomItemFromArray(titles);
			data.template = getRandomItemFromArray(templates);
			data.type =getRandomItemFromArray(types);
			console.log("data sent: ");
			console.log(data)
			res.send(data);
		}
	})
};

getAdminDataFromDb = (res) => {
	let data = {};
	questionsDb.reviews.find( (err,docs) =>  {
		data.titles = docs[0].titles;
		data.types = docs[0].types;
		data.templates = docs[0].templates;
		console.log("admin data sent: ");
		console.log(data)
		res.send(data);
	})
};

app.post('/api/feedback', (req, res) => {
	const newData = {
		userId: req.body.userId,
		title: req.body.title,
		template: req.body.template,
		type: req.body.type,
		value: req.body.value,
		time: new Date()
	};
	console.log("data recevied: ")
	console.log(newData)
	feedbackDb.feedback.insert(newData);
})

app.post('/api/admin', (req, res) => {
	const newData = {
		userId: req.body.userId,
		titles: req.body.titles,
		templates: req.body.templates,
		types: req.body.types
	};
	console.log("admin data recevied: ")
	console.log(newData)
	profilesDb.profiles.update({_id: newData.userId}, newData, {upsert: true});
})

app.get('/api/admin', (req, res) => {
	console.log('api admin called');
	getAdminDataFromDb(res);
});

app.get('/api/review', (req, res) => {
	console.log('api review called');
	if(req._parsedUrl.query){
		const idParam = (req._parsedUrl.query).split("=")[1]
		getRandomDataFromDb(idParam, res);
	} else {
		res.send( "/api/review?id=###    query id required!");
		console.error(" missing id in query!"); };
});


//listen//
app.listen(port, () => console.log(`Listening on port ${port}`));