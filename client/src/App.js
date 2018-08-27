import React ,{ Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Review from './components/review';
import Navbar from './components/navbar';
import SecretNavbar from './components/secretnavbar';
import AdminPanel from './components/adminpanel';
import Paper from '@material-ui/core/Paper';

const USER_ID = '111';
const defaultSecret = [true, false, false];

const style = {
	backgroundImage: "linear-gradient(to top, #0dc2aa, #55d0bb, #7dddcc, #a0ebdd, #c1f8ee)",
	position: "fixed",
		height: "99vh",
		width: "99vw",
		top: 0,
		left: "0.5vw",
}

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			showNav: false,
			secret: defaultSecret
		}
		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.handleSecret = this.handleSecret.bind(this);

	};

	componentDidMount(){
			document.getElementById('lds-ring').outerHTML = ''
	}

	toggleNavbar() {
			this.setState(prevState => ({
			showNav: !prevState.showNav,
		}));
	};

	handleSecret( i ) {
		if ( i <= 2 ) {
			this.setState( prevState => {
				const [ ...secret ] = prevState.secret
				secret[ i + 1 ] = true;
				return { secret }
			});
		} else {
			this.setState( {secret: defaultSecret} )
			this.toggleNavbar();
		}

	};

	renderNavbar() {
		return this.state.showNav ? <Navbar handleShowNav={this.toggleNavbar}/> : <SecretNavbar secret={this.state.secret} handleSecret={this.handleSecret}/>;
	}

	render () {
		return (
		<Paper style={style}>
			{ this.renderNavbar() }
			<div className="container-center">
				<Switch>
					<Route exact path='/' render={(props) => <Review userId={USER_ID} {...props} /> }/>
					<Route path='/AdminPanel' render={(props) => <AdminPanel userId={USER_ID} {...props} /> }/>
					<Route render={(props) => <Review userId={USER_ID} {...props} /> }/>
				</Switch>
			</div>
		</Paper>
		)
	}
}

export default App;