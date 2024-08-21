
const cloudinary = require("cloudinary")

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // 'dwkj6erti',
    api_key: process.env.CLOUDINARY_API_KEY, //'467219697479226',
    api_secret: process.env.CLOUDINARY_API_SECRET //'N8SXDJbxLfx8G2-Ed_Q5C6K0Tmo'
    
});

exports.createImage = async (req,res)=>{
    try{
        const result =await cloudinary.uploader.upload(req.body.image, {
            public_id: Date.now(),
            resource_type:"auto",
        })
        res.send(result)
    } catch(err){
        
        console.log(err)
        res.status(500).send("Upload Error!!!")
    }
    
}

exports.removeImage = async (req,res)=>{
    try{
        let image_id=req.body.plubic_id
        cloudinary.uploader.destroy(image_id,(result)=>{
            res.send(result)
        })
    } catch(err){
        console.log(err)
        res.status(500).send("Remove Error!!!")
    }
        
}
    

