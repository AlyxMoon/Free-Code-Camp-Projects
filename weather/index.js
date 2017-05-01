$(document).ready(function() {
  $.getJSON("http://ipinfo.io", function(location) {
    var pullWeather =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      location["city"] +
      "," +
      location["country"] +
      "&appid=" +
      "ec11eb00dab1bf13ea0632528561bfcb";

    $.getJSON(pullWeather, function(weather) {
      console.log(weather);

      var temperature = weather["main"]["temp"] - 273.15;
      var humidity = weather.main.humidity + '%';
      var clouds = weather.clouds.all + '%'
      var wind = weather["wind"]["speed"] + ' m/s';

      $("#icon").append(
        '<img src="http://openweathermap.org/img/w/' +
          weather.weather[0].icon +
          '.png">'
      );

      $("#temperature").text(temperature.toFixed(1));
      $("#units").text("°C");
      $("#location").text(location["city"] + ", " + location["country"]);
      $("#humidity").text(humidity);
      $("#clouds").text(clouds);
      $("#wind").text(wind);
    });
  });

  $("#temp-c").on("click", function() {
    if ($("#units").text() === "°F") {
      $("#temperature").text(
        (5 / 9 * ($("#temperature").text() - 32)).toFixed(1)
      );
      $("#units").text("°C");
    }
  });
  $("#temp-f").on("click", function() {
    if ($("#units").text() === "°C") {
      $("#temperature").text(
        (9 / 5 * $("#temperature").text() + 32).toFixed(1)
      );
      $("#units").text("°F");
    }
  });
});
