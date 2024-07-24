import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Tooltip } from "react-bootstrap";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { FormattedMessage, injectIntl } from "react-intl";
import s from "./CancellationPolicies.css";

// Locale
import messages from "../../locale/messages";
import Translation from "../Translation/Translation";
class Flexible extends React.Component {
  static propTypes = {
    siteName: PropTypes.string.isRequired,
  };

  render() {
    const { siteName } = this.props;
    return (
      <div className={s.spaceTop3}>
        <div>
          <div className={cx(s.cancelCard, s.cancelCardOne, s.spaceBottom3)}>
            <h4
              className={cx(
                s.commonContentText,
                s.fontWeightMedium,
                s.spaceBottom3
              )}
            >
              <b>
                <FormattedMessage {...messages.flexibleBeforeOneDay} />
              </b>
            </h4>
            <p className={cx(s.commonContentText, s.spaceBottom2)}>
              <FormattedMessage {...messages.flexibleBeforeOneDayContentOne} />
            </p>
            <p className={cx(s.commonContentText)}>
              <FormattedMessage {...messages.flexibleBeforeOneDayContentTwo} />
            </p>
          </div>
          <div className={cx(s.cancelCard, s.cancelCardTwo, s.spaceBottom3)}>
            <h4
              className={cx(
                s.commonContentText,
                s.fontWeightMedium,
                s.spaceBottom3
              )}
            >
              <b>
                <FormattedMessage {...messages.cancellation5DaysCheckIn} />
              </b>
            </h4>
            <p className={cx(s.commonContentText, s.spaceBottom2)}>
              <FormattedMessage {...messages.flexibleCheckInContentOne} />
            </p>
            <p className={cx(s.commonContentText)}>
              <FormattedMessage {...messages.flexibleCheckInContentTwo} />
            </p>
          </div>
          <div className={cx(s.cancelCard, s.cancelCardThree)}>
            <h4
              className={cx(
                s.commonContentText,
                s.fontWeightMedium,
                s.spaceBottom3
              )}
            >
              <b>
                <FormattedMessage {...messages.cancellationCheckOut} />
              </b>
            </h4>
            <p className={cx(s.commonContentText, s.spaceBottom2)}>
              <FormattedMessage {...messages.flexibleCheckOutContentOne} />
            </p>
          </div>
        </div>
        <hr className={s.horizontalLine} />
        <div className={s.cancelDescSec}>
          <h4
            className={cx(
              s.commonContentText,
              s.fontWeightMedium,
              s.spaceBottom3
            )}
          >
            {" "}
            <b>
              {" "}
              <FormattedMessage {...messages.cancellationDescription} />
            </b>
          </h4>
          <ul className={cx(s.descListSpaceLeft, "descListSpaceRightRTL")}>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.flexible1} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              {/* <FormattedMessage {...messages.theWord} />{" "} */}
              <Translation identifier="siteName">{siteName}</Translation>{" "}
              <FormattedMessage {...messages.flexible2} />{" "}
              {/* <Translation identifier="siteName">{siteName}</Translation>{" "}
              <FormattedMessage {...messages.flexible3} /> */}
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.flexible4} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.flexible5} />{" "}
              <Translation identifier="siteName">{siteName}</Translation>{" "}
              <FormattedMessage {...messages.flexible6} />{" "}
              <Translation identifier="siteName">{siteName}</Translation>{" "}
              <FormattedMessage {...messages.flexible61} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.flexible7} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.strct8} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.flexible9} />{" "}
            </li>
            <li className={cx(s.commonContentText)}>
              <FormattedMessage {...messages.flexible10} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default injectIntl(withStyles(s)(Flexible));
