const express = require("express");
const app = express();

app.set("port", process.env.PORT || 3001);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.get("/api", (req, res) => {
    let item = {
        source: "Fox News",
        image_url: "/assets/img/london.jpg",
        headline: "headline",
        excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur massa quis aliquam blandit. Pellentesque quis lectus felis. Praesent consequat libero ac lobortis tincidunt. Sed ut tortor nec sapien dignissim varius ut ut est."
    };
    let news = [
        item, item, item, item,
    ];
    res.json([
        news, news, news
    ]);
});

app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
