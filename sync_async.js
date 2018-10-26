var fs = require('fs');
//동기
console.log(1);
var data = fs.readFileSync('data.txt', {encoding:'utf8'});
console.log(data);
//비동기
console.log(2);
fs.readFile('data.ext',{encoding:'utf8'},function(err,data){
  console.log(data);
});
