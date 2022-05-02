const app = require("express")();
const express = require("express");
const pdfService = require("./index");

app.use(express.json());

app.get("/style/books", (req, res) => {
	res.sendFile(__dirname + "/template/books/templateStyle.css");
});
app.get("/style/users", (req, res) => {
	res.sendFile(__dirname + "/template/users/templateStyle.css");
});

app.get("/contract/:contractID", (req, res) => {
	res.send(pdfService.getContractPage(Number(req.params.contractID)));
});
app.post("/pdf/books", (req, res) => {
	pdfService.createBookPDF(req.body, (pdf) => {
		res.set({
			"Content-Type": "application/pdf",
			"Content-Length": pdf.length,
		});
		res.send(pdf);
	});
});
app.post("/pdf/users", (req, res) => {
	pdfService.createUserPDF(req.body, (pdf) => {
		res.set({
			"Content-Type": "application/pdf",
			"Content-Length": pdf.length,
		});
		res.send(pdf);
	});
});
app.listen(3006, () => {
	console.log("on!");
});
