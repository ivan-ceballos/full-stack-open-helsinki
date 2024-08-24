const Header = ({course}) => <h3>{course}</h3>

const Part = ({name, exercises}) => <p>{name} {exercises}</p>

const Content = ({parts}) => {
  return (
    <div>
      {
        parts.map((part) => (
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        ))
      }
    </div>
  )
}

const Total = ({parts}) => {
  let total = parts.reduce((sum, part) => sum + part.exercises , 0)
  return <p><strong>total of {total} exercises</strong></p>
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course