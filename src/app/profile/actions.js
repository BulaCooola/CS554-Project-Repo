'use server';
const im = require('imagemagick')
const fs = require('fs')
import { userData } from '@/data';

const accepted = ['image/jpg','image/jpeg','image/png','image/webp']

const cropImage = (image) => {
    return new Promise((resolve, reject) => {
        im.crop({srcData: image, width: 256, height:256, quality: 0.75},
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
    console.log(file)
    console.log(`File type: ${file.type}`)
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
        console.log(newPfpUrl)
        let result = await userData.editUserPfp(id,newPfpUrl)
        return {message: null, newImg: newPfpUrl}
        //let succeeded = false
        /*let thing = await im.crop({srcData: fileBuffer, width: 256, height:256, quality: 0.75},
            async (err, stdout) => {
                if (err) throw err
                newImg = btoa(stdout);
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
                console.log(newPfpUrl)
                let result = await userData.editUserPfp(id,newPfpUrl)
                resolve( {message: ["it is all good now"]} )
                //succeeded = data.success
            })*/
        //if (succeeded) return {message: null}
        //else return {message: ["Image upload failed! Imgur server may be down!"]}
    }
    else {
        return {message: ["You must provide an image file!"], newImg: null}
    }
}