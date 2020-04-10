import React from 'react'

const Course = (props) =>{
 
  var total = 0;
  var index = 0;
  props.course.parts.map(part => (total = total + Number(props.course.parts[index++].exercises)))

  return (
    
    <div>
      
      <h1>{props.course.name}</h1>
      {props.course.parts.map(part => <Part name = {part.name} exercises = {part.exercises}/>)}
      <p>Total: {total}</p>
      
    </div>
  )

}
const Part = (props) =>{
  
   return(
     <div>
      <p>{props.name} {props.exercises}</p>
      {props.total}
      
     </div>
     
   )
 }
export default Course