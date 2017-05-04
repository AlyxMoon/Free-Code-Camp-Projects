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
    "title" : "Pomodoro Clock",
    "link": "http://codepen.io/AlyxMoon/full/OyqMwe",
    "image": "http://codepen.io/AlyxMoon/pen/OyqMwe/image/small.png"
  },
  {
    "title" : "Calculator",
    "link": "http://codepen.io/AlyxMoon/full/GoKNYG",
    "image": "http://codepen.io/AlyxMoon/pen/GoKNYG/image/small.png"
  },
  {
    "title" : "Tic Tac Toe",
    "link": "http://codepen.io/AlyxMoon/full/zqjqVE",
    "image": "http://codepen.io/AlyxMoon/pen/zqjqVE/image/small.png"
  },
  {
    "title" : "Simon Game",
    "link": "http://codepen.io/AlyxMoon/full/YqORyx",
    "image": "http://codepen.io/AlyxMoon/pen/YqORyx/image/small.png"
  },
  {
    "title" : "Recipe Box",
    "link": "http://codepen.io/AlyxMoon/full/MbzeRy",
    "image": "http://codepen.io/AlyxMoon/pen/MbzeRy/image/small.png"
  },
  {
    "title" : "Markdown Previewer",
    "link": "http://codepen.io/AlyxMoon/full/VmwYjb",
    "image": "http://codepen.io/AlyxMoon/pen/VmwYjb/image/small.png"
  },
  {
    "title" : "Free Code Camp Leaderboard",
    "link": "http://codepen.io/AlyxMoon/full/MbqBre",
    "image": "http://codepen.io/AlyxMoon/pen/MbqBre/image/small.png"
  },
  {
    "title" : "Conway's Game of Life",
    "link": "http://codepen.io/AlyxMoon/full/kkEOXv",
    "image": "http://codepen.io/AlyxMoon/pen/kkEOXv/image/small.png"
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