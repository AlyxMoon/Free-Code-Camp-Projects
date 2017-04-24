$(document).ready(generateQuote);
$('#new-quote').on('click', generateQuote);

function generateQuote() {
  var quotes = [
    "Electricity is actually made up of extremely tiny particles called electrons, that you cannot see with the naked eye unless you have been drinking.",
    "The only really good place to buy lumber is at a store where the lumber has already been cut and attached together in the form of furniture, finished, and put inside boxes.",
    "Without question, the greatest invention in the history of mankind is beer. Oh, I grant you that the wheel was also a fine invention, but the wheel does not go nearly as well with pizza.",
    "Denmark (also called \"Norway\") is best known as the original home of the prune Danish as well as the Vikings, who wore hats with horns sticking out of them, and for a very good reason: they were insane.",
    "The best way to learn Japanese is to be born as a Japanese baby, in Japan, raised by a Japanese family.",
    "We need our highest judicial body to stop this childish bickering and get back to debating the kinds of weighty constitutional issues that have absorbed the court in recent years, such as whether a city can legally force an exotic dancer to cover her entire nipple, or just the part that pokes out.",
    "What was life like in the colonies? Probably the best word to describe it would be \"colonial\".",
    "It is a scientific fact that your body will not absorb cholesterol if you take it from another person's plate.",
    "Winter's here, and you feel lousy: You're coughing and sneezing; your muscles ache; your nose is an active mucus volcano. These symptoms -- so familiar at this time of year -- can mean only one thing: Tiny fanged snails are eating your brain.",
    "We must always remember that, as Americans, we all have a common enemy -- an enemy that is dangerous, powerful and relentless. I refer, of course, to the federal government.",
    "The real threat to whales is whaling, which has endangered many whale species.",
    "The one thing that unites all human beings, regardless of age, gender, religion or ethnic background, is that we all believe we are above-average drivers.",
    "It is a well-documented fact that guys will not ask for directions. This is a biological thing. This is why it takes several million sperm cells... to locate a female egg, despite the fact that the egg is, relative to them, the size of Wisconsin.",
    "Camping is nature's way of promoting the motel business.",
    "Nobody cares if you can't dance well. Just get up and dance.",
    "People who want to share their religious views with you almost never want you to share yours with them.",
    "The word user is the word used by the computer professional when they mean idiot.",
    "Fishing is boring, unless you catch an actual fish, and then it is disgusting.",
    "You can only be young once. But you can always be immature.",
    "Gravity is a contributing factor in nearly 73 percent of all accidents involving falling objects.",
    "Never under any circumstances take a sleeping pill and a laxative on the same night.",
    "Never assume that the guy understands that you and he have a relationship.",
    "The major parties could conduct live human sacrifices on their podiums during prime time, and I doubt that anybody would notice.",
    "To better understand why you need a personal computer, let's take a look at the pathetic mess you call your life."
  ];

  var randomQuote = quotes[Math.floor(Math.random()*quotes.length)];
  $('.quote-text').text(randomQuote);
  $('.quote-author').text('Dave Barry');
  $('#tweet-button').attr('href', 'https://twitter.com/intent/tweet?text=' + randomQuote[0]);
}