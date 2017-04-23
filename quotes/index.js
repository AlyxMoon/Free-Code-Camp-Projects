$(document).ready(function() {
  generateQuote();

  $('#new-quote').on('click', function() {
    generateQuote();
    console.log('test')
  });

});

function generateQuote() {
  var quotes = [
    "Start by doing what's necessary; then do what's possible; and suddenly you are doing the impossible.&Francis of Assisi",
    "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.&Jimmy Dean",
    "Perfection is not attainable, but if we chase perfection we can catch excellence.&Vince Lombardi",
    "If opportunity doesn't knock, build a door.&Milton Berle",
    "Don’t worry about people stealing your design work. Worry about the day they stop.&Jeffrey Zeldman",
    "Always look for the fool in the deal. If you don’t find one, it’s you.&Mark Cuban"
  ];

  var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
  randomQuote = randomQuote.split('&');
  $('.quote-text').text(randomQuote[0]);
  $('.quote-author').text(randomQuote[1]);
  $('#tweet-button').attr('href', "http://twitter.com/home?status=" + randomQuote[0]);
}