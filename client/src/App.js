import React ,{ Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Review from './components/review';
import Navbar from './components/navbar';
import SecretNavbar from './components/secretnavbar';
import AdminPanel from './components/adminpanel';
import Paper from '@material-ui/core/Paper';

const USER_ID = '111';
const defaultSecret = [true, false, false];

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

	render () {
		return (
		<Paper>
			{ this.state.showNav && <Navbar handleShowNav={this.toggleNavbar}/>}
			{ !this.state.showNav && <SecretNavbar secret={this.state.secret} handleSecret={this.handleSecret}/>}
			<Switch>
				<Route exact path='/' render={(props) => <Review userId={USER_ID} {...props} /> }/>
				<Route path='/AdminPanel' render={(props) => <AdminPanel userId={USER_ID} {...props} /> }/>
				<Route component={Review}/>
			</Switch>
		</Paper>
		)
	}
}

export default App;