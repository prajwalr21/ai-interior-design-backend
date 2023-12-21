import express from 'express';
import multer from 'multer';
import { postHandler } from './handlers/postHandler';
import { masking } from './middleware/masking';
import { cors } from './middleware/cors';
import path from 'path'

const app = express()
app.use(express.json())
app.use(cors)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), '/tmp/'));
    },
    filename: (req, file, cb) => {
        cb(null, 'image-file.png')
    }
});

const upload = multer({storage})

app.post('/', upload.single('imageFile'), postHandler)

app.listen(5000, () => {
    console.log('Listening on port 5000')
})
