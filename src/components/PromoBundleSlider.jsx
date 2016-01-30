import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import validator from "validator";
import Rcslider from "rc-slider";

export const PromoBundleSlider = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    price: React.PropTypes.shape({
      current: React.PropTypes.number.isRequired,
      min: React.PropTypes.number.isRequired,
      max: React.PropTypes.number.isRequired,
      points: React.PropTypes.arrayOf(React.PropTypes.number.isRequired)
    }).isRequired
  },
  getInitialStateValues(){
    return {
      min: this.props.price.min || 0,
      max: this.props.price.max || 1,
      step: 0.01,
      current: this.props.price.current || 0,       // proper price value
      currentInput: this.props.price.current || 0,  // input price value
      isInputValid: true,
      length: 0,
      trackLength: 0,
      points: [],
      popover: {}
    }
  },
  getInitialState(){
    return this.getInitialStateValues();
  },
  /** calculate the length of the track in pixels */
  calcTrackLengthPx(current, length){
    return Math.floor((length / 100) * ((current - this.state.min) / (this.state.max - this.state.min) * 100));
  },
  /** get human friendly price value */
  humanisePrice(price){
    return Number(price).toFixed(2);
  },
  /** check whether input value is a price */
  isPrice(input){
    input = Number(input);

    console.log(input, !Number.isNaN(input), input >= 0);

    return !Number.isNaN(input) && input >= 0;
  },
  /** check whether price is valid */
  isValidPrice(newPrice){
    //return newPrice > this.state.min && newPrice < this.state.max;
    return validator.isFloat(newPrice, { min: this.state.min, max: this.state.max });
  },
  /** check whether price is in the range and if not return closest valid value */
  inbindPrice(newPrice){
    newPrice = Number(newPrice);

    if (newPrice < this.state.min) {
      return this.state.min;
    } else if (newPrice > this.state.max) {
      return this.state.max;
    } else {
      return newPrice;
    }
  },
  onSliderChange(current, length){
    let trackLength = this.calcTrackLengthPx(current, length);
    console.log(arguments, trackLength);

    this.setState(() => {
      return {
        trackLength: trackLength,
        current: current,
        currentInput: current,
        length: length
      }
    });
  },
  onInputChange(e){
    console.log("onInputChange");

    let self = this;

    self.setState(() => {
      return {
        current: self.isValidPrice(e.target.value)
          ? Number(e.target.value)
          : self.inbindPrice(e.target.value) || self.state.current,
        currentInput: self.isPrice(e.target.value)
          ? e.target.value
          : self.state.current
      }
    })
  },
  onInputBlur(e){
    console.log("onInputBlur");

    let self = this;
    let current = self.isValidPrice(e.target.value)
      ? Number(e.target.value)
      : self.inbindPrice(e.target.value);

    self.setState(() => {
      return {
        current: current,
        currentInput: self.humanisePrice(current)
      }
    })
  },
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
  },
  componentDidMount(){
    console.log("componentDidMount");
  },
  render(){
    return <div className="slider-container">
      <div>${this.state.min}</div>
      <Rcslider min={this.state.min}
                max={this.state.max}
                value={this.state.current}
                step={0.01}
                onChange={this.onSliderChange}
      />
      <div className="slider-popover">
        <span>$</span>
        <input type="text"
               onChange={this.onInputChange}
               onBlur={this.onInputBlur}
               placeholder={this.state.current}
               value={this.state.currentInput}/>
        <button>Checkout now</button>
      </div>
      <div>${this.state.max}</div>
    </div>
  }
});