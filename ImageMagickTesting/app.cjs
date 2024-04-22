const gm = require('gm').subClass({ imageMagick: '7+' });

function imageToPfp (imagePath)
{
    //From the input, takes a path to an image, crops the center
    //300x300 area if it is larger than that.
    gm(`${imagePath}`)
    .gravity('Center')
    .crop(300,300)
    .write('./Pictures/NewPfp.png', function (err) {
        if (err) console.log(err)
        else {
            //Then this resizes it to 200x200 (ignoring aspect ratio)
            //This shouldn't matter too much for quality if the image
            //is larger than 300x300, or has same height/width, else
            //if its something weird like 150x50, it'll be stretched.
            gm('./Pictures/NewPfp.png')
            .resize(200,200,"!")
            .write('./Pictures/NewPfp.png', function (err) {
                //I don't know if all the parts can be
                //combined, but this then takes wherever the previous
                //image was saved, crops it into a circle using
                //the mask.png provided with this code, and saves over
                //it.
                gm('./Pictures/NewPfp.png')
                .gravity('Center')
                .compose('CopyOpacity')
                .composite(`./mask.png`)
                .alpha("Copy")
                .write('./Pictures/NewPfp.png', function (err) {
                    if (err) console.log(err)
                })
            })
        }
    });
}
//I guess uncomment that line below and put in a filepath to an image
//to test it for now? It saves over the newpfp image in there for now, in any case.
//imageToPfp("filePath")