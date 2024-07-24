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
import { FormattedMessage, injectIntl } from "react-intl";
import messages from "../../../locale/messages";

class CompletedReservationGuest extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      reservationId: PropTypes.number.isRequired,
      hostName: PropTypes.string.isRequired,
      hostLastName: PropTypes.string.isRequired,
      hostProfilePic: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { formatMessage } = this.props.intl;
    const textStyle = {
      color: COMMON_TEXT_COLOR,
      backgroundColor: "#F7F7F7",
      fontFamily: "Arial",
      fontSize: "16px",
      padding: "10px",
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

    const bookingTitle = {
      paddingBottom: "20px",
      fontWeight: "bold",
      fontSize: "20px",
      lineHeight: "25px",
      margin: "0",
      padding: "0",
      textAlign: "center",
    };

    const profilePic = {
      borderRadius: "999px",
      margin: "0",
      padding: "0",
      lineHeight: "150%",
      borderSpacing: "0",
      width: "125px",
    };

    const userName = {
      color: "#565a5c",
      fontSize: "26px",
      fontWeight: "bold",
      paddingBottom: "5px",
    };

    const subTitle = {
      color: "#565a5c",
      fontSize: "18px",
      fontWeight: "bold",
      paddingBottom: "5px",
    };

    const {
      content: { reservationId, logo },
    } = this.props;
    const {
      content: { hostName, hostLastName, hostProfilePic },
    } = this.props;
    let messageURL = url + "/review/write/" + reservationId;
    let imageURL;
    if (hostProfilePic) {
      imageURL = url + "/images/avatar/medium_" + hostProfilePic;
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
                  <div>
                    {hostProfilePic && (
                      <img style={profilePic} src={imageURL} height={125} />
                    )}
                  </div>
                  <EmptySpace height={20} />
                  <h1 style={bookingTitle}>
                    `${formatMessage(messages.contactHostinfo2)} ${hostName} $
                    {hostLastName} ${formatMessage(messages.whatYouLoved)}`{" "}
                    <br />
                    <span>
                      {" "}
                      <FormattedMessage {...messages.whatTheyCanBetter} />
                    </span>
                  </h1>
                  <EmptySpace height={20} />
                  <div>
                    <FormattedMessage {...messages.endedYourTripNow} />
                  </div>
                  <EmptySpace height={20} />
                  <div>
                    `${formatMessage(messages.reviewsImportantPart)} ${sitename}{" "}
                    ${formatMessage(messages.plsTakeAMoment)}`
                  </div>
                  <EmptySpace height={50} />
                  <div>
                    <a href={messageURL} style={buttonStyle}>
                      <FormattedMessage {...messages.writeReview} />
                    </a>
                  </div>
                  <EmptySpace height={40} />
                </TD>
              </TR>
            </TBody>
          </Table>
          <EmptySpace height={50} />
        </div>
        <Footer />
        <EmptySpace height={20} />
      </Layout>
    );
  }
}

export default injectIntl(CompletedReservationGuest);
