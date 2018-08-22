import React, { Component } from 'react';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import MoodIcon from '@material-ui/icons/Mood';

const style = {
	button : {margin: "2vw"},
	bottonsWrap: {margin: "auto", display:"table", padding: "2vw"},
	slider: {width: "70vw"}
}

class LikeType extends Component {
	
	chooseLikeIcon() {
		return ( this.props.type === "like" ? <ThumbUpIcon /> : <MoodIcon /> );
	};

	chooseDislikeIcon() {
		return ( this.props.type === "like" ? <ThumbDownIcon /> : <MoodBadIcon /> );
	};

	render() {
		return (
			<div style={style.bottonsWrap}>
				<Button style={style.button} variant="fab" color="primary" onClick={() => this.props.handleClick(true)}>
				{this.chooseLikeIcon()}
				</Button>
				<Button style={style.button} variant="fab" color="secondary" onClick={() => this.props.handleClick(false)}>
					{this.chooseDislikeIcon()}
				</Button>
			</div>
		)
	}
}

class SliderType extends Component {
	constructor (props) {
		super(props)
		this.state = {
			value: 5
		}
	}

	handleChange = (event, value) => {
		this.setState({
			value: value
		})
	};

	handleChangeComplete = () => {
		this.props.handleClick(this.state.value)
		this.setState({
			value: 5
		})
	};

	render () {
		const { value } = this.state
		return (
			<Slider style={style.slider} value={value} min={0} max={10	} step={1} onChange={this.handleChange} onDragEnd={this.handleChangeComplete} />
		)
	}
}

export { SliderType, LikeType };
