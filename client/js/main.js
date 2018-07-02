$(document).ready(function(){
	console.log('hello');
	getSongs()
		.then(results => {
			if(results.success) {
				configs.songs = results.data;
        renderFistSong();
        renderListSongs();
      }
		});

	$('.btnSubmit').on('click', submitSong);
	$('.btnNext').on('click', playNextSong);
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
  return new Promise(resolve => {
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

      initPlayer()
        .then(() => resolve());
      // play();
    }
  });
}

function renderListSongs() {
  let template = $('#hidden-template').html();
  configs.songs.forEach(song => {
		let html = Mustache.to_html(template, song);
    $('#sampleArea').append(html);
	});
}

function submitSong() {
	let inputElm = $('.inputSong');
	let input = inputElm.val().replace(/\s+/g, '').trim();
	let valid = isValidURL(input);
	if(!valid) {
		alert("Invalid URL");
	}
	console.log('valid url:', input);
  inputElm.val('');
  emit('new_song', input);
}

function getNextSong() {
	let lastSongId = configs.songs[configs.songs.length - 1]._id;
  $.getJSON(configs.BASE_URL + '/api/songs?lastSong=' + lastSongId + '&limit=1')
		.then(result => {
      if(result.success && result.data.length) {
        let nextSong = result.data[0];
        configs.songs.push(nextSong);

        // render to list
        let template = $('#hidden-template').html();
        let html = Mustache.to_html(template, nextSong);
        $('#sampleArea').append(html);
      }
		});
}

function playNextSong() {
  getNextSong();
  configs.songs.shift();
  $('#sampleArea').children().eq(1).remove();
  renderFistSong();
}
