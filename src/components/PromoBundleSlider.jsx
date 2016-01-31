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
      popover: {
        offsetDiff: 0,
        left: 0 //this.getPopoverOffset()
      }
    }
  },
  getInitialState(){
    return this.getInitialStateValues();
  },
  getSliderLength(){
    return this.refs.slider.getSliderLength();
  },
  getSliderValue(){
    return this.refs.slider.getValue();
  },
  getPopoverContainerLength(){
    return this.refs.popoverContainer.clientWidth
  },
  getPopoverLength(){
    return this.refs.popover.clientWidth;
  },
  /** calculate the length of the track in pixels */
  calcTrackLengthPx(current, length){
    return Math.floor((length / 100) * ((current - this.state.min) / (this.state.max - this.state.min) * 100));
  },
  /** get human friendly price value */
  humanisePrice(price){
    return (Math.floor(Number(price) * 100) / 100).toFixed(2);
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
    return validator.isFloat(newPrice, {min: this.state.min, max: this.state.max});
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
  onSliderChange(current){
    this.handlePriceChange(current, this.humanisePrice(current));
  },
  onInputChange(e){
    let self = this;
    let current = self.isValidPrice(e.target.value)
      ? Number(e.target.value)
      : self.inbindPrice(e.target.value) || self.state.current;
    let currentInput = self.isPrice(e.target.value)
      ? e.target.value
      : self.state.current;

    self.handlePriceChange(current, currentInput);
  },
  onInputBlur(e){
    let self = this;
    let current = self.isValidPrice(e.target.value)
      ? Number(e.target.value)
      : self.inbindPrice(e.target.value);

    self.handlePriceChange(current, self.humanisePrice(current));
  },
  handlePriceChange(current, currentInput, length) {
    let newState = {};

    typeof current !== "undefined" && (newState.current = current);
    typeof currentInput !== "undefined" && (newState.currentInput = currentInput);

    newState.length = this.getSliderLength();
    newState.trackLength = this.calcTrackLengthPx(newState.current, newState.length);
    newState.popover = {
      left: this.calcPopoverLeft()
    };

    this.setState(() => {
      return newState;
    })
  },
  calcPopoverLeft(){
    let leftOffsetDiff = (this.getPopoverContainerLength() - this.getSliderLength()) / 2;
    let offset = this.state.trackLength + leftOffsetDiff - (this.getPopoverLength() / 2);

    console.log(leftOffsetDiff);

    if (offset < 0) {
      offset = 0;
    } else if (offset + this.getPopoverLength() > this.getPopoverContainerLength()) {
      offset = this.getPopoverContainerLength() - this.getPopoverLength();
    }

    return offset;
  },
  componentWillReceiveProps(nextProps) {

  },
  componentDidMount(){

  },
  render(){
    return <div className="slider-container">
      <div className="price pull-left text-left">${this.state.min}</div>
      <div className="price pull-right text-right">${this.state.max}</div>
      <div className="rc-slider-wrapper">
        <Rcslider ref="slider"
                  min={this.state.min}
                  max={this.state.max}
                  value={this.state.current}
                  step={0.01}
                  onChange={this.onSliderChange}
        />
      </div>
      <div className="slider-popover-container" ref="popoverContainer">
        <div className="slider-popover" ref="popover" style={this.state.popover}>
          <div className="slider-popover-bg">
            <span className="slider-popover-price">$</span>
            <input type="text"
                   className="form-control slider-popover-input"
                   onChange={this.onInputChange}
                   onBlur={this.onInputBlur}
                   placeholder={this.state.current}
                   value={this.state.currentInput}/>
            <button className="btn btn-checkout">Checkout now</button>
          </div>
          <div className="slider-popover-tip">
            <i className="icons-notification icons-notification-info"></i>
            <span>Click the price to type it in manually</span>
          </div>
        </div>
      </div>
    </div>
  }
});