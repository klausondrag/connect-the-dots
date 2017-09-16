const express = require("express");
const app = express();

const Knex = require('knex');
const knex = Knex(require('./knexfile'));

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

let oldOut = [];
app.get("/api", (req, res) => {
    function rotate(array) {
        let o = array.shift();
        if (o) array.push(o);
        return array;
    }

    let objectToArray = function (dic) {
        let out = [];
        console.log(dic);
        for(let i in dic)
            out.push(dic[i]);

        if (oldOut.length >= out.length)
            rotate(oldOut);
        else oldOut = out;
        return oldOut;
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

const calais = require("./tools/Calais");
function getAllCandidates() {
    return knex.raw("Select * " +
        "From article a " +
        "where exists (" +
        "  select *" +
        "  from similarities s" +
        "  where (s.article_id_1 = a.article_id" +
        "  or  s.article_id_2 = a.article_id)" +
        "  And permid = 0" +
        "  )")
        .then(match)
        .catch(err => console.error(err));

    function match(a) {
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < i; j++) {
                let t1 = a[i].full_text;
                let t2 = a[j].full_text;
                calais(t1, t2);
            }
        }
    }
}
getAllCandidates();