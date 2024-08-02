const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <div>
      {
        props.parts.map((element, index) => (
          <p key={index}>{element.name} {element.exercises}</p>
        ))
      }
    </div>
  )
}

const Total = (props) => {
  let total = 0
  props.parts.forEach(element => total += element.exercises)
  
  return (
  <p>Number of exercises {total}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
    
  )
}

export default App