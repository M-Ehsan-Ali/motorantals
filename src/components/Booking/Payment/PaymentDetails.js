import PropTypes from "prop-types";
import React, { Component } from "react";
import { FormattedMessage, injectIntl } from "react-intl";

import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import cs from "../../commonStyle.css";
import s from "./Payment.css";

// Component
import CurrencyConverter from "../../CurrencyConverter";

// Locale
import messages from "../../../locale/messages";

//Images
import Faq from "/public/SiteIcons/question.svg";

class PaymentDetails extends Component {
  static propTypes = {
    basePrice: PropTypes.number.isRequired,
    delivery: PropTypes.number,
    currency: PropTypes.string.isRequired,
    dayDifference: PropTypes.number.isRequired,
    discount: PropTypes.number,
    discountType: PropTypes.string,
    priceForDays: PropTypes.number.isRequired,
    serviceFees: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    formatMessage: PropTypes.any,
    bookingSpecialPricing: PropTypes.array,
    isSpecialPriceAssigned: PropTypes.bool,
    toCurrency: PropTypes.string.isRequired,
  };

  static defaultProps = {
    bookingSpecialPricing: [],
    isSpecialPriceAssigned: false,
  };

  render() {
    const {
      basePrice,
      delivery,
      currency,
      dayDifference,
      securityDeposit,
      toCurrency,
    } = this.props;
    const {
      priceForDays,
      serviceFees,
      discount,
      discountType,
      total,
    } = this.props;
    const { formatMessage } = this.props.intl;
    const {
      bookingSpecialPricing,
      isSpecialPriceAssigned,
      isAverage,
    } = this.props;

    console.log("currency:", currency);

    function LinkWithTooltip({ id, children, href, tooltip }) {
      return (
        <OverlayTrigger
          overlay={
            <Tooltip className={s.tooltip} id={id}>
              {tooltip}
            </Tooltip>
          }
          placement="top"
          delayShow={300}
          delayHide={150}
        >
          {children}
        </OverlayTrigger>
      );
    }

    return (
      <>
        <div className={cx(s.tableFlex, cs.commonMediumText)}>
          <div>
            <div className={s.specialPriceIcon}>
              {isSpecialPriceAssigned && (
                <span className={s.iconSection}>
                  <img src={Faq} className={cx(s.faqImage, "faqImageRTL")} />
                </span>
              )}
              <div
                className={cx(s.tltip, s.relativeSection, "relativeSectionRTL")}
              >
                <FormattedMessage {...messages.averageRate} />
              </div>
            </div>
            <div className={cx(s.specialPriceText, "directionLtr")}>
              <CurrencyConverter
                //amount={basePrice}
                amount={isAverage}
                from={currency}
              />
              {" x"} {dayDifference}{" "}
              {dayDifference > 1
                ? formatMessage(messages.nights)
                : formatMessage(messages.night)}
            </div>
          </div>
          <div>
            <div className={s.flex}>
              <CurrencyConverter amount={priceForDays} from={currency} />
              {toCurrency !== "THB" && (
                <div>
                  |
                  <CurrencyConverter
                    amount={priceForDays}
                    from={currency}
                    overrideToCurrency="THB"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <hr className={cx(s.horizondalLine, s.hrLineSidePanelMargin)} />
        {delivery > 0 && (
          <>
            <h5
              className={cx(
                s.tableFlex,
                cs.commonMediumText,
                cs.fontWeightNormal
              )}
            >
              <FormattedMessage {...messages.cleaningFee} />
              <div className={s.flex}>
                <CurrencyConverter amount={delivery} from={currency} />
                {toCurrency !== "THB" && (
                  <div>
                    |
                    <CurrencyConverter
                      amount={delivery}
                      from={currency}
                      overrideToCurrency="THB"
                    />
                  </div>
                )}
              </div>
            </h5>
            <hr className={cx(s.horizondalLine, s.hrLineSidePanelMargin)} />
          </>
        )}
        {serviceFees > 0 && (
          <>
            <h6
              className={cx(
                s.tableFlex,
                cs.commonMediumText,
                cs.fontWeightNormal
              )}
            >
              <FormattedMessage {...messages.serviceFee} />
              <div className={s.flex}>
                <CurrencyConverter amount={serviceFees} from={currency} />
                {toCurrency !== "THB" && (
                  <div>
                    |
                    <CurrencyConverter
                      amount={serviceFees}
                      from={currency}
                      overrideToCurrency="THB"
                    />
                  </div>
                )}
              </div>
            </h6>
            <hr className={cx(s.horizondalLine, s.hrLineSidePanelMargin)} />
          </>
        )}
        {securityDeposit > 0 && (
          <>
            <h6
              className={cx(
                s.tableFlex,
                cs.commonMediumText,
                cs.fontWeightNormal
              )}
            >
              <FormattedMessage {...messages.securityDeposit} />
              <div className={s.flex}>
                <CurrencyConverter amount={securityDeposit} from={currency} />
                {toCurrency !== "THB" && (
                  <div>
                    |
                    <CurrencyConverter
                      amount={securityDeposit}
                      from={currency}
                      overrideToCurrency="THB"
                    />
                  </div>
                )}
              </div>
            </h6>
            <hr className={cx(s.horizondalLine, s.hrLineSidePanelMargin)} />
          </>
        )}
        {discount > 0 && (
          <>
            <h5
              className={cx(
                s.tableFlex,
                cs.commonMediumText,
                cs.fontWeightNormal
              )}
            >
              <span>{discountType}</span>
              <span className={s.discountText}>
                {" "}
                <div className={s.flex}>
                  -
                  <CurrencyConverter amount={discount} from={currency} />
                  {toCurrency !== "THB" && (
                    <div>
                      |
                      <CurrencyConverter
                        amount={discount}
                        from={currency}
                        overrideToCurrency="THB"
                      />
                    </div>
                  )}
                </div>
              </span>
            </h5>
            <hr className={cx(s.horizondalLine, s.hrLineSidePanelMargin)} />
          </>
        )}
        <h4
          className={cx(s.tableFlex, cs.commonContentText, cs.fontWeightMedium)}
        >
          <FormattedMessage {...messages.total} />
          <div className={s.flex}>
            <CurrencyConverter amount={total} from={currency} />
            {toCurrency !== "THB" && (
              <div>
                |
                <CurrencyConverter
                  amount={total}
                  from={currency}
                  overrideToCurrency="THB"
                />
              </div>
            )}
          </div>
        </h4>
      </>
    );
  }
}

export default injectIntl(withStyles(s)(PaymentDetails));
