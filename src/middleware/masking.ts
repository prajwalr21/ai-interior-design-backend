import { Request, Response, NextFunction } from "express";
import Jimp from "jimp";
import path from 'path'

export const masking = async (req: Request, res: Response, next: NextFunction) => {
    const image = await Jimp.read(path.join(process.cwd(), '/public/image-file.png'))
    image.resize(520, 520)
    image.write(path.join(process.cwd(), '/public/image-file.png'))
    const cloned = image.clone()
    cloned.opacity(0)
    cloned.write(path.join(process.cwd(), '/public/mask.png'))
    next()
}