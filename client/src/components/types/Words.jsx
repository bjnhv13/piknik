import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import SvgIcon from '@material-ui/core/SvgIcon';


function SendIcon(props) {
  return (
		<SvgIcon {...props}>
		    <path fill="#000000" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
		</SvgIcon>
	)
}

export default class Words extends Component {
	constructor (props, context) {
		super(props, context)
		this.state = {
			value: ""
		}
	}

	 handleChange = event => {
    this.setState({
      value: event.target.value,
    });
  };
	
	render () {
		return (
			<div>
				<TextField
						style={{width: "60vw", margin: "3vw"}}
						autoFocus
						margin="dense"
						label="please enswer in few words"
						placeholder="enter your answer here..."
						value={this.props.answer}
						onChange={this.handleChange}
						type="text"
						multiline
						rowsMax="3"
					/>
					<Button 
						variant="contained"
						mini
						onClick={() => this.props.handleClick(this.state.value)}
						style={{ display: "flex", margin: "auto" }}
    >
					<span>Send</span>
					<Icon><SendIcon/></Icon>
				</Button>
			</div>
		)
	}
}