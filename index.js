const { randomInt } = require("crypto");
var fs = require("fs");
var pdf = require("html-pdf");

const importSettings = require("./settings.json");

var options = {
	height: "297mm",
	width: "210mm",
	base: importSettings.basePath,
	border: {
		top: "0mm", // default is 0, units: mm, cm, in, px
		right: "0mm",
		bottom: "0mm",
		left: "0mm",
	},
};
var testBook = {
	mNumber: 123456789,
	title: "Der Marsianer",
	author: "Andy Weir",
};
startAt = "13";

module.exports = {
	createPDF(inputData, callback, deleteFile = true) {
		//generate contractID for filename
		const contractID = randomInt(99999);
		const data = {
			books: [],
		};

		for (var i = 0; i < inputData.books.length; i++) {
			var element = inputData.books[i];

			var row = Math.floor((inputData.startAt + i) / 3);
			var cell = (inputData.startAt + i) % 3;
			element.position = `${row}${cell}`;

			data.books.push(element);
		}

		//read Template and replace Placeholders with Data:
		var html = fs.readFileSync("./template/template.html", "utf8");
		html = html.replace('"-INPUT-"', JSON.stringify(data));

		//generate pdf to file with contractID as part of name
		pdf.create(html, options).toFile(
			"./tmp/pdf/pdf-" + contractID + ".pdf",
			function (err, res) {
				//errorhandling
				if (err) return console.log(err);

				//return filename to callback
				callback(res);

				if (deleteFile) {
					//delete file after 10 seconds to save space
					console.log("delete", contractID, "in 10s");
					setTimeout(() => {
						console.log("delete", contractID);
						fs.unlink(res.filename, (error) => {
							if (error) return console.log(error);
						});
					}, 10000);
				}
			}
		);
	},
};
