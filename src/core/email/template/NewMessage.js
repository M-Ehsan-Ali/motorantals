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

class NewMessage extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      receiverName: PropTypes.string.isRequired,
      userType: PropTypes.string.isRequired,
      senderName: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
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
      content: { receiverName, type, senderName, message, threadId, logo },
    } = this.props;
    let messageURL = url + "/message/" + threadId + "/renter";
    if (type === "owner") {
      messageURL = url + "/message/" + threadId + "/owner";
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
                  <div>{`${formatMessage(messages.hi)} ${receiverName},`}</div>

                  <EmptySpace height={20} />
                  <div>{`${formatMessage(
                    messages.gotNewMessageFrom
                  )} ${senderName}.`}</div>
                  <EmptySpace height={20} />
                  <div>{`${formatMessage(messages.ContactMessage)}:`}</div>
                  <EmptySpace height={10} />
                  <div>{message}</div>
                  <EmptySpace height={40} />
                  <div style={btnCenter}>
                    <a href={messageURL} style={buttonStyle}>
                      {`${formatMessage(messages.respondTo)} ${senderName}`}
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

export default injectIntl(NewMessage);
