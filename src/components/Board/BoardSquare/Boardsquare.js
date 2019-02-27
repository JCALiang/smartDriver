import React from 'react';
import { DropTarget } from 'react-dnd';
import classes from './Tile.css';


const squareTarget = {
  canDrop(props, monitor){
      const source= monitor.getItem();
      return props.valid(source.curPos, props.destPos);
  },

  drop(props, monitor) {
    const source= monitor.getItem();
    props.move(source.curPos, props.destPos);

  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

const BoardSquare=({ connectDropTarget, isOver, canDrop, children}) =>{

  const renderOverlay=(color)=>{
     return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }} />
    );
  }

  

  return connectDropTarget(

    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%'
    }}>

        <div className={classes.tile} >
            {children}
        </div
>
    
      {isOver && canDrop && renderOverlay('green')}
      {isOver && !canDrop && renderOverlay('red')}


     
      
    </div>
  );
}

export default DropTarget('car', squareTarget, collect)(BoardSquare);