import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { FormattedMessage, injectIntl } from "react-intl";
import { Table, TBody, TR, TD } from "oy-vey";
import Layout from "../layouts/Layout";
import Header from "../modules/Header";
import Body from "../modules/Body";
import Footer from "../modules/Footer";
import EmptySpace from "../modules/EmptySpace";
import CurrencyView from "../modules/CurrencyView";

import { url, sitename } from "../../../config";
import { COMMON_COLOR, COMMON_TEXT_COLOR } from "../../../constants/index";
import messages from "../../../locale/messages";

class BookingRequestHost extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      reservationId: PropTypes.number.isRequired,
      confirmationCode: PropTypes.number.isRequired,
      hostName: PropTypes.string.isRequired,
      guestName: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      checkOut: PropTypes.string.isRequired,
      listTitle: PropTypes.string.isRequired,
      basePrice: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      hostServiceFee: PropTypes.number.isRequired,
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

    const btnCenter = {
      textAlign: "center",
    };

    const buttonStyle = {
      margin: 0,
      fontFamily: "Arial",
      padding: "10px 16px",
      textDecoration: "none",
      borderRadius: "2px",
      border: "1px solid",
      textAlign: "center",
      verticalAlign: "middle",
      fontWeight: "bold",
      fontSize: "18px",
      whiteSpace: "nowrap",
      background: "#ffffff",
      borderColor: COMMON_COLOR,
      backgroundColor: COMMON_COLOR,
      color: "#ffffff",
      borderTopWidth: "1px",
    };

    const {
      content: {
        reservationId,
        confirmationCode,
        hostName,
        guestName,
        checkIn,
        checkOut,
        threadId,
      },
    } = this.props;
    const {
      content: { listTitle, basePrice, total, hostServiceFee, currency, logo },
    } = this.props;

    let checkInDate =
      checkIn != null ? moment(checkIn).format("ddd, Do MMM, YYYY") : "";
    let checkOutDate =
      checkOut != null ? moment(checkOut).format("ddd, Do MMM, YYYY") : "";
    // let actionURL = url + '/reservation/current';
    let actionURL = url + "/message/" + threadId + "/owner";
    let subtotal = total - hostServiceFee;
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
                    `${formatMessage(messages.haveNewTrip)} $({confirmationCode}
                    ) ${formatMessage(messages.from)} ${guestName}`
                  </div>
                  <EmptySpace height={10} />
                  <div>
                    {`${guestName} ${formatMessage(
                      messages.takeMotorcycleFrom
                    )} ${checkInDate} ${formatMessage(
                      messages.toLowerCase
                    )} ${checkOutDate}.`}
                  </div>
                  <EmptySpace height={10} />
                  <div>
                    <FormattedMessage {...messages.basedOnPriceOf} />{" "}
                    <CurrencyView amount={basePrice} currency={currency} />{" "}
                    <FormattedMessage {...messages.perDayYourEstimatedCost} />{" "}
                    <CurrencyView amount={subtotal} currency={currency} />
                  </div>
                  <EmptySpace height={40} />
                  <div style={btnCenter}>
                    <a href={actionURL} style={buttonStyle}>
                      <FormattedMessage {...messages.acceptOrDecline} />
                    </a>
                  </div>
                  <EmptySpace height={40} />
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

export default injectIntl(BookingRequestHost);
