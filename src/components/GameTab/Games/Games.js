import React from 'react';
import classes from './Games.css';
import { Card, Button, Row, CardBody, CardText, CardImg, CardTitle, CardDeck , Container} from 'reactstrap';
import {Link, Route, Switch, withRouter} from 'react-router-dom';
import Yellowlock from './Lock100.svg';
import Game from '../../../containers/GameControl/Game';



const games=(props)=>{
	const allGames=[];
	const startLevel= (props.level-1) * 12 + 1;

	for(let i=startLevel; i<startLevel+12; i++){
		allGames.push(<Card key={i} style={{margin:'5px'}}>  

							<CardBody>
							 <Link to={"/level/"+i}> 
							 	<CardImg top src={Yellowlock} width='100px' alt='lock'/>
							 </Link>
          <CardTitle>Level : {i} </CardTitle>
      
        </CardBody>

					  </Card>)
	}
	return(
		<Container>

				<Route exact path={props.match.url} render={()=>(
					<Row>{allGames}</Row>
				)
				} />
				
				<Route path='/level/:id' render={()=>(
					<Game />
				)
				} />


		</Container>
	)
}

export default withRouter(games);