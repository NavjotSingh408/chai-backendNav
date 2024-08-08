import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log("Req files in multer")
      // console.log(req);
      
      
      cb(null, './pulic/temp')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  console.log("Storage :");
  console.log(storage);
  
 export const upload = multer({
   storage,
 })