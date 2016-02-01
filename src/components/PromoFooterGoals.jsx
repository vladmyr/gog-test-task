import React from "react";
import ReactSlick from "react-slick";
import CircularProgress from "react-circular-progress";
import * as _ from "underscore";

export const PromoFooterGoals = React.createClass({
  getInitialStateValues(){
    return {
      reactSlick: {
        speed: 1, // > 0
        slickGoTo: 0,
        dots: false,
        infinite: false,
        autoplay: false
      }
    }
  },
  onSliderChange(index){
    let newState = _.extend({}, this.state.reactSlick, {
      slickGoTo: index
    });

    this.setState(() => {
      return {
        reactSlick: newState
      }
    })
  },
  getInitialState() {
    return this.getInitialStateValues();
  },
  calcIsAccomplished(value, goal) {
    return value > goal;
  },
  calcGoalPercentage(value, goal){
    return Math.min(Math.floor(value / goal * 100), 100);
  },
  getSliderOptions(){
    let options = this.state.reactSlick;

    // supply event handler
    options.afterChange = this.onSliderChange;

    return options;
  },
  format(value, isExactLength) {
    let minChunks = 2;
    let chunkLength = 3;
    let digits = 0;
    let chunks = Math.ceil(String(value).length / chunkLength);
    let tmp;
    let formatted = [];

    chunks < 2 && (chunks = minChunks);
    digits = chunkLength * chunks;

    tmp = (Array(digits).join("0") + value).slice(-1 * digits);

    for(let i = 0; i < digits; i += chunkLength){
      formatted.push(tmp.slice(i, i + chunkLength));
    }

    isExactLength && (digits = String(value).length);

    return formatted.join(".").slice(-1 * (digits + chunks - 1));
  },
  render() {
    return <div className="promo-goals">
      <div className="text-center footer-title-preset">
        <div>
          <span className="title-span">Games sold so far</span>
        </div>
      </div>
      <div className="promo-goals-counter">
        {this.format(this.props.totalSold).split("").map((i, key) => {
          return i === "."
            ? <div className="goal-counter-dot" key={key}></div>
            : <div className="goal-counter-digit" key={key}><span>{i}</span></div>
        })}
      </div>
      <div className="promo-goals-slider">
        <ReactSlick {...this.getSliderOptions()}>
          {this.props.goals.map((item, key) => {
            return <div className="text-center goals-slider-item" key={key}>
              <div>
                <strong>Reach {item.amount}...</strong>
              </div>
              <span className="item-description">{item.description}</span>
              <div className="goals-slider-item-thumbnail">
                <a href="#">
                  <img className="thumbnail-size" src={item.img}/>
                  <div className="thumbnail-hover">
                    <div className="circular-progress">
                      <CircularProgress
                        strokeWidth="10"
                        radius="46"
                        percentage={this.calcGoalPercentage(this.props.totalSold, item.amount)}/>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          })}
        </ReactSlick>
        <div className="btn-group thumbnail-size thumbnail-navigation">
          {this.props.goals.map((item, key) => {
            return <button type="button"
                           className={"btn btn-sm " + (this.state.reactSlick.slickGoTo === key ? "active" : "")}
                           key={key}
                           onClick={() => this.onSliderChange(key)}>{this.calcIsAccomplished(this.props.totalSold, item.amount)
                            ? <i className="icons-notification icons-notification-check"></i>
                            : this.format(item.amount, true)}</button>
          })}
        </div>

      </div>
    </div>
  }
});

