$(document).ready(function() {
	var api = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=extracts&pilimit=max&gsrnamespace=0&gsrlimit=10&exintro&explaintext&exsentences=1&exlimit=max&callback=?&gsrsearch=";

	$("#random-page").click(function() {
	   window.open("http://en.wikipedia.org/wiki/Special:Random");
	});
	
	$("#wiki-search").click(function(event) {
		event.preventDefault();

		$.getJSON(api + $("#searchbox").val() + '', function(data) {
			$.each(data['query'].pages, function(key, value) {
				$("#wiki-results").append("<a href='https://en.wikipedia.org/?curid=" + value["pageid"] + "' target='_blank'><div class='wiki-result'>");
				$(".wiki-result").last().append("<h4 class='wiki-title'>" + value["title"] + "</h5>");
				$(".wiki-result").last().append("<p class='wiki-excerpt'>" + value["extract"] + "</p>");
				$("#wiki-results").append("</div></a>");
			});
		});
	});
});