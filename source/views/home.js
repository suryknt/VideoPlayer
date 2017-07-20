import React, { Component } from 'react';
import {Button, ControlLabel, FormControl} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from '../actions/home';
import Video from '../components/video';
import {playlist} from '../constants/playlist';


 class Home extends Component{
    constructor(props) {
        super(props);
    }

    goToVideo= (index)=> {
        let videoIndex = index;
        if (videoIndex < 0) {
        videoIndex = playlist.length - 1;
        } else if (videoIndex >= playlist.length) {
        videoIndex = 0;
    }
        this.props.actions.setVideoIndex(videoIndex);
    }
    render=()=>{
        let {home}=this.props;
        let {videoIndex}=home;

        const {service, video} = playlist[videoIndex];

        return <div>
                <h3 className="title" >Awesome video Player!</h3>
                <div>
                    <div className="video-content">
                    <span className="previous-button" onClick={()=>{this.goToVideo(videoIndex - 1 )}}>
                    &lt;
                    </ span>
                    <span><Video className="video-block" service={service} video={video} width={500} height={270} /></span>
                     <span className="next-button" onClick={()=>{this.goToVideo(videoIndex + 1)}}>
                    &gt;
                    </span>
                    </div>
                    <p>
                    <div className="now-playing">Now Playing :</div>
                    <div className="video-des">Source: {service} </div>
                    <div className="video-des">URL: {video}</div>
                    </p>
                    
                   
                </div>
               </div>
    }
}


function mapStateToProps(state) {
	const { home } = state;
	return {
		home
	};
}

function mapDispatchToProps(dispatch) {
	const actions = Object.assign(homeActions);
	return {
		actions: bindActionCreators(actions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
