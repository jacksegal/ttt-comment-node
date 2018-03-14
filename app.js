/* Load Express */
var express = require('express');
var app = express();


/* CORS */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/* Return Comments */
app.get('/comments/a2cfVQpkh3yAJ/XBjy7/get', function (req, res) {
	var comments = req.app.get('comments');
	res.send(comments);
});


/* Default Route */
app.use(function(req, res){
	res.status(404);
	res.send({message: 'route not found'});
});


/* Update the Comments every 5 seconds */
setInterval(updateComments, 5*1000);


/* Listen on Port 8080 */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {

	updateComments();

	var outputDate = new Date().toISOString().
	replace(/T/, ' ').      // replace T with a space
	replace(/\..+/, '')     // delete the dot and everything after
	
	console.log(outputDate + `: App listening on port ${PORT}`);
	console.log(outputDate + ': Press Ctrl+C to quit.');
});


/* Update Comments */
function updateComments() {
	const axios = require("axios");
	const url = "https://comments.tomkinstimes.com";
	axios
	  .get(url)
	  .then(response => {

		app.set('comments', response.data); 
		//console.log('Updated Comments');

	  })
	  .catch(error => {
		var outputDate = new Date().toISOString().
		replace(/T/, ' ').      // replace T with a space
		replace(/\..+/, '')     // delete the dot and everything after
	    console.log(outputDate + ': ');
	    console.log(error);
 	});	
}