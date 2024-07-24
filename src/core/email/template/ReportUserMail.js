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

class ReportUserMail extends React.Component {
  static propTypes = {
    content: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      reporterName: PropTypes.string.isRequired,
      reportType: PropTypes.string.isRequired,
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
    const {
      content: { userName, reporterName, reportType, logo, defaultContent },
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
          {defaultContent ? (
            <div>
              {`${formatMessage(
                messages.thisInformYouThat
              )} ${userName} ${formatMessage(
                messages.hasViolatedTheTerms
              )} ${reporterName}.`}
            </div>
          ) : (
            <div>
              {`${formatMessage(
                messages.receiveEmailToReport
              )} ${userName} ${formatMessage(
                messages.theReportType
              )} ${reportType} ${formatMessage(messages.by)} ${reporterName}.`}
            </div>
          )}
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

export default injectIntl(ReportUserMail);
