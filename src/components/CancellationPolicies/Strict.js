import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Tooltip } from "react-bootstrap";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { FormattedMessage, injectIntl } from "react-intl";
import s from "./CancellationPolicies.css";

// Locale
import messages from "../../locale/messages";
class Strict extends React.Component {
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
                <FormattedMessage {...messages.strictBeforeSevenDay} />
              </b>
            </h4>
            <p className={cx(s.commonContentText, s.spaceBottom2)}>
              <FormattedMessage {...messages.strictBeforeSevenDayContentOne} />
            </p>
            <p className={cx(s.commonContentText)}>
              <FormattedMessage {...messages.strictBeforeSevenDayContentTwo} />
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
                <FormattedMessage {...messages.strictLess7Days} />
              </b>
            </h4>
            <p className={cx(s.commonContentText, s.spaceBottom2)}>
              <FormattedMessage {...messages.strictCheckInContentOne} />
            </p>
            <p className={cx(s.commonContentText)}>
              <FormattedMessage {...messages.strictCheckInContentTwo} />
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
              <FormattedMessage {...messages.strictCheckOutContentOne} />
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
            <FormattedMessage {...messages.cancellationDescription} />
          </h4>
          <ul className={cx(s.descListSpaceLeft, "descListSpaceRightRTL")}>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.strct1} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              {/* <FormattedMessage {...messages.theWord} />  */}
              {siteName} <FormattedMessage {...messages.flexible2} />{" "}
              {/* <Translation identifier="siteName">{siteName}</Translation>{" "}
              <FormattedMessage {...messages.flexible3} /> */}
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.strct4} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.flexible5} /> {siteName}{" "}
              <FormattedMessage {...messages.flexible6} />
              {siteName} <FormattedMessage {...messages.flexible61} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.strct7} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.strct8} />
            </li>
            <li className={cx(s.commonContentText, s.spaceBottom3)}>
              <FormattedMessage {...messages.strct9} />
            </li>
            <li className={cx(s.commonContentText)}>
              <FormattedMessage {...messages.strct11} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default injectIntl(withStyles(s)(Strict));
