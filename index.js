const { error } = require('protractor');

let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    multer  = require('multer'),
    fs = require('fs'),
    dataBaseConfig = require('./database/db'),
    usersModel = require('./models/User'),
    messagesModel = require('./models/Message'),
    createError= require('createerror');
    
    
    
 

//connection mongo db

mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() =>{
    console.log('Database connected successsfully')
},
    error => {
        console.log('Could not connected to database:' + error)
    }
) 

const roomRoute = require('./routes/room.route')
const messageRoute = require('./routes/message.route');
const { Socket } = require('socket.io-client');
const { Buffer } = require('buffer');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io') (http);
const SocketIOFile = require('socket.io-file');
const { json } = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//file upload
// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// var upload = multer({ storage: storage });


app.get('/', (req, res) =>{ 
    res.send('port running on: 3000')
})


//api root
app.use('/api/rooms', roomRoute)
app.use('/api/messages', messageRoute)

//Port
const port = process.env.PORT || 3000;
http.listen(port, () =>{
    console.log('PORT connected on:' + port)
})

//find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});

//find 404 and hand over to error handler
app.use((req, res, next) => {
    next(createError(404));
});

//error handler
app.use(function (err, req, res, next) {
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});

app.use(function (err, req, res) {
    if(err){
        res.emit(err)
    }else{
        res.json(data)
    }
});


//socket connection

io.on('connection', (Socket) =>{
    console.log('a user connected');
    Socket.on('set-nickname',async (data)=>{
        let user = await usersModel.findOne({nickname: data.nickname});
        if (!user) {
             user = await usersModel.create({nickname: data.nickname, clientId: Socket.id});
        }else{    
        console.log(user);
        }
    })
    Socket.on('enter-chat-room',async (data)=>{
        let user = await usersModel.findOne({nickname: data.nickname});
        if (!user) {
          user = await usersModel.create({nickname: data.nickname, clientId: Socket.id});
        } else {
          user.clientId = Socket.id;
          user = await usersModel.findByIdAndUpdate(user._id, user, {new: true});
        }
        console.log(data.roomId);
        Socket.join(data.roomId).broadcast.to(data.roomId)
          .emit('users-changed', {user: user.nickname, event: 'joined'});

        console.log(`chatroom details${data.roomId}&${data.nickname}`);
    })

    Socket.on('leave-chat-room', async (data)=>{
        const user = await usersModel.findOne({nickname: data.nickname});
    Socket.broadcast.to(data.roomId).emit('users-changed', {user: user.nickname, event: 'left'}); // <3>
    Socket.leave(data.roomId);
    console.log('leave the room' + data.nickname);
    })

    Socket.on('add-message', async (message)=>{
    message.owner = await usersModel.findOne({clientId: Socket.id});
    message.created = new Date();
    message = await messagesModel.create(message);
    console.log(message);
    Socket.server.in(message.room).emit('message', message);
    })

    // var uploader = new SocketIOFile(Socket, {
    //     // uploadDir: {			// multiple directories
    //     // 	music: 'data/music',
    //     // 	document: 'data/document'
    //     // },
    //     uploadDir: 'data',							// simple directory
    //     accepts: 'data.type',		                // chrome and some of browsers checking mp3 as 'audio/mp3', not 'audio/mpeg'
    //     maxFileSize: 4194304, 						// 4 MB. default is undefined(no limit)
    //     chunkSize: 10240,							// default is 10240(1KB)
    //     transmissionDelay: 0,						// delay of each transmission, higher value saves more cpu resources, lower upload speed. default is 0(no delay)
    //     overwrite: true 							// overwrite file if exists, default is true.
    // });

    Socket.on('upload', async (message)=>{
        message.owner = await usersModel.findOne({clientId: Socket.id});
        message.created = new Date();
        console.log(message);
        message = await messagesModel.create(message);
        console.log(message);
        Socket.server.in(message.room).emit('message', message);
    //     upload.array(message, 100);
    //     message.owner = await usersModel.findOne({clientId: Socket.id});
    //     message.created = new Date();
    //     var room = message.room;
    //     var obj = {
    //         fileName: message.name,
    //         fileType: message.type,
    //         fileSize: message.size,
    //         file: message.data,
    //         owner: message.owner,
    //         room: message.room
    //     }
    //  message = await messagesModel.create(obj, (err, item)=>{
    //      if(err) {
    //          console.log(err);
    //      }
    //      else {
    //          console.log('file upload successfuly');
    //          console.log(item);
    //      }
    //  })  
        // message = await messagesModel.create({fileName: message.name, fileType: message.type, fileSize: message.size, file: message.data, owner: message.owner, room: message.room_id});
        // console.log(message.data);
        // message = json(message);
        // message = new Buffer(message).toString
        // Socket.server.in(room).emit('download', message)
        //  {
        //     name: message.fileName,
        //     type: message.fileType,
        //     data: message.file,
        //     owner: message.owner
        //   })
    })
})
