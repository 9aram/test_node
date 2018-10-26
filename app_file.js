var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');
app.get('/topic/new', function(req, res){
  fs.readdir('data',function(err, files){ //정보를 가져오고 싶은 디렉토리경로와 그정보를 가져왔을때 호출 될 콜백함수.. files 는 파일들의 목록을 가지고 있는 배열
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
  });

});
app.get(['/topic','/topic/:id' ], function(req, res){
  fs.readdir('data',function(err, files){ //정보를 가져오고 싶은 디렉토리경로와 그정보를 가져왔을때 호출 될 콜백함수.. files 는 파일들의 목록을 가지고 있는 배열
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id){
      //id값이 있을 때
    fs.readFile('data/'+id, 'utf8', function(err, data){
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      }
    res.render('view', {topics: files, title:id, description: data}) ;
  //      res.send(data);
})
}
else{
    res.render('view',{topics:files, title:'Welcome', description:'Hello, JavaScript for server.'});//topics라는 이름으로 files를 전달.
}
  })
});
// app.get('/topic/:id', function(req, res){
//   var id = req.params.id;
//   fs.readdir('data',function(err, files){ //정보를 가져오고 싶은 디렉토리경로와 그정보를 가져왔을때 호출 될 콜백함수.. files 는 파일들의 목록을 가지고 있는 배열
//     if(err){
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     }
//     fs.readFile('data/'+id, 'utf8', function(err, data){
//       if(err){
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//       }
//     res.render('view', {topics: files, title:id, description: data}) ;
//   //      res.send(data);
//     });
//   });
// });

app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
        consoloe.log(err);
        res.status(500).send('Internal Server Error'); // 오류가 발생 사용자에게 에러 메세지를 띄우고 이 send 가 실행시 밑의 send 는 실행되지 않는다.
    }
    res.redirect('/topic/'+ title)
  //  res.send('Success!'+req.body.title); //이 콜백 함수가 실행된 뒤에 response 할 수 있기 떄문에.
  })
});



app.listen(3000, function(){
  console.log('Connected, 3000 port!');
});





//페이지 나눈 예시
// app.get('/topic/:id', function(req, res){
//   var id = req.params.id;
//
//     fs.readFile('data/'+id, 'utf8', function(err, data){
//       if(err){
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//       }
//     res.render('view2', { title:id, description: data}) ;
//   //      res.send(data);
//     });
//
// });
