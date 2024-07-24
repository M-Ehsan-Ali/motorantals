import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";

// Translation
import { FormattedNumber, injectIntl } from "react-intl";

// Helper
import { convert } from "../../helpers/currencyConvertion";
import { isRTL } from "../../helpers/formatLocale";

class CurrencyConverter extends Component {
  static propTypes = {
    from: PropTypes.string,
    amount: PropTypes.number,
    base: PropTypes.string,
    rates: PropTypes.object,
    superSymbol: PropTypes.bool,
    className: PropTypes.string,
    toCurrency: PropTypes.string,
    overrideToCurrency: PropTypes.string,
  };

  static defaultProps = {
    amount: 0,
    superSymbol: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      base: null,
      rates: null,
    };
  }

  UNSAFE_componentWillMount() {
    const { base, rates } = this.props;
    if (base != undefined && rates != undefined) {
      this.setState({ base: base, rates: rates });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { base, rates } = nextProps;
    if (base != undefined && rates != undefined) {
      this.setState({ base: base, rates: rates });
    }
  }

  render() {
    const {
      from,
      amount,
      superSymbol,
      className,
      toCurrency,
      overrideToCurrency,
      locale,
      isCurrency,
    } = this.props;
    const { base, rates } = this.state;

    const { formatNumber } = this.props.intl;

    let targetCurrency;
    let convertedAmount = amount;
    let fromCurrency = from || base;

    const toC = overrideToCurrency || toCurrency;

    if (rates != null) {
      convertedAmount = convert(base, rates, amount, fromCurrency, toC);
      console.log(convertedAmount, toC);
    }

    if (toC) {
      targetCurrency = toC;
    } else {
      targetCurrency = base;
    }

    return (
      <span className={className}>
        {isRTL(locale) && targetCurrency ? (
          new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: targetCurrency,
            minimumFractionDigits: convertedAmount % 1 === 0 ? 0 : 2,
            maximumFractionDigits: convertedAmount % 1 === 0 ? 0 : 2,
            currencyDisplay: "symbol",
          }).format(convertedAmount)
        ) : (
          <FormattedNumber
            value={convertedAmount}
            style="currency"
            currency={targetCurrency}
            minimumFractionDigits={convertedAmount % 1 === 0 ? 0 : 2}
            maximumFractionDigits={convertedAmount % 1 === 0 ? 0 : 2}
            currencyDisplay={"symbol"}
          />
        )}
        {superSymbol && <sup>{targetCurrency}</sup>}
      </span>
    );
  }
}

const mapState = (state) => ({
  base: state.currency.base,
  toCurrency: state.currency.to,
  rates: state.currency.rates,
  locale: state.intl.locale,
});

const mapDispatch = {};

export default injectIntl(connect(mapState, mapDispatch)(CurrencyConverter));
