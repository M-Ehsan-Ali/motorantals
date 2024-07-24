import React from "react";
import PropTypes from "prop-types";
import Layout from "../layouts/Layout";
import Header from "../modules/Header";
import Body from "../modules/Body";
import Footer from "../modules/Footer";
import EmptySpace from "../modules/EmptySpace";
import { url, sitename } from "../../../config";
import { COMMON_TEXT_COLOR } from "../../../constants/index";
import { injectIntl } from "react-intl";
import messages from "../../../locale/messages";

class ContactSupport extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      ContactMessage: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      userType: PropTypes.string.isRequired,
      listId: PropTypes.number.isRequired,
      confirmationCode: PropTypes.number.isRequired,
    }),
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
    let textBold = {
      fontWeight: "bold",
    };
    const {
      content: {
        ContactMessage,
        email,
        name,
        confirmationCode,
        userType,
        listId,
        logo,
      },
    } = this.props;

    return (
      <Layout>
        <Header
          color="rgb(255, 90, 95)"
          backgroundColor="#F7F7F7"
          logo={logo}
        />
        <Body textStyle={textStyle}>
          <div>
            <FormattedMessage {...messages.hiAdmin} />
          </div>
          <EmptySpace height={20} />
          <div>
            `${userType} ${formatMessage(messages.contactWantSupport)} $
            {confirmationCode} ${formatMessage(messages.onThePropId)} ${listId}
            .`
          </div>
          <EmptySpace height={20} />
          <div>
            <span style={textBold}>{`${formatMessage(
              messages.contactName
            )}:`}</span>{" "}
            {name}
            <br />
            <span style={textBold}>{`${formatMessage(
              messages.contactEmail
            )}:`}</span>{" "}
            {email}
            <br />
            <span style={textBold}>{`${formatMessage(
              messages.ContactMessage
            )}:`}</span>{" "}
            {ContactMessage}
            <br />
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

export default injectIntl(ContactSupport);
