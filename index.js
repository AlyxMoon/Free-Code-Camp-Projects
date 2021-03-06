var projects = [
  {
    "title" : "Random Quotes",
    "link": "quotes",
    "image": "img/previews/quotes.png"
  },
  {
    "title" : "Local Weather",
    "link": "weather",
    "image": "img/previews/weather.png"
  },
  {
    "title" : "Wikipedia Viewer",
    "link": "wikipedia",
    "image": "img/previews/wikipedia.png"
  },
  {
    "title" : "Twitch Streamers",
    "link": "twitch",
    "image": "img/previews/twitch.png"
  },
  {
    "title" : "Calculator",
    "link": "calculator",
    "image": "img/previews/calculator.png"
  },
  {
    "title" : "Pomodoro Clock",
    "link": "pomodoro",
    "image": "img/previews/pomodoro.png"
  },
  {
    "title" : "Tic Tac Toe",
    "link": "tictactoe",
    "image": "img/previews/tictactoe.png"
  },
  {
    "title" : "Simon Game",
    "link": "simon",
    "image": "img/previews/simon.png"
  },
  {
    "title" : "Markdown Previewer",
    "link": "markdown",
    "image": "img/previews/markdown.png"
  },
  {
    "title" : "Free Code Camp Leaderboard",
    "link": "leaderboard",
    "image": "img/previews/leaderboard.png"
  },
  {
    "title" : "Recipe Box",
    "link": "recipes",
    "image": "img/previews/recipes.png"
  },
  {
    "title" : "Conway's Game of Life",
    "link": "gameoflife",
    "image": "img/previews/gameoflife.png"
  },
  {
    "title": "Roguelike Dungeon Crawler",
    "link": "dungeoncrawler",
    "image": "img/previews/dungeoncrawler.png"
  },
  {
    title: 'D3 - Bar Graph',
    link: 'data-viz-bar',
    image: 'img/previews/data-viz-bar.png'
  },
  {
    title: 'D3 - Scatterplot',
    link: 'data-viz-scatterplot',
    image: 'img/previews/data-viz-scatterplot.png'
  },
  {
    title: 'D3 - Heat Map',
    link: 'data-viz-heatmap',
    image: 'img/previews/data-viz-heatmap.png'
  },
  {
    title: 'D3 - Force Directed Graph',
    link: 'data-viz-force',
    image: 'img/previews/data-viz-force.png'
  },
  {
    title: 'D3 - Meteorite Map',
    link: 'data-viz-map',
    image: 'img/previews/data-viz-map.png'
  },
  {
    title: 'API - Timestamp Microservice',
    link: 'api-timestamp',
    image: 'img/previews/api-timestamp.png'
  },
  {
    title: 'API - Request Header Parser',
    link: 'api-header',
    image: 'img/previews/api-header.png'
  },
  {
    title: 'API - URL shortener',
    link: 'api-url-shortener',
    image: 'img/previews/api-url-shortener.png'
  },
  {
    title: 'API - Image Search Abstraction Layer',
    link: 'api-image-search',
    image: 'img/previews/api-image-search.png'
  },
  {
    title: 'API - File Metadata Microservice',
    link: 'api-file-metadata',
    image: 'img/previews/api-file-metadata.png'
  },
  {
    title: 'Fullstack Voting App',
    link: 'http://fullstack-voting-app.allistermoon.com',
    image: 'img/previews/fullstack-voting-app.png'
  },
  {
    title: 'Fullstack Nightlife App',
    link: 'http://fullstack-nightlife-app.allistermoon.com',
    image: 'img/previews/fullstack-nightlife-app.png'
  }
]

$(document).ready(function() {
  fillPortfolio($('.portfolio-container'), projects);
});

function fillPortfolio(element, data) {
  for(var i = data.length - 1; i >= 0; i--) {
    element.append(
      $('<div />')
        .addClass('col-xs-12 col-sm-6 col-md-4 col-lg-3')
        .append(
          $('<div />')
            .addClass('portfolio-item')
            .append(
              $('<div />')
                .addClass('portfolio-text')
                .text(data[i].title)
            )
            .append(
              $('<div />')
                .addClass('portfolio-image')
                .append(
                  $('<a />')
                    .attr('href', data[i].link)
                    .attr('target', '_blank')
                    .append(
                      $('<img />')
                        .attr('src', data[i].image)
                    )
                )
            )
        )
    );
  }
};