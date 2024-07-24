import React, { Component } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-bootstrap/lib/Navbar";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
//style
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import s from "./ComingSoon.css";
import logo from "./img/logo.png";
import NavLink from "../NavLink/NavLink";

import currencyIconTwo from "/public/SiteIcons/currencyIcon.svg";
import { openHeaderModal } from "../../actions/modalActions";

import Logo from "../Logo";
import HeaderModal from "../HeaderModal/HeaderModal";
import Toaster from "../Toaster/Toaster";
import messages from "../../locale/messages";
import { toastr } from "react-redux-toastr";
import ModalForm from "./modalForm";

class ComingSoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isValidEmail: true,
      isModalOpen: false,
    };
  }

  handleSubmit = (e) => {
    const { formatMessage } = this.props.intl;
    e.preventDefault();

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(this.state.email)) {
      this.setState({ isValidEmail: false });
      return;
    }

    this.setState((prev) => ({
      ...prev,
      isValidEmail: true,
      isModalOpen: true,
    }));
  };
  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  updateModalState = (newState) => {
    this.setState(newState);
  };
  render() {
    const { openHeaderModal } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <main className={s.soonWrap}>
        <Toaster />
        <HeaderModal />
        <div className={s.soonWrapBlur}>
          <div className={s.soonContainer}>
            <Image className={s.soonLogo} src={logo} alt={"Company Logo"} />
            <div className={s.soonTitleWrap}>
              <h1 className={s.soonTitle}>
                <FormattedMessage {...messages.soonPageTitle} />
                {/* {formatMessage(messages.soonPageTitle)} */}
              </h1>
            </div>
            <h2 className={s.soonMinTitle}>
              <FormattedMessage {...messages.soonPageMinTitle} />
            </h2>
            <p className={s.soonDesc}>
              <FormattedMessage {...messages.soonPageDesc} />{" "}
            </p>
            <a className={s.soonLink} href="mailto:help@motorentals.co">
              help@motorentals.co
            </a>

            <form
              className={s.inputWrap}
              onSubmit={(e) => this.handleSubmit(e)}
            >
              <input
                name="email"
                value={this.state.email}
                onChange={(e) => this.handleChange(e)}
                className={s.input}
                placeholder={formatMessage(messages.yourEmail)}
              ></input>
              {!this.state.isValidEmail && (
                <span className={s.wrongEmail}>
                  <FormattedMessage {...messages.emailInvalid} />
                </span>
              )}
              <button type="submit" className={s.inputBtn}>
                <FormattedMessage {...messages.notifyMe} />{" "}
              </button>
            </form>
            {/* <Link
              href="https://zc.vg/sf/kGr06"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button type="button" className={s.inputBtn}>
                <FormattedMessage {...messages.notifyMe} />{" "}
              </button>
            </Link> */}
          </div>
        </div>

        <nav className={s.languageButton}>
          <ul className={s.headerList}>
            <Logo link={"/"} className={cx(s.brand, s.brandImg)} />
            <NavLink noLink onClick={() => openHeaderModal("languageModal")}>
              <img src={currencyIconTwo} />
            </NavLink>
          </ul>
        </nav>
        <ModalForm
          email={this.state.email}
          isModalOpen={this.state.isModalOpen}
          updateModalState={this.updateModalState}
        />
      </main>
    );
  }
}
const mapState = (state) => ({
  currentLocale: state.intl.locale,
});
const mapDispatch = {
  openHeaderModal,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(ComingSoon))
);
