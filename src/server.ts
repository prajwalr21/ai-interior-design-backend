import express from 'express';
import multer from 'multer';
import { postHandler } from './handlers/postHandler';
import { masking } from './middleware/masking';
import { cors } from './middleware/cors';
import path from 'path'
import {execSync} from 'child_process'

const app = express()
app.use(express.json())
app.use(cors)

execSync(`chmod 777 ${path.join(process.cwd(), '/tmp/image-file.png')}`)

console.log('Added file permissions')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), '/tmp/'));
    },
    filename: (req, file, cb) => {
        cb(null, 'image-file.png')
    }
});

console.log('Sending data to handler')
const upload = multer({storage})

app.post('/', upload.single('imageFile'), postHandler)

app.listen(5000, () => {
    console.log('Listening on port 5000')
})
