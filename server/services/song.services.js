import Songs from '../models/songs';

export async function getSongs() {
  try {
    return await Songs.find({}).sort({added_at: 1}).limit(10).lean();
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
        html: "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FhprGqCxs3xI%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DhprGqCxs3xI&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FhprGqCxs3xI%2Fhqdefault.jpg&key=internal&type=text%2Fhtml&schema=youtube\" width=\"500\" height=\"281\" scrolling=\"no\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>",
      },
      {
        title: "Passenger | Let Her Go (Official Video)",
        url: "http://www.youtube.com/watch?v=RBumgq5yVrA",
        html: "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FRBumgq5yVrA%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DRBumgq5yVrA&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FRBumgq5yVrA%2Fhqdefault.jpg&key=internal&type=text%2Fhtml&schema=youtube\" width=\"500\" height=\"281\" scrolling=\"no\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>"
      },
      {
        title: "Forever | Stratovarius | Lyrics [Kara + Vietsub HD]",
        url: "http://www.youtube.com/watch?v=87oTHfSaR10",
        html: "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2F87oTHfSaR10%3Ffeature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D87oTHfSaR10&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2F87oTHfSaR10%2Fhqdefault.jpg&key=internal&type=text%2Fhtml&schema=youtube\" width=\"500\" height=\"281\" scrolling=\"no\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen></iframe>"
      }
    ];

    return await Songs.create(songs);
  } catch (err) {
    console.log('err on dummySongs:', err);
    return Promise.reject({status: 500, error: 'Internal error.'});
  }
}
