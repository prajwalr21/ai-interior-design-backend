import { Request, Response } from "express";
import { getPrompt } from "../prompts/getPrompt";
import OpenAI from "openai"
import fs from "fs"
import path from 'path'
import { OPENAI_API_KEY } from "../env";
import streamifier from 'streamifier'
import MemoryStream from "memorystream";
import {Readable} from 'stream'
import { FileLike } from "openai/uploads.mjs";

export const postHandler = async (req: Request, res: Response) => {
    try {
        console.time('postHandler')
        const imageParameters = Object.keys(req.body)
        const argsForPrompt = imageParameters.map(param => req.body[param])
        const prompt = getPrompt(argsForPrompt)
        console.log(prompt)
    
        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY,
        })
        const imageFilePath = path.join('/tmp', 'image-file.png');
        const image = await openai.images.edit({
            image: fs.createReadStream(imageFilePath),
            prompt,
            n: 1
          });
    
        console.log('Image Data', image.data)
        
        res.status(200).json(image.data)
        console.timeEnd('postHandler')
    } catch(e) {
        const error = e as Error
        console.log(error)
        res.status(200).json({
            error
        })
    }
}