import React from 'react'
import ReactDOM from 'react-dom'
import Timer from './components/Timer'

function timeIsUpHandler () {
  alert('Время истекло')
}

ReactDOM.render(<Timer hours="26" minutes="30" seconds="10" onTimeIsUp={timeIsUpHandler}/>, document.getElementById('timer'))
