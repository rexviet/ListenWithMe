$(document).ready(function(){
	getSongs()
		.then(results => {
			if(results.success) {
				configs.songs = results.data;
        renderFistSong(results);
        renderListSongs(results.data);
      }
		});
});

function getJSON(url) {
	return	$.getJSON('https://api.embedly.com/1/oembed?' + $.param({
	  url: url,
	  key: "e2f803a0fc0a46bba0d30ec181147574"
	}));
}


function getSongs() {
	return $.getJSON(configs.BASE_URL + '/api/songs');
}

function renderFistSong() {
	let firstSong = configs.songs[0];
  console.log('firstSong:', firstSong);
  if (firstSong) {
    let html = firstSong.html;
    if (configs.ENV === 'local') {
      let i = html.indexOf("//cdn");
      let head = html.substring(0, i);
      let tail = html.substring(i);
      html = head + "http:" + tail;
    }
    $("#player").html(html);

		initPlayer();
    play();
  }
}

function renderListSongs() {
  let template = $('#hidden-template').html();
  configs.songs.forEach(song => {
		let html = Mustache.to_html(template, song);
    $('#sampleArea').append(html);
	});
}
