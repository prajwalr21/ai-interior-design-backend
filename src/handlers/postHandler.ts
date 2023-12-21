import { Request, Response } from "express";
import { getPrompt } from "../prompts/getPrompt";
import OpenAI from "openai"
import fs from "fs"
import path from 'path'
import { OPENAI_API_KEY } from "../env";

export const postHandler = async (req: Request, res: Response) => {
    try {
        const imageParameters = Object.keys(req.body)
        const argsForPrompt = imageParameters.map(param => req.body[param])
        const prompt = getPrompt(argsForPrompt)
        console.log(prompt)
    
        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY,
            // maxRetries: 3
        })
        const imageFilePath = path.join(process.cwd(), 'public', 'image-file.png');
        const maskFilePath = path.join(process.cwd(), 'public', 'mask.png');
        console.log(imageFilePath, maskFilePath)
        const image = await openai.images.edit({
            image: fs.createReadStream(imageFilePath),
            prompt,
            n: 3
          });
    
        console.log('Image Data', image.data)
        
        res.status(200).json(image.data)
    } catch(e) {
        const error = e as Error
        console.log(error)
    }
}