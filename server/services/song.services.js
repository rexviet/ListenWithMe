import Songs from '../models/songs';

export async function getSongs() {
  try {
    return await Songs.find({}).sort({added_at: 1}).limit(10).lean();
  } catch (err) {
    console.log('err on getSongs:', err);
    return Promise.reject({status: 500, error: 'Internal error.'});
  }
}
