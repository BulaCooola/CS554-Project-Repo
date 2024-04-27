'use server';
const im = require('imagemagick')
const fs = require('fs')

export async function imageToPfp (prevState,formData)
{
    console.log("gothere")
    let file = formData.get(('file'))
    console.log(file)
    //let fileBuffer = Buffer.from(file.toString('base64'))
    let fileArrBuffer = await file.arrayBuffer()
    let fileBuffer = Buffer.from(fileArrBuffer)
    console.log(fileBuffer)
    let newImg
    console.log('About to crop')
    await im.crop({srcData: fileBuffer, width: 256, height:256, quality: 0.75},
        async (err, stdout) => {
            console.log("there now")
            if (err) throw err
            //newImg = Buffer.from(stdout).toString('base64')
            newImg = btoa(stdout);
            //newImg = newImg.replace(/^data:image\/(png|jpg);base64,/, "");
            const clientId = "df6b5fe0e6eac81",
            auth = "Client-ID " + clientId;
            console.log(newImg)
            let response = await fetch("https://api.imgur.com/3/image/", {
                method: "POST",
                body: JSON.stringify({image: newImg}),
                headers: {
                    Authorization: auth,
                    "Content-Type": "application/json"
                },
            })
            const data = await response.json()
            console.log(data)
        })
}