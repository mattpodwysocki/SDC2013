var fs = require('fs');

// Read all the NPM Entries
fs.readFile('../npm.json', function (err, data) {
	var json = JSON.parse(data);

	// Iterate
	json.rows.forEach(function (row) {
		// Display the description
		console.log(row.doc.description);
	});
});