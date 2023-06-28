import React from 'react'

class Quiz extends React.Component {
render(){
  const {pseudo, } = this.props.userData 
  return (
    <div>
      {this.props.userData !== null && pseudo}
    </div>
  )
}
}

export default Quiz