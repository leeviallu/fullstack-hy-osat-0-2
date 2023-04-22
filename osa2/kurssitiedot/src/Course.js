const Header = ({course}) => {
    const {name} = course;
    return (
      <h1>{name}</h1>
    )
  }
const Content = ({parts}) => {
    return (
        <div>
            {
                parts.map(part => {
                    return <Part key={part.id} part={part} />
                })
            }
        </div>
    )
}
const Part = ({part}) => {
    const {name, exercises} = part;
    return (
    <p>
        {name} {exercises}
    </p>
    )
}
const Total = ( {parts} ) => {
    const total = parts.reduce(function(sum, order) {
      return sum + order.exercises
    }, 0)
    return(
        <p><b>total of {total} exercises</b></p>
    )
  }

  
  
const Course = ({course}) => {
    const { parts } = course;
    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

export default Course;