import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Button} from '@material-ui/core'
import { Star, StarBorder } from '@material-ui/icons';

const style = {
  emptyStar: {fill: '#ddd', fontSize: 40},
  filledStar: {fill: 'yellow', color: 'red', fontSize: 40 },
};

function Number(props) {
  return (
    <span style={props.style} >{props.number}</span>
    )
} 

export default class Stars extends Component {
  
  constructor (props) {
    super(props)
    this.state = {
      hoverValue: props.value
    }
  }

  chooseType(style, i) {
    return ( this.props.method === "stars" ? <StarBorder style={style} /> : <Number number={i} style={style} /> );
  };

  renderIcon (i) {
    const filled = i <= this.props.value
    const hovered = i <= this.state.hoverValue

    if ((hovered && !filled) || (!hovered && filled)) {
      return this.chooseType(style.filledStar, i)
    } else if (filled) {
      return <Star style={style.filledStar} />
    } else {
      return this.chooseType(style.emptyStar, i)
    }
  }

  render () {
    const {
      max,
      handleChange,
      value,
    } = this.props

    const rating = []

    for (let i = 1; i <= max; i++) {
      rating.push(
        <Button
          key={i}
          size="small"
          onMouseEnter={() => this.setState({hoverValue: i})}
          onMouseLeave={() => this.setState({hoverValue: value})}
          onClick={() => { handleChange(10/max*i) }}
        >
          {this.renderIcon(i)}
        </Button>
      )
    }

    return (
      <div>
        {rating}
      </div>
    )
  }
}

Stars.defaultProps = {
  disabled: false,
  max: 5,
  value: 0
}

Stars.propTypes = {
  max: PropTypes.number,
  handleChange: PropTypes.func,
  value: PropTypes.number
}