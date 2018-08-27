import React, { Component } from 'react';
import Slider from '@material-ui/lab/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

const style = {
	slider: {width: "70vw"}
}

export default class SliderType extends Component {
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
			<Tooltip TransitionComponent={Zoom} title={value} enterTouchDelay={100} leaveTouchDelay={500}>
				<Slider style={style.slider} value={value} min={0} max={10	} step={1} onChange={this.handleChange} onDragEnd={this.handleChangeComplete} />
			</Tooltip>
		)
	}
}
