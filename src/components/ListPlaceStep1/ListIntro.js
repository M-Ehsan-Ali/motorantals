// General
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux Form
import { Field, reduxForm } from "redux-form";

// Redux
import { connect } from "react-redux";

// Translation
import { injectIntl, FormattedMessage } from "react-intl";

// Locale
import messages from "../../locale/messages";

// Style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { Grid, Button } from "react-bootstrap";
import s from "./ListPlaceStep1.css";
import cs from "../../components/commonStyle.css";

import update from "./update";

// Component
import Avatar from "../Avatar";
import DocumentList from "../DocumentList/DocumentList";

// Images
import sayIcon from "/public/SiteIcons/sayIcon.png";
import arrowIcon from "/public/SiteIcons/letGoIcon.svg";
import footerImage from "/public/siteImages/onboardFooterImage.svg";
import { compose, graphql } from "react-apollo";
import ShowDocumentListQuery from "../DocumentList/ShowListDocument.graphql";
import RemoveDocumentList from "../DocumentList/RemoveDocumentList.graphql";

class ListIntro extends Component {
  static propTypes = {
    initialValues: PropTypes.object,
    hostDisplayName: PropTypes.string.isRequired,
    guestDisplayName: PropTypes.string,
    nextPage: PropTypes.any,
    hostPicture: PropTypes.string,
    guestPicture: PropTypes.string,
    userData: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      verification: PropTypes.shape({
        isIdVerification: PropTypes.bool,
      }),
    }).isRequired,
  };

  static defaultProps = {
    userData: {
      firstName: "",
      verification: {
        isIdVerification: false,
      },
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      roomType: [],
      personCapacity: [],
    };
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType,
        personCapacity: listingFields.personCapacity,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        roomType: listingFields.roomType,
        personCapacity: listingFields.personCapacity,
      });
    }
  }

  render() {
    const {
      nextPage,
      userData,
      hostPicture,
      hostDisplayName,
      guestDisplayName,
    } = this.props;

    console.log("USER DATA ==>", userData);
    console.log("props", this.props);

    return (
      <div className={cx(cs.textAlignCenter)}>
        {/* <div className={cx(s.listIntroBg, 'listIntroBgImage')} style={{ backgroundImage: `url(${BgImage})` }} ></div> */}
        <Grid fluid className={cx(s.listIntroContainers, s.listIntroBgSection)}>
          {/*or passport*/}
          <div className={s.userRight}>
            <Avatar
              isUser
              title={guestDisplayName}
              className={s.profileImage}
              width={"120"}
              height={"120"}
              defaultRender
            />
          </div>
          <h3
            className={cx(cs.commonTitleText, cs.fontWeightBold, cs.spaceTop3)}
          >
            <img src={sayIcon} className={s.sayCss} />{" "}
            <FormattedMessage {...messages.hiText} />,
            <span className={s.userNameColor}>{userData.firstName}!</span>
          </h3>
          {userData.verification?.isIdVerification ? (
            <>
              <p
                className={cx(
                  cs.commonTotalText,
                  cs.spaceTop3,
                  cs.spaceBottom6
                )}
              >
                <FormattedMessage {...messages.onboardText} />
              </p>
              <Button
                className={cx(s.button, s.btnPrimary)}
                onClick={() => nextPage("car")}
              >
                <FormattedMessage {...messages.LetsgoText} />{" "}
                <img
                  src={arrowIcon}
                  className={cx("arrowIconListRTL", "saveArrowCss")}
                />
              </Button>
            </>
          ) : (
            <>
              <p className={cx(cs.commonMinTitleText, cs.spaceTop6)}>
                <FormattedMessage {...messages.thanksFor} />
              </p>
              <p
                className={cx(
                  cs.commonTitleText,
                  cs.spaceTop6,
                  cs.fontWeightMedium
                )}
              >
                <FormattedMessage {...messages.listIntroInfo} />
              </p>
              <p
                className={cx(
                  cs.commonBigTitleText,
                  cs.spaceTop1,
                  cs.fontWeightExtraBold
                )}
              >
                <FormattedMessage {...messages.pendingUpperCase} />
              </p>
              <div
                className={cx(cs.commonMinTitleText)}
                style={{ maxWidth: "40%", margin: "0 auto", marginTop: "36px" }}
              >
                <p>
                  <FormattedMessage {...messages.appReview} />
                </p>
                <p>
                  <FormattedMessage {...messages.listIntroCheckEmail} />
                </p>
              </div>
            </>
          )}
        </Grid>
        <img src={footerImage} className={cx(s.footerImageOnboard)} />
      </div>
    );
  }
}

ListIntro = reduxForm({
  form: "ListPlaceStep1", // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update,
})(ListIntro);

const mapState = (state) => ({
  userData: state.account.data,
  listingFields: state.listingFields.data,
});

const mapDispatch = {};

export default injectIntl(
  withStyles(s, cs)(connect(mapState, mapDispatch)(ListIntro))
);
