'use server';
const im = require('imagemagick')
const fs = require('fs')
import { userData } from '@/data';

const accepted = ['image/jpg','image/jpeg','image/png','image/webp']

//Needs to be in separate function that returns a Promise like this,
//else there is no way to return a value that either relies on this
//or waits until after it is successful in cropping the image
const cropImage = (file) => {
    return new Promise((resolve, reject) => {
        im.crop({srcData: file, width: 256, height:256},
            (err, stdout) => {
                if (err) reject(err)
                resolve(stdout)
            })
    })
}
export async function imageToPfp (prevState,formData)
{
    let id = formData.get('userId')
    let file = formData.get(('file'))
    //console.log(file)
    //console.log(`File type: ${file.type}`)
    if (accepted.includes(file.type)) {
        let fileArrBuffer = await file.arrayBuffer()
        let fileBuffer = Buffer.from(fileArrBuffer)
        let newImg = await cropImage(fileBuffer)
        newImg = btoa(newImg);
        const clientId = "df6b5fe0e6eac81",
        auth = "Client-ID " + clientId;
        let response = await fetch("https://api.imgur.com/3/image/", {
            method: "POST",
            body: JSON.stringify({image: newImg}),
            headers: {
                Authorization: auth,
                "Content-Type": "application/json"
            },
        })
        const data = await response.json()
        let newPfpUrl = data.data.link
        //console.log(newPfpUrl)
        let result = await userData.editUserPfp(id,newPfpUrl)
        return {message: ["Your profile picture has been updated!"], newImg: newPfpUrl}
    }
    else {
        return {message: ["You must provide an image file!"], newImg: null}
    }
}