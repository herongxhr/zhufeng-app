import React,{Component,Fragment} from 'react';
import Tab from '../components/Tab';
import '../common/index.less'
import  {Provider} from 'react-redux';
import store from '../store';
export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Fragment>
				  {this.props.children}
				  <Tab/>
				</Fragment>
			</Provider>
		);
	}
}