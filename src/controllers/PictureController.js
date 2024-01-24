import multer from 'multer';
import multerConfig from '../config/multerConfig';

import Picture from '../models/Picture';

const upload = multer(multerConfig).single('picture');

class PictureController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(401).json({ errors: [error.code] });
      }

      try {
        const { originalname, filename } = req.file;
        const { costumer_id } = req.body;
        const picture = await Picture.create({ originalname, filename, costumer_id });

        return res.json(picture);
      } catch (e) {
        console.log(e);
        return res.status(400).json({
          errors: ["The costumer doesn'\t exists or internal server error"],
        });
      }
    });
  }
}

export default new PictureController();
