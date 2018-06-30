import {Router} from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import slug from 'limax';
import configs from '../config';

const router = new Router();
const destPostUpload = path.resolve(__dirname, '../../' + configs.uploadPath + '/posts');
console.log('destPostUpload:', destPostUpload);

const storagePost = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(destPostUpload)) {
      fs.mkdirSync(destPostUpload);
    }
    cb(null, destPostUpload);
  },
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const slugName = slug(originalName, {lowercase: true});
    const finalName = Date.now() + '-' + slugName + '.jpg';
    cb(null, finalName);
  }
});
const uploadPost = multer({storage: storagePost});

router.post('/post/', uploadPost.single('post'), (req, res) => {
  if(req.file) {
    return res.json({success: true, data: {filePath: `${configs.uploadPath}/posts/${req.file.filename}`}});
  }

});

export default router;