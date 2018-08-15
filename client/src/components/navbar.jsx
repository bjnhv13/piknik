import React from 'react';
import { Link } from 'react-router-dom'
import {AppBar} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';


const styles = {
  fab: {
    position: 'absolute',
    right:  4,
    fontSize: 10
  }
}


function Navbar(props) {
	return (
	  <AppBar position="static">
	  <Toolbar>
	      <div className="piknik-logo">PIKNIK</div>
	      <div className="navigtion-bar">
	        <Link to='/'><Button style={{margin:5}} variant="contained">Home</Button></Link>
	        <Link to='/adminpanel'><Button style={{margin:5}} variant="contained">Admin</Button></Link>
	      </div>
	      <Button color="secondary" mini style={styles.fab} onClick={props.handleShowNav} variant="fab">hide</Button>
	    </Toolbar>
	  </AppBar>
	) }

export default Navbar;