import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Table, TBody, TR, TD } from "oy-vey";
import Layout from "../layouts/Layout";
import Header from "../modules/Header";
import Body from "../modules/Body";
import Footer from "../modules/Footer";
import EmptySpace from "../modules/EmptySpace";
import { url, sitename } from "../../../config";
import CurrencyView from "../modules/CurrencyView";
import { COMMON_TEXT_COLOR } from "../../../constants/index";
import { FormattedMessage, injectIntl } from "react-intl";
import messages from "../../../locale/messages";

class CancelledByGuest extends Component {
  static propTypes = {
    content: PropTypes.shape({
      hostName: PropTypes.string.isRequired,
      guestName: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      listTitle: PropTypes.string.isRequired,
      payoutToHost: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { formatMessage } = this.props.intl;

    const textStyle = {
      color: COMMON_TEXT_COLOR,
      backgroundColor: "#F7F7F7",
      fontFamily: "Arial",
      fontSize: "16px",
      padding: "35px",
    };

    const {
      content: {
        guestName,
        hostName,
        confirmationCode,
        checkIn,
        listTitle,
        payoutToHost,
        currency,
        logo,
      },
    } = this.props;
    let checkInDate =
      checkIn != null ? moment(checkIn).format("ddd, Do MMM, YYYY") : "";
    let momentStartDate = moment(checkIn).startOf("day");
    let today = moment();
    let interval = momentStartDate.diff(today, "days");
    let isPastDay = false;
    if (interval < 0) {
      isPastDay = true;
    }

    return (
      <Layout>
        <Header
          color="rgb(255, 90, 95)"
          backgroundColor="#F7F7F7"
          logo={logo}
        />
        <div>
          <Table width="100%">
            <TBody>
              <TR>
                <TD style={textStyle}>
                  <EmptySpace height={20} />
                  <div>{`${formatMessage(messages.hi)} ${hostName},`}</div>
                  <EmptySpace height={20} />
                  <div>
                    `${formatMessage(messages.regretToInformThatRenter)} $
                    {guestName} ${formatMessage(messages.hasCancelYourReq)} $
                    {confirmationCode} $
                    {formatMessage(messages.thatWasScheduled)} ${checkInDate}.`
                    {payoutToHost > 0 && (
                      <span>
                        {" "}
                        <FormattedMessage
                          {...messages.payoutWillBeUpdated}
                        />{" "}
                        <CurrencyView
                          amount={payoutToHost}
                          currency={currency}
                        />
                        .
                      </span>
                    )}
                    {payoutToHost === 0 && (
                      <span>
                        {" "}
                        <FormattedMessage {...messages.youWillReceivePayouts} />
                      </span>
                    )}
                    <EmptySpace height={10} />
                    <p>
                      <FormattedMessage {...messages.calendarAlsoUpdated} />
                    </p>
                  </div>
                  <EmptySpace height={20} />
                  <div>
                    <FormattedMessage {...messages.thanks} /> <br />
                    {`${sitename} ${formatMessage(messages.team)}`}
                  </div>
                </TD>
              </TR>
            </TBody>
          </Table>
          <EmptySpace height={40} />
        </div>
        <Footer />
        <EmptySpace height={20} />
      </Layout>
    );
  }
}

export default injectIntl(CancelledByGuest);
