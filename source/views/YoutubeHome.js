import React, { Component } from 'react';
import Home from './home';

export default class YoutubeHome extends Component{
	constructor(props){
		super();
	}

	render=()=>{
		return <Home type="youtube" history={this.props.history}  />;
	}
}