import React from "react";
import PureRenderMixin from "react-addons-pure-render-mixin";
import validator from "validator";
import Rcslider from "rc-slider";

export const PromoBundleSlider = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        title: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        img: React.PropTypes.shape({
          logo: React.PropTypes.shape({
            active: React.PropTypes.string.isRequired,
            inactive: React.PropTypes.string.isRequired
          })
        }),
        price: React.PropTypes.shape({
          standard: React.PropTypes.number.isRequired,
          promo: React.PropTypes.number.isRequired
        }),
        goodiesAmount: React.PropTypes.number.isRequired,
        languagesAmount: React.PropTypes.number.isRequired,
        isUnlocked: React.PropTypes.bool.isRequired
      }).isRequired
    ),
    price: React.PropTypes.shape({
      current: React.PropTypes.number.isRequired,
      min: React.PropTypes.number.isRequired,
      max: React.PropTypes.number.isRequired
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
      marks: this.getSliderMarks(),
      popover: {
        offsetDiff: 0,
        left: 0
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
  handlePriceChange(current, currentInput) {
    let newState = {};

    typeof current !== "undefined" && (newState.current = current);
    typeof currentInput !== "undefined" && (newState.currentInput = currentInput);

    newState.length = this.getSliderLength();
    newState.trackLength = this.calcTrackLengthPx(newState.current, newState.length);
    newState.popover = {
      left: this.calcPopoverLeft(newState.trackLength)
    };

    // handle marks' label position
    // TODO: move outside from here
    //this.calcMarkPosition();

    this.props.setPriceCurrent(newState.current);
    this.setState(() => {
      return newState;
    })
  },
  calcPopoverLeft(trackLength){
    let leftOffsetDiff = (this.getPopoverContainerLength() - this.getSliderLength()) / 2;
    let offset = trackLength + leftOffsetDiff - (this.getPopoverLength() / 2);

    if (offset < 0) {
      offset = 0;
    } else if (offset + this.getPopoverLength() > this.getPopoverContainerLength()) {
      offset = this.getPopoverContainerLength() - this.getPopoverLength();
    }

    return offset;
  },
  componentDidMount(){
    let self = this;
    // after first rendering reinitialize slider
    self.handlePriceChange(this.getSliderValue());

    self.setState(() => {
      return {
        marks: self.calcSliderMarks()
      }
    })
  },
  /** get initial state of slider marks */
  getSliderMarks(){
    let marks = {
      list: [],
      values: {}
    };
    let index = 0;  // index reference to DOM nodes

    this.props.items.forEach(function (item) {
      if (item.unlock.hasSliderMark) {
        marks.values[String(item.price.promo)] = null; // collected for Rcslider
        marks.list.push({
          index: index,
          value: String(item.price.promo),
          textShort: item.unlock.textShort,
          // absolute left offset from the track start
          pointOffset: 0,
          // actual client width of the mark's label
          labelLength: 0,
          // relative {absolute} to the left neighbour offset for mark label
          labelOffset: 0,
          // style nested object
          style: {
            left: 0
          }
        });

        ++index;
      }
    });

    return marks;
  },
  calcSliderMarks(){
    // space to insert between labels on collision detection
    const PADDING_SPACE = 4;

    let self = this;
    let marks = {
      list: [],
      values: self.state.marks.values
    };
    let refMarksContainer = this.refs.marksContainer;

    // for each mark calculate data related to DOM objects
    self.state.marks.list.forEach(function (item) {
      let pointOffset = self.calcTrackLengthPx(item.value, self.getSliderLength());
      let labelLength = refMarksContainer.childNodes[item.index].clientWidth;
      let labelOffset = pointOffset - Math.ceil((labelLength - 1) / 2);

      marks.list.push({
        index: item.index,
        value: item.value,
        textShort: item.textShort,
        // absolute left offset from the track start
        pointOffset: pointOffset,
        // actual client width of the mark's label
        labelLength: labelLength,
        // relative {absolute} to the left neighbour offset for mark label
        labelOffset: labelOffset,
        // style nested object
        style: {
          left: labelOffset
        }
      });
    });

    // prevent collision for two points
    if (marks.list.length === 2) {
      // space between two points
      let pointsOffsetDelta = Math.abs(marks.list[0].pointOffset - marks.list[1].pointOffset);
      // minimal space before collision
      let labelsSpace = Math.ceil(marks.list[0].labelLength / 2) + Math.ceil(marks.list[1].labelLength / 2);
      // delta between spaces
      let spaceDelta = pointsOffsetDelta - labelsSpace;

      // determine whether points are too close
      if (spaceDelta < 0) {
        let shift = Math.abs(Math.ceil(spaceDelta / 2));

        marks.list[0].labelOffset = marks.list[0].labelOffset - shift - PADDING_SPACE;
        marks.list[1].labelOffset = marks.list[1].labelOffset + shift + PADDING_SPACE;
      }
    }

    // finally copy label offset values into style nested object
    marks.list.forEach((item) => {
      item.style.left = item.labelOffset;
    });

    return marks;
  },
  updateComponentState(){
    let self = this;
    let newState = _.extend({}, this.state, {
      marks: self.getSliderMarks()
    });

    self.setState(() => {
      return newState
    });
  },
  render(){
    let self = this;

    return <div className="slider-container">
      <div className="price pull-left text-left">${this.state.min}</div>
      <div className="price pull-right text-right">${this.state.max}</div>
      <div className="rc-slider-wrapper">
        <div className="marks-container list-unslyled list-inline" ref="marksContainer">
          {this.state.marks.list.map(function (item, index) {
            return <span className="mark-label" key={index} index={index} style={item.style}>${self.humanisePrice(item.value)} ({item.textShort})</span>
          })}
        </div>
        <Rcslider ref="slider"
                  min={this.state.min}
                  max={this.state.max}
                  value={this.state.current}
                  step={0.01}
                  tipFormatter={null}
                  marks={this.state.marks.values}
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
            <button className="btn btn-checkout"
                    onClick={this.props.bundleCheckout}>Checkout now
            </button>
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