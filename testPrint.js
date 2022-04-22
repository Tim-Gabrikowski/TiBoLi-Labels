const { createPDF } = require("./index");

var testData = {
	startAt: 0,
	books: [
		{
			position: 11,
			title: "inputData.title",
			author: "inputData.author",
			mNumber: 123456789,
		},
		{
			position: 12,
			title: "inputData.title.2",
			author: "inputData.author.2",
			mNumber: 123456789.2,
		},
	],
};

createPDF(
	testData,
	(result) => {
		console.log(result);
	},
	false
);
