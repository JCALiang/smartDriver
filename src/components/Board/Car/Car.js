import React from 'react';
import { DragSource } from 'react-dnd';


const colorCode={
  a: 'navy',
  b: 'deepskyblue',
  c: 'pink',
  d: 'indianred'
};



const carSource = {
  beginDrag(props) {
    return {curPos: props.curIndex};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

const renderColor=(color)=>{
     return (
      <div style={{
        height:'60px',
        width: '60px',
        backgroundColor: color
      }} />
    );
  }

function car({ connectDragSource, isDragging, curIndex }) {
  return connectDragSource(
    <div style={{
      opacity: isDragging ? 0.5 : 1,
      fontSize: 25,
      fontWeight: 'bold',
      cursor: 'move',
    }}>
      {renderColor(colorCode[curIndex.sourceCar])}
    </div>
  );
}

export default DragSource('car', carSource, collect)(car);