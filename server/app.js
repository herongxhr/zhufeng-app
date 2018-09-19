let express=require('express');
let _=require('lodash');
let app=express();
app.use(function (req,res,next) {
	res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Origin','http://localhost:8080');
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
	let type=req.params.type;
	let {offset,limit}=req.query;
	offset=isNaN(offset)? 1:parseInt(offset);
	limit=isNaN(limit)? 5:parseInt(limit);
	let data=_.cloneDeep(lessons);
	if (type!='all') {
		data=data.filter(lesson=>lesson.type==type);
	}
	let list=data.slice(offset,offset+limit);
	let hasMore=offset+limit<data.length;
	res.json({
		hasMore,
		list
	});
});