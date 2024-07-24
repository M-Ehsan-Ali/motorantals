import React from "react";
import PropTypes from "prop-types";
import Layout from "../layouts/Layout";
import Header from "../modules/Header";
import Body from "../modules/Body";
import Footer from "../modules/Footer";
import EmptySpace from "../modules/EmptySpace";
import { url, sitename } from "../../../config";
import { COMMON_COLOR, COMMON_TEXT_COLOR } from "../../../constants/index";
import { FormattedMessage, injectIntl } from "react-intl";
import messages from "../../../locale/messages";

class ConfirmDocumentVerification extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      verificationStatus: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  };

  render() {
    const { formatMessage } = this.props.intl;
    const buttonStyle = {
      margin: 0,
      fontFamily: "Arial",
      padding: "10px 16px",
      textDecoration: "none",
      borderRadius: "2px",
      border: "1px solid",
      textAlign: "center",
      verticalAlign: "middle",
      fontWeight: "normal",
      fontSize: "18px",
      whiteSpace: "nowrap",
      background: "#ffffff",
      borderColor: COMMON_COLOR,
      backgroundColor: COMMON_COLOR,
      color: "#ffffff",
      borderTopWidth: "1px",
    };

    const textStyle = {
      color: COMMON_TEXT_COLOR,
      backgroundColor: "#F7F7F7",
      fontFamily: "Arial",
      fontSize: "16px",
      padding: "35px",
    };
    const {
      content: { verificationStatus, name, logo },
    } = this.props;
    let verificationURL = url + `/en-US/user/verification`;

    return (
      <Layout>
        <Header
          color="rgb(255, 90, 95)"
          backgroundColor="#F7F7F7"
          logo={logo}
        />
        <Body textStyle={textStyle}>
          <div>{`${formatMessage(messages.hi)} ${name},`}</div>

          <EmptySpace height={20} />
          <div>{`${formatMessage(messages.dashBoardHeader)} ${sitename}!`}</div>
          <EmptySpace height={20} />
          <div>
            `${formatMessage(messages.documentsHasBeen)} ${verificationStatus} $
            {formatMessage(messages.docVerificationProc)}`
          </div>
          <EmptySpace height={40} />
          <div>
            <a style={buttonStyle} href={verificationURL}>
              <FormattedMessage {...messages.checkYourProfile} />
            </a>
          </div>
          <EmptySpace height={30} />
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

export default injectIntl(ConfirmDocumentVerification);
