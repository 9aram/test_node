var express = require('express');//express 모듈을 가져와 사용. 모듈은 함수.
var bodyParser = require('body-parser');
var app = express();//exress()는 applicationd이라는 객체를 리턴하고
app.locals.pretty = true;
app.set('view engine', 'jade');//jade 템플린엔진과  express를 연결하는 코드
app.set('views', './views'); // views에 해당하는 디렉토리
app.use(express.static('public'));// 정적인 파일이 위치할 디렉토리를 지정하는 기.
app.use(bodyParser.urlencoded({ extended: false})); //app에 모듈을 붙인다, 앞으로 이 애플리케이션에 들어오는 모든 요청들 bodyParser라는 확장기능(미들웨어)를 먼저 통과한 다음에 라우트가 동작하게된다.
app.get('/form', function(req, res){
  res.render('form');
});
app.get('/form_receiver', function(req, res){
  var title= req.query.title;
  var description = req.query.description;
  res.send(title + ',' + description);
});
app.post('/form_receiver', function(req, res){
  var title = req.body.title; //form 으로 전송될때 name의 값으로 전달된 데이터의 이름이 body객체의 프로퍼티로 들오기 떄문에 form 이름을 통해 사용자가 전송한 데이터를 받을 수 있따.
  var description = req.body.description;
  res.send(title +','+description);
});

app.get('/topic/:id', function(req, res){ //express가 익명함스를 호출하는/
  var topics = [
    'Javascript is...',
    'Node.js is...',
    'Express is...'
  ]; //쿼리스트링은 auery로 접근하고 시멘틱 rul은 param으로 접근한다.
  var output = `
    <a href="/topic/1">Javascript</a><br>
    <a href="/topic/2">Node</a><br>
    <a href="/topic/3">Express</a><br>  <br>
    ${topics[req.params.id]}
    `;
  res.send();//req객체가 가지고있는 query라는 객체의 id란 프로퍼티를 통해서 사용자가 쿼리스트링으로 접속할때 전달한 정보를 사용할 수 있다.
});
app.get('/template', function(req, res){ // /template로 들어온 사람들에게 temp라는 템플릿 파일을 호출해서 렌더링 한 결과를 사용자에게 응답한다(res). temp는 temp.jade 이렇게 위치해야 한다. jade형식으로
  res.render('temp', {time: Date(), _title:'Jade'}); //res(응답)으로 temp를 render하게 되면 express는 내부적으로 views에 해당하는 디렉토리에서 템플릿 엔진으로 jade를 지정해 놨기 때문 jade의 확장자인 .jade파일을 찾아 그 템플릿파일을 제이드문법에 때라 해석한 후에 사용자에게 response한다.
});
app.get('/', function(req, res){ //사용자가 url로 접속하는 것은 갯방식으로 접속하는것이기 때문 갯방식으로 접속한 사용자를 받기위해서 get메소드 호출.
  //사용자가 홈으로 접속했을때 두번쨰 인자로 전달한 함수가 실행됨
  res.send('Hello home page');
});
app.get('/dynamic',function(req, res){
  var lis = '';
  var time = Date();
  for(var i=0; i<5; i++){
    lis = lis + '<li>coding</li>';
  }
  var output = `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello Dynamic.!! 동적인 파일은 저장후 새로고침 하면 바로 반영시킬 수 없다. 노드를 껐따 켜야함
      <ul>
        ${lis}
      </ul>
      ${time}
    </body>
  </html>
`;
  res.send(output);
});
app.get('/route',function(req, res){
  res.send('Hello Router, <img src="/Tulips.jpg">');
});
app.get('/login', function(req, res){ //사용자가 어떠한 경로로 들어왔을 어떤 것이 실행될 것인가 라고 하는것을 결정하는 get 메소드 == 라우터. get이 하는일을 라우팅이라. 어떤 요청이 들어왔을때 그 요청이 길을 찾을 수 있게 하는것.
  res.send('login plz');
});
app.listen(3000, function(){
console.log('Connected 3000 port!'); //3000포트를 바라보게 되면 이 펑션이 실행됨.
});
