import Songs from '../models/songs';
import request from 'request-promise';
import configs from '../config';
import querystring from 'querystring';

export async function getSongs(lastSongId, limit) {
  try {
    let conditions = {};
    if(lastSongId) {
      conditions._id = {$gt: lastSongId};
    }
    return await Songs.find(conditions).sort({added_at: 1}).limit(limit).lean();
  } catch (err) {
    console.log('err on getSongs:', err);
    return Promise.reject({status: 500, error: 'Internal error.'});
  }
}

export async function dummySongs() {
  try {
    let songs = [
      {
        title: 'While Your Lips Are Still Red | Nightwish | Lyrics [Kara + Vietsub HD]',
        url: 'http://www.youtube.com/watch?v=hprGqCxs3xI',
        thumbnail_url: "https://i.ytimg.com/vi/hprGqCxs3xI/hqdefault.jpg",
        description: "\" Link download: http://bit.ly/1LOfmMu \" Ask me?: http://ask.fm/nguyenthanh269 ● \"J.K\" - Joker ● \" Channel 1: http://goo.gl/qwQNAs \" Channel 2: http://goo.gl/sTu1QH \" We Love Proshow: http://goo.gl/Kz38Xq \" I Love Music: http://goo.gl/uDDcHv \" Images Of PSP: http://goo.gl/i0hzda \" Contact Us: jkvevolution@gmail.com \" Chúc các bạn có những giây phút vui vẻ ♥ \" Software Support: Proshow Producer v5.1 & Aegisub v3.02 Don't forget to LIKE, SUBSCRIBE, COMMENT and RATE.\n",
        html: "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FhprGqCxs3xI%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DhprGqCxs3xI&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FhprGqCxs3xI%2Fhqdefault.jpg&key=internal&type=text%2Fhtml&schema=youtube\" width=\"500\" height=\"281\" scrolling=\"no\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>",
      },
      {
        title: "Passenger | Let Her Go (Official Video)",
        url: "http://www.youtube.com/watch?v=RBumgq5yVrA",
        thumbnail_url: "https://i.ytimg.com/vi/RBumgq5yVrA/hqdefault.jpg",
        description: "Pre-order Passenger's new album 'Runaway' - https://Passenger.lnk.to/RunawayID Tour Tickets on sale now - https://passengermusic.com/live/ 'Let Her Go' from the album 'All the Little Lights' - https://Passenger.lnk.to/AllTheLittleLightsID *** The official video for 'Let Her Go' - Directed and Produced by Dave Jansen.\n",
        html: "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FRBumgq5yVrA%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DRBumgq5yVrA&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FRBumgq5yVrA%2Fhqdefault.jpg&key=internal&type=text%2Fhtml&schema=youtube\" width=\"500\" height=\"281\" scrolling=\"no\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>"
      },
      {
        title: "Forever | Stratovarius | Lyrics [Kara + Vietsub HD]",
        url: "http://www.youtube.com/watch?v=87oTHfSaR10",
        thumbnail_url: "https://i.ytimg.com/vi/87oTHfSaR10/hqdefault.jpg",
        description: "\" Ask me?: http://ask.fm/nguyenthanh269 ● Follow me: ----------------------------------------­­------------------------------ \" We Love Proshow: http://goo.gl/Kz38Xq \" Music Of Life: http://goo.gl/qwQNAs \" JK Music Channel: http://goo.gl/egrLUF \" Facebook: facebook.com/nguyenthanh269 \" Twitter: twitter.com/nguyenthanh269 \" Youtube: youtube.com/jkvevolution \" Mail: jkvevolution@gmail.com Don't forget to LIKE, SUBSCRIBE, COMMENT and RATE. Hope you all enjoy!\n",
        html: "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2F87oTHfSaR10%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D87oTHfSaR10&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2F87oTHfSaR10%2Fhqdefault.jpg&key=internal&type=text%2Fhtml&schema=youtube\" width=\"500\" height=\"281\" scrolling=\"no\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>"
      }
    ];

    return await Songs.create(songs);
  } catch (err) {
    console.log('err on dummySongs:', err);
    return Promise.reject({status: 500, error: 'Internal error.'});
  }
}

export async function addSong(url) {
  try {
    let data = await getURLInfo(url);
    return await Songs.create({
      title: data.title,
      url: data.url,
      thumbnail_url: data.thumbnail_url,
      description: data.description,
      html: data.html,
    });
  } catch (err) {
    console.log('err on addSong:', err);
    return Promise.reject({status: 500, error: 'Internal error.'});
  }
}

async function getURLInfo(url) {
  try {
    let requestUrl = `https://api.embedly.com/1/oembed?url=${url}&key=${configs.embedly_key}&width=850&height=480`;
    let data = await request(requestUrl);
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}

const baseQuery = {
  token: configs.slack_token,
  as_user: true
};
export async function submitSongFromSlack(url, channel) {
  try {
    let song = await addSong(url);
    let text = `Your song: "${song.title}" has been added to queue.`;
    let queryOptions = Object.assign({}, baseQuery);
    queryOptions.channel = channel;
    queryOptions.text = text;
    let query = querystring.stringify(queryOptions);;
    let requestUrl = `https://slack.com/api/chat.postMessage?${query}`;
    return request(requestUrl);
  } catch (err) {
    console.log('err on submitSongFromSlack:', err);
    return Promise.reject({status: 500, error: 'Internal error.'});
  }
}

export async function deleteSong(songId) {
  try {
    await Songs.remove({_id: songId});
  } catch (err) {
    console.log('err on deleteSong:', err);
    return Promise.reject({status: 500, error: 'Internal error.'});
  }
}
