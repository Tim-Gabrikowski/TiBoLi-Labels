const app = require("express")();
const express = require("express");
const pdfService = require("./index");

app.use(express.json());

app.get("/style", (req, res) => {
	res.sendFile(__dirname + "/template/templateStyle.css");
});
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/template/template.html");
});
app.post("/pdf", (req, res) => {
	pdfService.createPDF(req.body, (pdf) => {
		res.sendFile(pdf.filename);
	});
});
app.listen(3006, () => {
	console.log("on!");
});
