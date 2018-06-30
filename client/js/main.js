$(document).ready(function(){
	getSongs()
		.then(results => {
      renderFistSong(results);
      renderListSongs(results.data);
		});



});

function getJSON(url) {
	return	$.getJSON('https://api.embedly.com/1/oembed?' + $.param({
	  url: url,
	  key: "e2f803a0fc0a46bba0d30ec181147574"
	}));
}

function onButtonClicked() {
	getJSON("https://www.youtube.com/watch?v=hprGqCxs3xI")
	.then(function(json) {
		console.log('json:', json);
		var html = json.html;
		var i = json.html.indexOf("//cdn");
		var head = json.html.substring(0, i);
		var tail = json.html.substring(i);
		html = head + "http:" + tail;
		$("#player").html(html);
	});
}



function getSongs() {
	return $.getJSON(configs.BASE_URL + '/api/songs');
}

function renderFistSong(songResults) {
	if(songResults.success) {
		let songs = songResults.data;
		let firstSong = songs[0];
		console.log('firstSong:', firstSong);
		let html = firstSong.html;
		if(configs.ENV === 'local') {
      let i = html.indexOf("//cdn");
      let head = html.substring(0, i);
      let tail = html.substring(i);
      html = head + "http:" + tail;
    }
    $("#player").html(html);

    initPlayer();
	}
}

function renderListSongs(songs) {
  let template = $('#hidden-template').html();
  songs.forEach(song => {
		let html = Mustache.to_html(template, song);
    $('#sampleArea').append(html);
	});
}
