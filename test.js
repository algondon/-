// function a(){
//   y=function(){
//     x=3;
//   };
//   return function(){
//     var x=2;
//     y();
//     console.log(this.x)
//   }.apply(this,arguments);
// }
// a();

// function getA(){
//   console.log(this.a);
// }
// var obj = {
//   a:3
// };
// getA.apply(obj);
// var arr = [6,2,3,5,7,9,0,10,11,20];
// console.log(arr.sort());

// function fac(n){
//   if(n===0)
//       return 1;
//   else {
//     return n*fac(n-1);
//   }
// }
// console.log(fac(5));

// var s = /[ABCD]2,3[a-z0-9]+/;
// console.log(s.test('BC'));
// console.log(s.test('CD1'));
// console.log(s.test('CCab'));
// console.log(s.test('BA2,3abc'));


// var s = '<a href="{href}">{text}{}</a>';
// var t = /\{([^\}]*)\}/g;
// var q={
//   href:'www.baidu.com',
//   text:'淘宝网'
// }
// console.log(s.match(t));
// console.log(s.replace(t,function($0,$1){
//   console.log(($1 in q)?q[$1]:'');
//   var temp = ($1 in q)?q[$1]:'';
//   return '{'+(($1 in q)?q[$1]:$1)+'}';
// }));

// var name = 'xiaohuan';
// function f3(){
//   console.log(this.name);
// }
// function f2(){
//   console.log(this.name);
// }
// var a = {
//   name:'xiaobo',
// };
// function f1(){
//   console.log(this.name);
//   (function f2(){
//     console.log(this.name);
//     (function f3(){
//       console.log(this.name);
//     })();
//   })();
// }
// f1();
function testfinally(){
	try{
		return x;
	}catch(err){
		return 0;
	}finally{
		console.log(1);
		// return 2;
	}
}
console.log(testfinally());

function testcreate(){
	var person = {
		name:'xiaobo',
		age:'24'
	};
	var newperson = Object.create(person);
	console.log(newperson.name);
	console.log(newperson.age);
	console.log(newperson);
	console.log(person);
}
testcreate();