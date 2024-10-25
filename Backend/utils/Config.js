require('dotenv').config();
const PORT = process.env.PORT

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const correo = process.env.correo

const BD_HOST=process.env.BD_HOST
const BD_USER=process.env.BD_USER
const BD_PORT=process.env.BD_PORT
const BD_PASSWORD= process.env.BD_PASSWORD
const BD_NAME=process.env.BD_NAME

const BUCKET = process.env.BUCKET

module.exports = {
    PORT,
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    REFRESH_TOKEN,
    correo,
    BD_HOST,
    BD_USER,
    BD_PORT,
    BD_PASSWORD,
    BD_NAME,
    BUCKET
};