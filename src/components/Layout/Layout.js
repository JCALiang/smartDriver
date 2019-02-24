import React from 'react';
import Aux from 'react-aux';
import Toolbar from '../Toolbar/Toolbar'

const layout=(props)=> {
	return(

		<Aux>
			<div>
			<Toolbar />
			<br />
			</div>
			<main>
				{props.children}
			</main>

		</Aux>

		)
}



export default layout;