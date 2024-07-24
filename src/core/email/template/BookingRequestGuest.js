import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Table, TBody, TR, TD } from "oy-vey";
import Layout from "../layouts/Layout";
import Header from "../modules/Header";
import Body from "../modules/Body";
import Footer from "../modules/Footer";
import EmptySpace from "../modules/EmptySpace";
import { url, sitename } from "../../../config";
import { COMMON_COLOR, COMMON_TEXT_COLOR } from "../../../constants/index";
import { injectIntl } from "react-intl";
import { formatDate } from "ical-generator";
import messages from "../../../locale/messages";

class BookingRequestGuest extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      confirmationCode: PropTypes.number.isRequired,
      hostName: PropTypes.string.isRequired,
      guestName: PropTypes.string.isRequired,
      checkIn: PropTypes.string.isRequired,
      listTitle: PropTypes.string.isRequired,
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
        guestName,
        listTitle,
        hostName,
        checkIn,
        threadId,
        confirmationCode,
        logo,
      },
    } = this.props;
    let checkInDate =
      checkIn != null ? moment(checkIn).format("ddd, Do MMM, YYYY") : "";
    let messageURL = url + "/message/" + threadId + "/renter";

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
                    `${formatMessage(messages.tripReq)}(${confirmationCode}) $
                    {formatMessage(messages.startingOn)} ${checkInDate} $
                    {formatMessage(messages.sentToMotorcycleOwner)} ${hostName}.
                    ${formatMessage(messages.hearFromThem)}`
                  </div>
                  <EmptySpace height={40} />
                  <div style={btnCenter}>
                    <a href={messageURL} style={buttonStyle}>
                      `${formatMessage(messages.ContactMessage)} ${hostName}`
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

export default injectIntl(BookingRequestGuest);
