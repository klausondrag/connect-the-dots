const express = require("express");
const app = express();

const Knex = require('knex');
const knex = Knex(require('./knexfile'));

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get("/api", (req, res) => {
    knex.raw("select a.headline, a.excerpt, a.image_url, c.name " +
        "from article a " +
        "join company c " +
        "on c.source_id = a.source_id")
        .then(n => res.json(n))
        .catch(err => console.error(err));
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
