import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, TBody, TR, TD } from "oy-vey";
import Layout from "../layouts/Layout";
import Header from "../modules/Header";
import Body from "../modules/Body";
import Footer from "../modules/Footer";
import EmptySpace from "../modules/EmptySpace";
import { url, sitename } from "../../../config";
import { COMMON_TEXT_COLOR } from "../../../constants/index";
import { injectIntl } from "react-intl";
import messages from "../../../locale/messages";

class BookingExpiredHost extends Component {
  static propTypes = {
    content: PropTypes.shape({
      guestName: PropTypes.string.isRequired,
      hostName: PropTypes.string.isRequired,
      listTitle: PropTypes.string.isRequired,
      confirmationCode: PropTypes.number.isRequired,
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
      content: { hostName, guestName, listTitle, confirmationCode, logo },
    } = this.props;
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
                    `${formatMessage(messages.bookingForMotorcycle)} ($
                    {confirmationCode}) ${formatMessage(messages.from)} $
                    {guestName} ${formatMessage(messages.hasExpired)} $
                    {guestName} ${formatMessage(messages.fullyRefunded)}`
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

export default injectIntl(BookingExpiredHost);
