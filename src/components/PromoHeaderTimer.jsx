import React from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from "react-redux";
import moment from "moment";
import "moment-duration-format";
import * as _ from "underscore";

import { Timer } from "../libs/timer";

import "./timer.css";

export const PromoHeaderTimer = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    endDateTime: React.PropTypes.number.isRequired,
    isTimerEnabled: React.PropTypes.bool.isRequired
  },
  statics: {
    setDuration(self, duration){
      self.setState(() => {
        return {
          duration: duration
        }
      });
    },
    getDuration(self){
      return self.state.duration;
    },
    timerInit(self){
      let duration = Timer.getDurationInMs(moment().unix(), self.props.endDateTime);
      let timer = new Timer.instance(duration);

      // add timer tick event subscriber
      timer.addListener(Timer.EVENT.TICK, (duration) => {
        self.constructor.setDuration(self, duration);
      });

      // add timer complete event subscriber
      timer.addListener(Timer.EVENT.COMPLETE, () => {
        // TODO - dispatch action on timer complete
      });

      // start timer
      timer.countdown();

      // set state
      self.setState(() => {
        return {
          duration: duration,
          timer: timer
        }
      });
    },
    timerCountdown(self) {
      self.state.timer.countdown();
    },
    timerPause(self) {
      self.state.timer.pause();
    },
    timerDurationHumanise(duration){
      return moment.duration(duration).format("hh:mm:ss");
    }
  },
  getInitialStateValues() {
    return {
      endDateTime: moment().unix(),
      duration: 0
    }
  },
  getInitialState(){
    return this.getInitialStateValues();
  },
  componentWillReceiveProps(nextProps) {
    nextProps.isTimerEnabled
      ? this.constructor.timerCountdown(this)
      : this.constructor.timerPause(this);
  },
  componentDidMount() {
    this.constructor.timerInit(this);
  },
  render() {
    return <div className="timer">
      <i className="icon-time"></i><span>Only <b>{this.constructor.timerDurationHumanise(this.constructor.getDuration(this))}</b> left</span>
    </div>
  }
});