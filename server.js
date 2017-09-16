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
    let objectToArray = function (dic) {
        let out = [];
        console.log(dic);
        for(let i in dic)
            out.push(dic[i]);
        return out;
    };
    knex.raw("select group_id, headline, excerpt, image_url, name, article_url from (SELECT * FROM  matching inner join article a on matching.article_id = a.article_id) m inner join company c on c.source_id = m.source_id")
        .then(n => {
            let dic = {};
            n.forEach(i=> {
                if (!dic[i.group_id]) dic[i.group_id]= [];
                return dic[i.group_id].push(i);
            });
            return res.json(objectToArray(dic));
        })
        .catch(err => console.error(err));
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
