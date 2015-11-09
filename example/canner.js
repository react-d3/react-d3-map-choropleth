examples = [
  {
    "link": "map",
    "title": "Map"
  },
  {
    "link": "choropleth",
    "title": "Choropleth"
  },
  {
    "link": "twpopulation",
    "title": "Taiwan Population"
  }
];


var canner = examples.map(function(d) {
  return {
    "layout": "./layout.hbs",
    "filename": './' + d.link + '.html',
    "data": {
      "link": d.link,
      "title": d.title
    }
  }
})

module.exports = canner;
