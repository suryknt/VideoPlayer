import React, { Component } from 'react';
import Home from './home';

export default class SoundcloudHome extends Component{
	constructor(props){
		super();
	}

	render=()=>{
		return <Home type="soundcloud" history={this.props.history}  />;
	}
}