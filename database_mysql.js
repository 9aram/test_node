var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '931028',
  database : 'o2'
});
conn.connect();
/*
var sql = 'SELECT * FROM topic';
conn.query(sql, function (err, rows, fields) { //sql문을 서버로 전송하면, 서버가 작업 처리 후, 그 작업에 대한 처리가 끝나면 노드제이에스로 응답을 해준다. 그럼 mysql모듈이 이 익명함수를 모든 작업이 끝난후 호출한다.
  if (err){
    console.log(err);
  }else{
    for(var i=0; i<rows.length; i++){
      console.log(rows[i].title);
    }
  }
});
*/
/*
var sql = 'insert into topic (title, description, author) values(?, ?, ?)';
var params =['Supervisor', 'Watcher', 'graphittie'];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows.insertId);
  }
});
conn.end();

업데이트
var sql = 'update topic set title=?, author=? where id=?';
var params =['NPM', 'leezche', '1'];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
});
conn.end();
*/
var sql = 'delete from topic where id=?';
var params =[1];
conn.query(sql, params, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
});
conn.end();
