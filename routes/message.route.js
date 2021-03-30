var express = require('express');
const { ObjectID } = require('mongodb');
var router = express.Router();
var mongoose = require('mongoose');
var Chat = require('../models/Message');
const multer = require("multer");
const fs = require("fs");

var file = '1611227538082_resume.png';
router.use('/uploads',express.static('./uploads/'));
// router.get('/uploads', (req, res) => {
//   console.log(req);
//   res.download('./uploads/'+ file)
// });
 console.log(__dirname);
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`)
  }
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
});
 
var upload = multer({ storage: storage }).single('file');

router.post('/uploads', (req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.json({ err })
    }
    return res.json(res.req.file.filename);
  })
});

/* GET ALL CHATS */
router.get('/:id', function(req, res, next) {
 console.log(req.params.id);
  Chat.find({room: req.params.id}).populate('owner').exec(function(err, data){
    if (err) return next(err);
    res.json(data);
  });
});



/* GET SINGLE CHAT BY ID */
// router.get('/uploads/:id', function(req, res, next) {
//   res.download(__dirname , express.static('../uploads/1611227538082_resume.png'), 'file.png');
// });


// /* SAVE CHAT */
// router.post('/', function(req, res, next) {
//   Chat.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* UPDATE CHAT */
// router.put('/:id', function(req, res, next) {
//   Chat.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* DELETE CHAT */
// router.delete('/:id', function(req, res, next) {
//   Chat.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;