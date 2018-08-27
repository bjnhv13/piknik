import React, { Component, Fragment } from 'react';
import Stars from './types/Stars';
import Words from './types/Words';
import LikeType from './types/Like';
import SliderType from './types/Slider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const style = {
	optionsWrap: {margin: "auto", display: "table", padding: "1vw"}

}

function Option(props) {
			let option = null;
			switch(props.type){
								case "like":
								case "mood":
												option = <LikeType type={props.type} handleClick={props.handleClick} />
												break;
								case "slider":
												option = <SliderType handleClick={props.handleClick} />
												break;
								case "stars 5":
								case "stars 3": 
								case "numbers 5": 
								case "numbers 10": 
												const num = + props.type.split(" ")[1];
												const method = props.type.split(" ")[0];
												option = <Stars method={method} max={num}  handleChange={props.handleClick} />
												break;
								case "words":
												option = <Words value={props.value} handleClick={props.handleClick} />
												break;
								default:
												option = <div>no such type as <b>"{props.type}"</b>, please contact PIKNIK support</div>
												break;

						}
	return ( !props.hideOption && <div style={style.optionsWrap}>{option}</div> );
}

class Review extends Component {

	constructor(props) {
		super(props);
		this.state = {
			apiData: {},
			title:"",
			value: "",
			dialogOpen: false,
			hideOption: true
		}
	};


	sendAnswerData = (answerData) => {
		console.log("sending answer data");
		console.log(answerData)
		fetch('/api/feedback', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(answerData)
		})
	}

	getNextQuestion = async () => {
		this.callApi()
			.then(res => {
				if (res.error) {
					this.setState({ title: <span className="red">{res.error}</span> })
				} else {
					this.setState({ apiData: res, title: res.template + ' ' + res.title + '?', hideOption: false });
			}})
			.catch(err => console.log(err));
	};

	componentDidMount() {
		this.getNextQuestion().then( this.setState({  }) )
	};

	callApi = async () => {
		const response = await fetch('/api/review?id='+ this.props.userId);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	};

	submitAnswer(answer) {
		this.setState({	value: answer, dialogOpen: true });
		this.timeoutSubmit = setTimeout(this.closeDialog.bind(this), 5000);
		const { apiData } = this.state;
		const answerData = {
				userId: this.props.userId,
				title: apiData.title,
				template: apiData.template,
				type: apiData.type,
				value: answer
		}
		this.sendAnswerData(answerData);
		this.getNextQuestion();
	};

	closeDialog = () => {
		this.setState({ dialogOpen: false });
	};

	componentWillUnmount() {
		if (this.timeoutSubmit) {clearTimeout(this.timeoutSubmit)}
	};

	render() {
		const { apiData, title, value, hideOption } = this.state
		return (
			<Fragment>
				<Typography align="center" variant="display2" style={{ fontSize: "5vw",padding: "1vw"}}>
					{title}
				</Typography>
				<Option hideOption={hideOption} value={value} type={apiData.type} handleClick={answer => this.submitAnswer(answer)} />
				 <Dialog
					open={this.state.dialogOpen}
					onClose={this.closeDialog}
				>
					<DialogTitle>{"Thank You!"}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							We hope that you enjoyed here.
						</DialogContentText>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
};

export default Review;