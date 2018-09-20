let express=require('express');
let _=require('lodash');
let bodyParser = require('body-parser');
let session = require('express-session');
let app=express();

app.use(session({
	resave:true,
	secret:'zfpx',
	saveUninitialized:true
}));
app.use(bodyParser.json());
app.use(function (req,res,next) {
	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Origin','http://localhost:8080');
	res.header('Access-Control-Allow-Headers','Content-Type,Accept');
	res.header('Access-Control-Allow-Credentials','true');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});
app.listen(3000);
let sliders=require('./mock/sliders');
app.get('/sliders',function (req,res) {
	res.json(sliders);
});
let lessons=require('./mock/lessons');
app.get('/lessons/:type',function (req,res) {
	setTimeout(function () {
		let type=req.params.type;
		let {offset,limit}=req.query;
		offset=isNaN(offset)? 0:parseInt(offset);
		limit=isNaN(limit)? 5:parseInt(limit);
		let data=_.cloneDeep(lessons);
		if (type!='all') {
			data=data.filter(lesson=>lesson.type==type);
		}
		let list=data.slice(offset,offset+limit);
		list.forEach(item => {
			item.title=item.title+Math.random();
		});
		let hasMore=offset+limit<data.length;
		res.json({
			hasMore,
			list
		});
	},500);
	
});
let users = [];
//users=[{username:'zfpx',password:'123'}]
app.post('/api/reg',function(req,res){
	let user = req.body;//取得请求体
	let oldUser = users.find(item=>item.username == user.username);
	if(oldUser){
	  //两种异常 1.服务异常 2.业务异常
	  res.json({code:1,error:'用户名重复'});//如果失败有一个error
	}else{
	  users.push(user);
	  // code=0表示一切正常成功，非0表示失败
	  res.json({code:0,success:'注册成功',user});//如果成功有一个success
	}
  });
  app.post('/api/login',function(req,res){
	 let user = req.body;//取得登录的请求体
	 let oldUser = users.find(item=>item.username==user.username&&item.password==user.password);
	 if(oldUser){
	   //如果找到了用户名和密码相同的用户，表示登录成功,把用户存放入session中
	   req.session.user = oldUser;
	   res.json({code:0,success:"登录成功",user});
	 }else{
	   res.json({code:1,error:'用户名或密码错误'});
	 }
  });
  app.get('/api/logout',function(req,res){
	 req.session.user = null;
	 res.json({code:0,success:'退出成功'});
  });
  //验证用户是否登录
  app.get('/api/validate',function(req,res){
	 if(req.session.user){
	   res.json({code:0,user:req.session.user});
	 }else{
	   res.json({code:1,error:'此用户未登录'});
	 }
  });