import React from 'react';
import { Card, Row, CardBody, CardImg, CardTitle,  Container} from 'reactstrap';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import YellowLock from './Lock100.svg';
import BlueLock from './bluelock.svg';
import GreenLock from './Red100.svg';
import Game from '../../../containers/GameControl/Game';



const games=(props)=>{
	const allGames=[];
	const startLevel= (props.level-1) * 12 + 1;
	const imagePicker={
		0: BlueLock,
		1:  GreenLock,
		2:  YellowLock
	}

	for(let i=startLevel; i<startLevel+12; i++){
		allGames.push(<Card key={i} style={{margin:'5px'}}>  
							<CardBody>
							 <Link to={"/level/"+i}> 
							 	<CardImg top src={imagePicker[props.level-1]} width='100px' alt='lock'/>
							 </Link>
          <CardTitle>Level : {i} </CardTitle>
      
        </CardBody>

					  </Card>)
	}
	return(
		<Container>
				<Switch>
				<Route path={props.match.url} exact render={()=>(
					<Row>{allGames}</Row>
				)
				} />
				
				<Route path='/level/:id' render={()=>(
					<Game />
				)
				} />

				<Route render={()=><Container> 404: Page Cannot Be Found </Container>}/>
				</Switch>

		</Container>
	)
}

export default withRouter(games);