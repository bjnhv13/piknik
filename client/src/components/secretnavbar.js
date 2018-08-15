import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import {AppBar} from '@material-ui/core';


function SecretNavbar(props) {
	
	return (
	  	<AppBar position="static">
			<Toolbar color="secondary">
	      		<div className="piknik-logo">PIKNIK</div>
				{ props.secret.map( (item, index) => { if(item)  return <div onClick={() => props.handleSecret(index)} key={index} style={{width:30, height:30}}></div> } )}
			</Toolbar>
		</AppBar>

	)
}
export default SecretNavbar;