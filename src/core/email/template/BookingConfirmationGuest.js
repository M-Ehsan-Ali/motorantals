import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, TBody, TR, TD } from "oy-vey";
import Layout from "../layouts/Layout";
import Header from "../modules/Header";
import Body from "../modules/Body";
import Footer from "../modules/Footer";
import EmptySpace from "../modules/EmptySpace";
import { url, sitename } from "../../../config";
import { COMMON_COLOR, COMMON_TEXT_COLOR } from "../../../constants/index";
import messages from "../../../locale/messages";
import { FormattedMessage, injectIntl } from "react-intl";

class BookingConfirmationGuest extends Component {
  static propTypes = {
    content: PropTypes.shape({
      hostName: PropTypes.string.isRequired,
      guestName: PropTypes.string.isRequired,
      listTitle: PropTypes.string.isRequired,
      listCity: PropTypes.string.isRequired,
      threadId: PropTypes.number.isRequired,
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

    const linkText = {
      color: COMMON_COLOR,
      fontSize: "16px",
      textDecoration: "none",
      cursor: "pointer",
    };

    const {
      content: { guestName, hostName, listTitle, listCity, threadId, logo },
    } = this.props;
    let contactURL = url + "/message/" + threadId + "/renter";

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
                  <div>{`${formatMessage(messages.hi)} ${guestName},`}</div>
                  <EmptySpace height={20} />
                  <div>
                    <FormattedMessage {...messages.getReadyForTrip} />
                  </div>
                  <EmptySpace height={20} />
                  <div>
                    `${hostName} ${formatMessage(messages.hasConfirmedReq)} `
                    <a style={linkText} href={contactURL}>
                      <FormattedMessage {...messages.contactOwner} />
                    </a>{" "}
                    <FormattedMessage {...messages.coordinateTrip} />
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

export default injectIntl(BookingConfirmationGuest);
