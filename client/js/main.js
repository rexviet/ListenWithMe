$(document).ready(function(){
	// var iframe = $('iframe.embedly-embed');
	// console.log('iframe:', iframe);
	// var player = new playerjs.Player(iframe);

	// player.on(playerjs.Events.PLAY, function() {
	// 	console.log('play');
	// });

	// player.on('ready', function(){
	//   // Seek to 20 seconds in.
	//   // player.setCurrentTime(20);
	//   console.log('ready');
	// });

	// $('iframe.embedly-embed').each(function(){
	//   // initialize the player.
	//   var player = new playerjs.Player(this);
	  
	//   // Wait for the player to be ready.
	//   player.on('ready', function(){
	    
	//     // Listen to the play event.
	//     player.on('play', function(){
	//       // Tell Google analytics that a video was played.
	//       window.ga('send', 'event', 'Video', 'Play');
	//     });
	  
	//     //autoplay the video.
	//     player.play();
	//   });
	// });
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

function onPlay() {
 	// var iframe = $('iframe.embedly-embed');							// khong duoc
	var iframe = document.querySelector('iframe.embedly-embed');	// duoc
	var player = new playerjs.Player(iframe);

	 player.on('ready', function(){
    	console.log('ready');
	   
	    //autoplay the video.
	    player.play();
  	});
}