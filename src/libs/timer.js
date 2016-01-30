/**
 * Timer module
 * @module
 */
export const Timer = (() => {
  const EVENT = {
    TICK: "TICK",
    COUNTDOWN: "COUNTDOWN",
    PAUSE: "PAUSE",
    RESET: "RESET",
    COMPLETE: "COMPLETE"
  };

  /**
   * Returns duration between two dates in milliseconds
   * @param {number} start  unix timestamp in seconds
   * @param {number} end    unix timestamp in seconds
   */
  const getDurationInMs = (start = 0, end = 0) => {
    let duration = (end - start) * 1000;

    return duration > 0
      ? duration
      : 0
  };

  class TimerInstance {
    /**
     * @param   {Number}  duration    duration in milliseconds
     * @param   {Number}  [interval]  tick duration
     * @returns {Object}
     * @constructor {TimerInstance}
     */
    constructor(duration = 0, interval = 1000) {
      this.initialDuration = duration;
      this.isTicking = false;
      this.timeoutId = undefined;
      this.interval = interval;
      this.left = this.initialDuration;
      this.listeners = {};
    }

    /**
     * Utility method. Add a function that will be executed on event fire
     * @param   {String}    event
     * @param   {Function}  f
     */
    addListener(event, f) {
      !this.listeners[event] && (this.listeners[event] = []);
      this.listeners[event].push(f);
    }

    /**
     * Start timer
     */
    countdown() {
      const self = this;

      if (!self.isTicking) {
        if (self.left < 1) {
          this.complete();
        } else {
          self.isTicking = true;
          self.timeoutId = setInterval(() => {
            self.left -= self.interval;
            self.broadcastEvent(EVENT.TICK);


            (self.left < 1) && this.complete();
          }, self.interval);
        }
      }
    }

    /**
     * Pause timer
     */
    pause() {
      if (this.isTicking) {
        this.timeoutId && clearTimeout(this.timeoutId);
        this.isTicking = false;
        this.broadcastEvent(EVENT.PAUSE);
      }
    }

    /**
     * Reset timer
     */
    reset() {
      this.timeoutId && clearTimeout(this.timeoutId);
      this.left = this.initialDuration;
      this.isTicking = false;
      this.broadcastEvent(EVENT.RESET);
    }

    /**
     * Utility method. Handle timer's complete event
     */
    complete() {
      this.timeoutId && clearTimeout(this.timeoutId);
      this.left = this.initialDuration;
      this.isTicking = false;
      this.broadcastEvent(EVENT.COMPLETE);
    };

    /**
     * Utility method. Handle event broadcasting
     * @param {String} event
     */
    broadcastEvent(event) {
      const self = this;
      /** Inner function. Do actual broadcasting */
      const broadcast = (event, args) => {
        (self.listeners[event] || []).forEach(function (f) {
          return f.apply(f, args);
        });
      };

      switch (event) {
        case EVENT.TICK:
          return broadcast(event, [self.left]);
        default:
          return broadcast(event);
      }
    };
  }

  return {
    EVENT: EVENT,
    getDurationInMs: getDurationInMs,
    instance: TimerInstance
  }
})();