import React from "react";
import {connect} from "react-redux";

import * as promoActions from "../actions/promo";
import {PromoHeader} from "./PromoHeader";
import {PromoBundle} from "./PromoBundle";
import {PromoFooter} from "./PromoFooter";

export const Promo = React.createClass({
  render() {
    return <div className="container">
      {this.props.promo ? <PromoHeader {...this.props.promo} /> : null}
      {this.props.promo ? <PromoBundle {...this.props.promo} /> : null}
      {this.props.promo ? <PromoFooter {...this.props.promo} /> : null}
    </div>
  }
});

const mapStateToProps = (state) => {
  return {
    promo: state.get("promo").toJS()
  };
};

export const PromoContainer = connect(
  mapStateToProps,
  promoActions
)(Promo);