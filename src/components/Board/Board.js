import React from 'react';
import Aux from 'react-aux';
import BoardSquare from './BoardSquare/Boardsquare';
import Exit from './BoardSquare/Exit';
import Car from './Car/Car';
import classes from './Board.css';


const renderSquare=(key, carPos, squarePos, move, valid)=> {


	let isCarHere= false;
	let carIndex= null;

	for(let i in carPos){
		for(let p in carPos[i]['pos']){
			if (carPos[i]['pos'][p][0]=== squarePos[0] && carPos[i]['pos'][p][1] === squarePos[1]){
				carIndex= {
                    'sourceCar':i, 
                    'sourceX':squarePos[0], 
                    'sourceY': squarePos[1]};
				isCarHere= true;
				break;
			}
		}
	}
  
  const piece = isCarHere ? <Car curIndex={carIndex} /> : null;
  return (
  	
    <BoardSquare key={key} 
                  move={move} 
                  valid={valid} 
                  destPos={[squarePos[0],squarePos[1]]} >
      {piece}
    </BoardSquare>

  );
}


export default function Board(props) {
	const squares= [];
  const exit=[];

	for (let i = 0; i < 36; i++) {
		let x= i%6;
		let y= Math.floor(i/6);
    squares.push(renderSquare(i, props.carPos, [x,y], props.moveCar, props.moveValid));
  }

  for (let i=0; i<6; i++){
    exit.push(<Exit key={i} i={i}/>)
  }

  return (
  	<Aux>
      <div className={classes.board}>
        {squares}
        {exit}
      </div>
      
    </Aux>
  );
}