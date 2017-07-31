import React, { Component } from 'react';
import {Button, ControlLabel, FormControl} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as homeActions from '../actions/home';
import Video from '../components/video';
import {playlist} from '../constants/playlist';
import events from 'events'


 class Home extends Component{
    constructor(props) {
        super(props);
        this.emitter= new events.EventEmitter();
    }

    componentDidMount=()=>{
        this.emitter.on('navigation',this.goToVideo);
        //can be used to customize the component based on type
        let {type,home}=this.props
        let {videoIndex}=home;
        //cutomizations
        //handeling proper initial render according to url
        switch(type){
            case 'youtube':{
                if(videoIndex>0 && videoIndex<3)this.goToVideo(3);
                else if(videoIndex>3)this.goToVideo(0);
                break;
            }
            case 'vimeo':{
                if(videoIndex>1 && videoIndex<4)this.goToVideo(4);
                else if(videoIndex>4 || videoIndex<1)this.goToVideo(1);
                break;
            }
            case 'soundcloud':{
                if(videoIndex>2 && videoIndex<5)this.goToVideo(5);
                else if(videoIndex<2)this.goToVideo(2);
                break;
            }
            default:{break;}
        }
    }
    componentWillUnmount=()=>{
        this.emitter.removeListener('navigation', this.goToVideo);
    }

    goToVideo= (index)=> {
        let videoIndex = index;
        if (videoIndex < 0) {
        videoIndex = playlist.length - 1;
        } else if (videoIndex >= playlist.length) {
        videoIndex = 0;
    }
        this.props.history.push(playlist[videoIndex].service)
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
                    <span className="previous-button" onClick={()=>{this.emitter.emit('navigation',videoIndex-1)}}>                    
                    &lt;
                    </ span>
                    <span><Video className="video-block" service={service} video={video} width={500} height={270} /></span>
                     <span className="next-button" onClick={()=>{this.emitter.emit('navigation',videoIndex+1)}}>
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
