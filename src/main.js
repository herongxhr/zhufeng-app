import React,{Component} from 'react';
import {render} from 'react-dom';
import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import App from './containers/App';
import Home from './containers/Home';
import Lesson from './containers/Lesson';
import Profile from './containers/Profile';
render(<Router>
	<Switch>
		<App>
			<Route exact path="/" component={Home} />
			<Route path="/lesson" component={Lesson}/>
			<Route path="/profile" component={Profile}/>
		</App>
	</Switch>
</Router>,document.querySelector('#root'));