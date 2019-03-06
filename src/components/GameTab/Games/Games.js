import React from 'react'
import { Card, Row, CardBody, CardImg, CardTitle,  Container} from 'reactstrap'
import {Link, Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import YellowLock from './Lock100.svg'
import BlueLock from './bluelock.svg'
import RedLock from './Red100.svg'
import RedOpen from './redOpen.svg'
import BlueOpen from './blueOpen.svg'
import YellowOpen from './yellowOpen.svg'
import GreenLock from './GreenLock.svg'
import GreenOpen from './GreenOpen.svg'
import Game from '../../../containers/GameControl/Game'




const games=(props)=>{
	const allGames=[];
	const startLevel= (props.level-1) * 12 + 1;
	const imagePicker={
		0: {
			0: BlueLock,
			1: GreenLock,
			2: YellowLock,
			3: RedLock},
		1: {
			0: BlueOpen,
			1: GreenOpen,
			2: YellowOpen,
			3: RedOpen
		}
	}


	for(let i=startLevel; i<startLevel+12; i++){
		const complete= props.completedLevels? props.completedLevels.includes(i) ? 1 : 0 :0;

		allGames.push(<Card key={i} style={{margin:'5px'}}>  
							<CardBody>
							 <Link to={"/level/"+i}> 
							 	<CardImg top src={imagePicker[complete][props.level-1]} width='100px' alt='lock'/>
							 </Link>
          <CardTitle>Level : {i} </CardTitle>
      
        </CardBody>

					  </Card>)
	}
	return(
		<Container>
				<Switch>
				
				
				<Route path='/level/:id' render={()=>(
					<Game />

				)} />

				<Route path={props.match.url} exact render={()=>(
					<Row>{allGames}</Row>
				)
				} />
			

				<Route render={()=><Container> 404: Page Cannot Be Found </Container>}/>
				</Switch>

		</Container>
	)
}


const mapStateToProps = state => {
  return{
    completedLevels: state.levels
  }
} 

export default withRouter(connect(mapStateToProps)(games));