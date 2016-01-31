import React from "react";

import "./screen.css";

export default React.createClass({
  render() {
    return <div>
      {this.props.children}
    </div>
  }
});