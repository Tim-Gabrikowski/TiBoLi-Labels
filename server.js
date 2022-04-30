const app = require("express")();
const express = require("express");
const { getContractPage } = require("./index");
const pdfService = require("./index");

app.use(express.json());

app.get("/style", (req, res) => {
	res.sendFile(__dirname + "/template/templateStyle.css");
});
app.get("/", (req, res) => {
	res.sendFile(__dirname + "/template/template.html");
});
app.get("/contract/:contractID", (req, res) => {
	res.send(getContractPage(Number(req.params.contractID)));
});
app.post("/pdf", (req, res) => {
	pdfService.createPDF(req.body, (pdf) => {
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
