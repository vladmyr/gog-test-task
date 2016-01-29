import React from "react";

export const PromoBundleSlider = React.createClass({
  propTypes: {
    price: React.PropTypes.shape({
      current: React.PropTypes.number.isRequired,
      min: React.PropTypes.number.isRequired,
      max: React.PropTypes.number.isRequired,
      points: React.PropTypes.arrayOf(React.PropTypes.number.isRequired)
    }).isRequired
  },
  render(){
    return <div></div>
  }
});