import React from 'react';
import classes from './Tile.css';


const exit=(props)=>{
	const text= props.i ===3 ? 'Exit' :null
	return(
		<div className={classes.exit}>
			<strong> {text} </strong>
		</div>
	)
}

export default exit;