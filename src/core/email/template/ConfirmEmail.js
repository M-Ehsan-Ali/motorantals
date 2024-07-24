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
import { compose } from "redux";

class ConfirmEmail extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      token: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  };

  render() {
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
      content: { token, email, name, logo },
    } = this.props;
    const { formatMessage } = this.props.intl;

    let verificationURL =
      url + `/en-US/user/verification?confirm=${token}&email=${email}`;
    let firstName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <Layout>
        <Header
          color="rgb(255, 90, 95)"
          backgroundColor="#F7F7F7"
          logo={logo}
        />
        <Body textStyle={textStyle}>
          <div>{`${formatMessage(messages.dear)} ${firstName},`}</div>
          <EmptySpace height={20} />
          <div>
            {`${formatMessage(
              messages.dashBoardHeader
            )} ${sitename}! ${formatMessage(messages.confirmEmailInfo)}`}
          </div>
          <EmptySpace height={40} />
          <div>
            <a style={buttonStyle} href={verificationURL}>
              <FormattedMessage {...messages.confirmEmail} />
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

export default injectIntl(ConfirmEmail);
