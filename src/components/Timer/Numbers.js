import React from 'react'
import PropTypes from 'prop-types'

export default function Numbers (props) {
  const [tents, units] = props.time.split('')
  return (
        <div className="timer">
            <div className="numbers">
                <span>{tents}</span>

                <span>{units}</span>
            </div>
            <p className="subtitle">{props.subtitle}</p>
        </div>
  )
}
Numbers.propTypes = {
  time: PropTypes.string,
  subtitle: PropTypes.string
}
