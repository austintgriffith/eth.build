import React from 'react';
import { useDrag } from 'react-dnd'

function Dragger(props) {

  const [{ isDragging }, drag] = useDrag({
      item: {name:props.name,type:"node"},
      end: (item, monitor) => {
        //console.log("DROP",item)
        let event = window.event;
        if (event.pageX == null && event.clientX != null) {
           let eventDoc = (event.target && event.target.ownerDocument) || document;
           let doc = eventDoc.documentElement;
           let body = eventDoc.body;
           event.pageX = event.clientX +
             (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
             (doc && doc.clientLeft || body && body.clientLeft || 0);
           event.pageY = event.clientY +
             (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
             (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
        //console.log(event.pageX,event.pageY)
        props.drop(props.name,event.pageX,event.pageY)
      },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
    })

  return (
    <div ref={drag}>
      {props.children}
    </div>
  );
}


export default Dragger;
