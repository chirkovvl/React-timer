import React from 'react'
import Numbers from './Numbers'
import './css/style.css'
import PropTypes from 'prop-types'

export default class Timer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      hours: props.hours,
      minutes: props.minutes,
      seconds: props.seconds
    }

    this.interval = 1000
  }

  componentDidMount () {
    const timestamp = this._timeToSeconds()
    if (timestamp) {
      this.startTimer(timestamp)
    }
  }

  startTimer (timestamp) {
    let counter = timestamp

    const timerId = setInterval(() => {
      --counter

      const hours = this._convertToStr(this.toHours(counter))
      const minutes = this._convertToStr(this.toMinutes(counter, hours))
      const seconds = this._convertToStr(this.toSeconds(counter))

      this.setState({ hours, minutes, seconds })

      if (counter === 0) {
        clearInterval(timerId)
        setTimeout(() => this._timeIsUpHandle(), 0)
      }
    }, this.interval)
  }

  toHours (timestamp) {
    return Math.abs(Math.floor(timestamp / 60 / 60))
  }

  toMinutes (timestamp, hours) {
    if (!hours) hours = this.toHours(timestamp)
    return Math.abs(Math.floor(timestamp / 60) - hours * 60)
  }

  toSeconds (timestamp) {
    return Math.abs(timestamp % 60)
  }

  _convertToStr (time) {
    let result = time

    const isUnits = Math.floor(result / 10) === 0

    if (isUnits) {
      result = '0' + result
    }

    return String(result)
  }

  _timeToSeconds () {
    let seconds = 0
    seconds += +this.props.hours * 60 * 60
    seconds += +this.props.minutes * 60
    seconds += +this.props.seconds

    return seconds
  }

  _timeIsUpHandle () {
    this.props.onTimeIsUp()
  }

  render () {
    return (
      <div className="container">
        <Numbers time={this.state.hours} subtitle="Часы" />
        <Numbers time={this.state.minutes} subtitle="Минуты" />
        <Numbers time={this.state.seconds} subtitle="Секунды" />
      </div>
    )
  }
}

Timer.defaultProps = {
  hours: '00',
  minutes: '00',
  seconds: '00'
}

Timer.propTypes = {
  hours: PropTypes.string,
  minutes: PropTypes.string,
  seconds: PropTypes.string,
  onTimeIsUp: PropTypes.func
}
