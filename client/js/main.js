$(document).ready(function(){
	getSongs()
		.then(results => {
			if(results.success) {
				configs.songs = results.data;
        renderFistSong(results);
        renderListSongs(results.data);
      }
		});

	$('.btnSubmit').on('click', submitSong);
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

function submitSong() {
	let inputElm = $('.inputSong');
	let input = inputElm.val().replace(/\s+/g, '').trim();
	let valid = isValidURL(input);
	if(!valid) {
		alert("Invalid URL");
	}
	console.log('valid url:', input);
  inputElm.val('');
}

const YTB_REG = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
function isValidURL(url) {
	return YTB_REG.test(url);
}
