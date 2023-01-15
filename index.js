const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const { response } = require("express");
const articles = [];
const app = express();
app.get("/", (req, res) => {
  res.json("Welcome to my climate");
});
app.get("/news", (req, res) => {
  axios
    .get("https://www.theguardian.com/environment/climate-crisis")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      $('a:contains("climate")', html).each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          title,
          url,
        });
      }),
        res.json(articles);
      console.log($);
    })
    .catch((e) => {
      e;
    });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
