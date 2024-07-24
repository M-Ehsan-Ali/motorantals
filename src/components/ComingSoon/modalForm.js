import React, { useState } from "react";
import { Button, FormGroup, FormControl, Modal } from "react-bootstrap";

import s from "./ComingSoon.css";
import cx from "classnames";
import cs from "../../components/commonStyle.css";

import bgImage from "/public/siteImages/carLoginBg.jpeg";
import { FormattedMessage, injectIntl } from "react-intl";
import messages from "../../locale/messages";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { Field, reduxForm } from "redux-form";

import validate from "./validate";
import submit from "./submit";

import arrow from "/public/siteImages/whiteArrow.svg";
import { toastr } from "react-redux-toastr";

function ModalForm({
  email,
  isModalOpen,
  updateModalState,
  intl,
  handleSubmit,
}) {
  const { formatMessage } = intl;
  const cities = [
    "Bangkok",
    "Chiang Mai",
    "Koh Samui",
    "Phuket",
    "Hua Hin",
    "Pattaya",
    "Chiang Rai",
    "Other",
  ];
  const days = [];
  for (let i = 1; i <= 100; i++) {
    days.push(i);
  }

  const renderFormControl = ({
    input,
    label,
    type,
    meta: { touched, error },
    className,
    showPassword,
    maxLength,
  }) => {
    return (
      <div className={cx("inputFocusColor", cs.positionRelative)}>
        <label>{label}</label>
        <FormControl
          {...input}
          placeholder={label}
          type={showPassword === input.name ? input : type}
          className={className}
          maxLength={maxLength}
        />

        {touched && error && (
          <span className={cs.errorMessage}>{formatMessage(error)}</span>
        )}
      </div>
    );
  };

  const renderFormControlSelect = ({
    input,
    meta: { touched, error },
    children,
    label,
    className,
  }) => {
    return (
      <div className={cx("inputFocusColor", cs.positionRelative)}>
        <label>{label}</label>
        <FormControl
          componentClass="select"
          {...input}
          className={cx(className, "selectBgImage")}
        >
          {children}
        </FormControl>
        {touched && error && (
          <span className={cs.errorMessage}>{formatMessage(error)}</span>
        )}
      </div>
    );
  };

  return (
    // <div className={s.backdrop}>
    //   <div className={s.modal}></div>
    // </div>
    <Modal
      show={isModalOpen}
      animation={false}
      onHide={() =>
        updateModalState((prev) => ({ ...prev, isModalOpen: false }))
      }
      className={"loginModal"}
    >
      <div
        className={s.carImage}
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className={cx(s.sectionBlock, "loginModelSectionBlock")}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleSubmit(
              submit.bind(null, formatMessage, updateModalState, email)
            )}
            className={s.form}
          >
            <h3
              className={cx(
                cs.commonMinTitleText,
                cs.fontWeightBold,
                cs.textAlignCenter
              )}
            >
              <p>
                <FormattedMessage {...messages.comingSoonModalTitle1} />
              </p>
              <p>
                <FormattedMessage {...messages.comingSoonModalTitle2} />
              </p>
            </h3>

            <FormGroup className={cs.spaceBottom3}>
              <Field
                name="name"
                type="text"
                component={renderFormControl}
                label={`${formatMessage(messages.your)} ${formatMessage(
                  messages.name
                )}`}
                className={cx(cs.formControlInput, "commonInputPaddingRTL")}
                maxLength={255}
              />
            </FormGroup>

            <FormGroup className={cs.spaceBottom3}>
              <Field
                name="trip"
                type="date"
                component={renderFormControl}
                label={formatMessage(messages.dayOfTripToThai)}
                className={cx(cs.formControlInput, "commonInputPaddingRTL")}
                maxLength={255}
              />
            </FormGroup>

            <FormGroup className={cs.spaceBottom3}>
              <Field
                name="location"
                label={formatMessage(messages.locationOfTripToThai)}
                component={renderFormControlSelect}
                className={cx(cs.formControlInput, "commonInputPaddingRTL")}
              >
                <option value="">{formatMessage(messages.location)}</option>
                {cities.map((item, key) => {
                  return (
                    <option key={key} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Field>
            </FormGroup>

            <FormGroup className={cs.spaceBottom3}>
              <Field
                name="howLong"
                label={formatMessage(messages.needToMotorbike)}
                component={renderFormControlSelect}
                className={cx(cs.formControlInput, "commonInputPaddingRTL")}
              >
                {days.map((item, key) => {
                  return (
                    <option key={key} value={item}>
                      {item}
                    </option>
                  );
                })}
              </Field>
            </FormGroup>

            {/* <FormGroup className={cs.spaceBottom3}>
              <Field
                name="howLong"
                type="text"
                component={renderFormControl}
                label={formatMessage(messages.needToMotorbike)}
                className={cx(cs.formControlInput, "commonInputPaddingRTL")}
                maxLength={255}
              />
            </FormGroup> */}

            <Button
              className={cx(cs.btnPrimary, cs.spaceTop2)}
              block
              type="submit"
              //   disabled={submitting || this.state.isDisabled}
            >
              {formatMessage(messages.submit)}
              <img
                src={arrow}
                className={cx(cs.blueLeftArrow, "loginArrowRTL")}
              />
            </Button>
          </form>
        </Modal.Body>
      </div>
    </Modal>
  );
}

ModalForm = reduxForm({
  form: "ModalForm", // a unique name for this form
  validate,
  destroyOnUnmount: true,
})(ModalForm);

const mapState = (state) => ({});

const mapDispatch = {};

export default injectIntl(
  withStyles(s, cs)(connect(mapState, mapDispatch)(ModalForm))
);
