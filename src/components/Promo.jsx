import React from "react";
import {connect} from "react-redux";

import * as promoActions from "../actions/promo";
import {PromoHeader} from "./PromoHeader";
import {PromoBundle} from "./PromoBundle";
import {PromoFooter} from "./PromoFooter";

export const Promo = React.createClass({
  componentDidMount(){
    console.log("### Promo.props ###\n", this.props, promoActions);
  },
  render() {
    return <div className="container">
      <PromoHeader {...this.props} />
      <PromoBundle {...this.props} />
      <PromoFooter {...this.props} />
    </div>
  }
});

const mapStateToProps = (state) => {
  return state.get("promo") && state.get("promo").toJS()
};

export const PromoContainer = connect(
  mapStateToProps,
  promoActions
)(Promo);