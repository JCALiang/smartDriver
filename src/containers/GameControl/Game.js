import React, {Component} from 'react';
import Aux from 'react-aux';
import Board from '../../components/Board/Board';
import {withRouter, Route} from 'react-router-dom';
import axios from 'axios';
import {Button, Container, Row, Col} from 'reactstrap';


class game extends Component{
	state={ carPos: null,
			initPos:null,
			win: false
	}

	componentDidMount(){
		axios.get('https://smartdriverreact.firebaseio.com/game/'+this.props.match.params.id+'.json')
			.then(resp=>{
				console.log('mount');
				this.setState({carPos: resp.data});
				this.setState({initPos:resp.data});
			})
			.catch(err=> console.log(err));
	}
	
	
	checkCollision(curCar, toXY){
		for(let o in this.state.carPos){
			if(o===curCar){
				continue;
			}
			for (let p in this.state.carPos[o]['pos']){
				if (this.state.carPos[o]['pos'][p][0]===toXY[0] && this.state.carPos[o]['pos'][p][1]===toXY[1]){
					return true;
				}
			}
		}
		return false
	}

	winMove(){
		if (this.state.carPos.a.pos.top[0]=== 3 &&
			this.state.carPos.a.pos.top[1]=== 4 &&
			this.state.carPos.a.pos.botm[0]=== 3 &&
			this.state.carPos.a.pos.botm[1]=== 5
		){
			alert('you win!');
			this.setState({win:true});
		}
		
	}

	validMove=(car, board)=>{
		const {sourceCar, sourceX, sourceY} = car;
		const direction= this.state.carPos[sourceCar]['orient'];

		if (direction==='vertical' && board[0]!== sourceX){
			return false
		}
		if (direction==='horizontal' && board[1]!== sourceY){
			return false
		}

		const collision= this.checkCollision(sourceCar, board);
		if (collision){
			return false;
		}

		return true;
	}


	moveCar=(fromXY, toXY)=> {
		const {sourceCar, sourceX, sourceY} = fromXY;
		const direction= this.state.carPos[sourceCar]['orient'];
		const diff=  direction==='vertical'?  toXY[1]-[sourceY] : toXY[0]-[sourceX];
		const coordinate= direction==='vertical'? 1:0;
		
		var updatePos= Object.assign({...this.state.carPos});


		for(let p in this.state.carPos[sourceCar]['pos']){

			const newPos= updatePos[sourceCar]['pos'][p][coordinate]+ diff;
			const newCordinate= direction==='vertical'? [updatePos[sourceCar]['pos'][p][0], newPos] : [newPos, updatePos[sourceCar]['pos'][p][1]];

			
			const validBoundary=  (newPos>5 || newPos<0)?0:1

			if (!validBoundary){
				updatePos = this.state.carPos;
				 break;

			} else {
				updatePos={...updatePos,
					 		[sourceCar]: 
					 			{...updatePos[sourceCar],
					 				pos: {...updatePos[sourceCar]['pos'],
					 					[p]: newCordinate
			
					 				}
											 
								}
							}
				}
			}
		this.setState({carPos:updatePos});
		this.winMove();
	}

	reset=()=>{
		this.setState({carPos:this.state.initPos});
	}

	index=()=>{
		this.props.history.push('/');
	}

	render(){
		console.log('game props');
		console.log(this.props.match);
		return(
			<Aux>
			<Row style={{'justify-content':'center'}}>
			
			<Board carPos={this.state.carPos} moveCar={this.moveCar} moveValid={this.validMove}/>
			</Row>

			<Row style={{'justify-content':'center'}}>
			<Button color="success"
					style={{'border-radius': '20px', margin:'10px'}} 
					size="lg" 
					onClick={()=>{this.reset()}}>Reset</Button>
			<Button color="success" 
					style={{'border-radius': '20px', margin:'10px'}} 
					size="lg"
					onClick={()=>{this.index()}}>Quit</Button>
			</Row>
			</Aux>
		)
	}

}

export default withRouter(game);

