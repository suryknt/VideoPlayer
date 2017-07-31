import React, { Component } from 'react';
import Home from './home';

export default class VimeoHome extends Component{
	constructor(props){
		super();
	}

	render=()=>{
		return <Home type="vimeo" history={this.props.history} />;
	}
}