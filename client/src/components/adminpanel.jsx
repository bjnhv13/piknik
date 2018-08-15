import React, { Component, Fragment } from 'react';
import Select from './select';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AdminPanel extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			selections: [],
			dialogOpen: false,
			dialogType: "submit"
		};
		this.renderSelection = this.renderSelection.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSubmitAll = this.handleSubmitAll.bind(this);
		this.handleClickOption = this.handleClickOption.bind(this);
	};

	handleClickOption = function(index, newData) {
		this.setState(prevState => {
			 const [ ...selections ] = prevState.selections
				selections[index].selected = newData;
				return {selections}
    });
	}

	sendAnswerData = (answerData) => {
		console.log("sending answer data");
		console.log(answerData)
		fetch('/api/admin', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(answerData)
		})
	}

	handleSubmitAll() {
		const {selections} = this.state;
		selections.forEach( (selection) => { 
			selection.selected = [];
			selection.options.forEach( (element) => selection.selected.push(element.value) );
		})
		this.handleSubmit();
}

	handleSubmit() {
		const {selections} = this.state;
		if ( selections.some((element) => Object.keys(element.selected).length === 0) ) {
		this.setState({dialogOpen: true, dialogType: "error"});
		} else {
			let submitData = {userId: this.props.userId}
			selections.forEach( (selection) => submitData[selection.label] = selection.selected )
			this.sendAnswerData(submitData);
			this.setState({dialogOpen: true, dialogType: "submit"});
		}
		this.timeout = setTimeout(this.closeDialog.bind(this), 4000);
	}

	getAdminData = () => {
		this.callApi()
			.then(res => {
				const keys = Object.keys(res);
				const newData = keys.map( (key) => {
					return { 
						"label": key,
						"placeholder": "please enter value",
						"selected": {},
						"options": res[key].map( (val) => { return { value: val} } )
					}
				});
				this.setState({selections: newData})
			}
			 )
			.catch(err => console.log(err));
	}

	componentDidMount() {
		this.getAdminData()
	};
	
	componentWillUnmount() {
		if (this.timeout) {clearTimeout(this.timeout)}
	};

	callApi = async () => {
		const response = await fetch('/api/admin');
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	};

renderSelection (selection, index ) {
	return(
		<Select
		key={index}
		index={index}
		label={selection.label}
		placeholder={selection.placeholder}
		options={selection.options}
		handlechange={this.handleClickOption}
		multiple
		/>
	)
}
	closeDialog = () => {
   this.setState({ dialogOpen: false });
 };
	renderSelections() {
		const { selections } = this.state
		return selections.map( this.renderSelection)
	}

	render() {
		return (
		<Fragment>
			<h1>Admin Panel</h1>
			<div>{this.renderSelections()}</div>
			<Button color="secondary" style={{margin: 10}} onClick={this.handleSubmit}>SUBMIT</Button>
			<Button color="secondary" style={{margin: 10}} onClick={this.handleSubmitAll}>SUBMIT ALL</Button>
			<Dialog
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
        >
          <DialogTitle>{this.state.dialogType === "submit" ? "Data Submitted!" : "error!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.dialogType === "submit" ? "your profile will updated soon." : "enter at least one item in each field!"}
            </DialogContentText>
          </DialogContent>
        </Dialog>
		</Fragment>
			
		);
	}

}

export default AdminPanel;