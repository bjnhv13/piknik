import React, { Component } from 'react';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import Button from '@material-ui/core/Button';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import MoodIcon from '@material-ui/icons/Mood';

const style = {
	button : {margin: 20},
	bottonsWrap: {margin: "auto", width: "fit-content", padding: 20}

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
	constructor (props, context) {
		super(props, context)
		this.state = {
			value: 5
		}
	}

	handleChangeStart = () => {
		console.log('Change event started')
	};

	handleChange = value => {
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
			<div className='slider'>
			<span>{this.props.lowValue}</span>
				<Slider
					min={0}
					max={10}
					value={value}
					onChangeStart={this.handleChangeStart}
					onChange={this.handleChange}
					onChangeComplete={this.handleChangeComplete}
				/>
				<span>{this.props.highValue}</span>
				<div className='sliderValue'>{value}</div>
			</div>
		)
	}
}

export { SliderType, LikeType };
