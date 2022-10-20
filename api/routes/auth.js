import { Router } from 'express'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const authRoutes = Router();
const dirFile = path.resolve(__dirname, '../upload')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${dirFile}`)
    },
    filename: (req, file, cb) => {
        const fileName = req.body.username
            
        const fileExtension = path.extname(file.originalname)

        cb(null, `${fileName}-${Date.now()}${fileExtension}`)
    }
})

//REGISTRO

export const createJWTToken = (user) => {
    return jwt.sign({user}, process.env.PASS_SEC, {
        expiresIn: "1h"
    })
}

export default authRoutes;