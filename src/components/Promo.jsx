import React from "react";
import {connect} from "react-redux";

import * as promoActions from "../actions/promo";

export const Promo = React.createClass({
  render() {
    return <div>
      <h4>Promo Component</h4>
    </div>
  }
});

const mapStateToProps = (state) =>{
  return {

  }
};

export const PromoContainer = connect(
  promoActions
)(Promo);