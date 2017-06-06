var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');
var rfs = require('rotating-file-stream');

app.use(cors());
app.enable("jsonp callback");   //jsonp 지원
var logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = rfs('access.log', {
  interval: '1d', // 매일 매일 로그 파일 생성
  path: logDirectory
})
app.use(morgan('combined', {stream: accessLogStream}))


app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var server = app.listen(80, function() {
    console.log("연락처 서비스가 80번 포트에서 시작되었습니다!");
});

var router = require('./routes')(app);
