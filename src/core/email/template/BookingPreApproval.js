import React from "react";
import PropTypes from "prop-types";
import Layout from "../layouts/Layout";
import Header from "../modules/Header";
import Body from "../modules/Body";
import Footer from "../modules/Footer";
import EmptySpace from "../modules/EmptySpace";
import { url, sitename } from "../../../config";
import { COMMON_TEXT_COLOR } from "../../../constants/index";
import { FormattedMessage, injectIntl } from "react-intl";
import messages from "../../../locale/messages";

class BookingPreApproval extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      guestName: PropTypes.string.isRequired,
      hostName: PropTypes.string.isRequired,
      threadId: PropTypes.number.isRequired,
      listTitle: PropTypes.number.isRequired,
    }),
  };

  render() {
    const { formatMessage } = this.props.intl;
    const linkText = {
      color: COMMON_COLOR,
      fontSize: "16px",
      textDecoration: "none",
      cursor: "pointer",
    };

    const textStyle = {
      color: COMMON_TEXT_COLOR,
      backgroundColor: "#F7F7F7",
      fontFamily: "Arial",
      fontSize: "16px",
      padding: "35px",
    };
    const {
      content: { guestName, hostName, threadId, listTitle, logo },
    } = this.props;
    let contactURL = url + "/message/" + threadId + "/renter";

    return (
      <Layout>
        <Header
          color="rgb(255, 90, 95)"
          backgroundColor="#F7F7F7"
          logo={logo}
        />
        <Body textStyle={textStyle}>
          <div>
            <div>{`${formatMessage(messages.hi)} ${guestName},`}</div>
          </div>
          <EmptySpace height={20} />
          <div>
            {`${hostName} ${formatMessage(
              messages.hasPreApprovedReq
            )} ${listTitle}. ${formatMessage(messages.youCanGoAway)}`}
            <a style={linkText} href={contactURL}>
              <FormattedMessage {...messages.bookLowerCase} />
            </a>
            <FormattedMessage {...messages.preApprovedDatesNow} />
          </div>
          <EmptySpace height={20} />
          <div>
            <FormattedMessage {...messages.thanks} /> <br />
            {`${sitename} ${formatMessage(messages.team)}`}
          </div>
        </Body>
        <Footer />
        <EmptySpace height={20} />
      </Layout>
    );
  }
}

export default injectIntl(BookingPreApproval);
