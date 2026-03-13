const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// middleware
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files
app.use(express.static(path.join(__dirname, "public")));

app.post("/bmi", (req, res) => {

    const name = req.body.name;
    const height = parseFloat(req.body.height);
    const weight = parseFloat(req.body.weight);

    const bmi = weight / (height * height);

    let category;

    if (bmi < 18.5)
        category = "Underweight";
    else if (bmi < 24.9)
        category = "Normal";
    else if (bmi < 29.9)
        category = "Overweight";
    else
        category = "Obese";

    res.redirect(`/result.html?name=${name}&bmi=${bmi.toFixed(2)}&category=${category}`);

});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:3000");
});