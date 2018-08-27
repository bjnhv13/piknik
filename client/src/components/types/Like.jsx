import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import MoodIcon from '@material-ui/icons/Mood';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const style = {
	button : {margin: "5vw"},
	bottonsWrap: {margin: "auto", display:"table", padding: "2vw"},
}

export default class LikeType extends Component {
	
	chooseLikeIcon() {
		return ( this.props.type === "like" ? <ThumbUpIcon /> : <MoodIcon /> );
	};

	chooseDislikeIcon() {
		return ( this.props.type === "like" ? <ThumbDownIcon /> : <MoodBadIcon /> );
	};

	render() {
		return (
			<div style={style.bottonsWrap}>
				<Tooltip TransitionComponent={Zoom} placement="top" title="bad" enterTouchDelay={100} leaveTouchDelay={500}>
					<Button style={style.button} variant="fab" color="secondary" onClick={() => this.props.handleClick(false)}>
						{this.chooseDislikeIcon()}
					</Button>
				</Tooltip>
				<Tooltip TransitionComponent={Zoom} placement="top" title="good" enterTouchDelay={100} leaveTouchDelay={500}>
					<Button style={style.button} variant="fab" color="primary" onClick={() => this.props.handleClick(true)}>
						{this.chooseLikeIcon()}
					</Button>
				</Tooltip>
			</div>
		)
	}
}
