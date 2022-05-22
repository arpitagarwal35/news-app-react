const express = require("express");
const cors = require('cors');
require('dotenv').config();
const _ = require('lodash');

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_API_KEY);

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({
    origin: '*'
}));

app.get("/", (req, res) => {
    if (!req.query || _.isEmpty(req.query) || _.isEmpty(req.query.q)) {
        newsapi.v2.topHeadlines({
            language: 'en',
            country: 'in'
        }).then(response => {
            res.json({
                response
            });
        }).catch(err => {
            var locals = {
                message: err.message || "",
                error: {
                    stack: err.stack,
                    status: err.name || err.code || ""
                }
            };
            res.status(500).json(locals);
        });
    } else {
        newsapi.v2.everything({
            q: req.query.q || ""
        }).then(response => {
            res.json({
                response
            });
        }).catch(err => {
            var locals = {
                message: err.message || "",
                error: {
                    stack: err.stack,
                    status: err.name || err.code || ""
                }
            };
            res.status(500).json(locals);
        });
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});