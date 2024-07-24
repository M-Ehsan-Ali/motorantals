import React, { Component } from "react";
import PropTypes from "prop-types";
// Translation
import { injectIntl, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import s from "./HomeType.css";
import cs from "../../../commonStyle.css";
import { Button, Collapse } from "react-bootstrap";
import cx from "classnames";
// Redux Form
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  submit as submitForm,
} from "redux-form";
// Redux
import { connect } from "react-redux";
// Locale
import messages from "../../../../locale/messages";
// Submit
import submit from "../../SearchForm/submit";
import CustomCheckbox from "../../../CustomCheckbox";
//Image
import typeIcon from "/public/siteImages/steering.svg";
import downIcon from "/public/SiteIcons/Show-down-arrow.svg";
import upIcon from "/public/SiteIcons/Show-up-arrow.svg";
import ApolloClient from "apollo-client";
import { gql } from "react-apollo";
class HomeType extends Component {
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      roomType: [],
    },
    homeType: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      translatedItems: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.setBtnWrapperRef = this.setBtnWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.renderCollapse = this.renderCollapse.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    this.fetchTranslations();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.fieldsSettingsData.carType !==
      this.props.fieldsSettingsData.carType
    ) {
      this.fetchTranslations();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  async fetchTranslations() {
    console.log(this.props.fieldsSettingsData);
    const { carType } = this.props.fieldsSettingsData;
    const locales = [
      "ar",
      "de-DE",
      "en-US",
      "es",
      "fr-FR",
      "hi-IN",
      "it-IT",
      "ja-JP",
      "ko-KR",
      "ms-MY",
      "pt-PT",
      "ru-RU",
      "th-TH",
      "zh-CN",
    ];
    const settingsIds = carType.flatMap((item) =>
      locales.map((locale) => `settings.${item.id}.${locale}`)
    );
    const descriptionIds = carType.flatMap((item) =>
      locales.map((locale) => `settings.description.${item.id}.${locale}`)
    );

    const ids = [...settingsIds, ...descriptionIds];

    const client = new ApolloClient({
      uri: "http://localhost:3001/graphql",
    });

    const GET_TRANSLATIONS = gql`
      query GetTranslations($ids: [String!]!) {
        getTranslations(ids: $ids) {
          id
          value
        }
      }
    `;

    try {
      const { data } = await client.query({
        query: GET_TRANSLATIONS,
        variables: { ids },
        skip: !carType || !ids || ids.length === 0,
      });

      this.setState({
        translatedItems: data,
      });
    } catch (error) {
      console.error("Error fetching translations:", error);
    }
  }

  async handleSubmit() {
    const { className, handleTabToggle, isExpand, handleSubmit } = this.props;
    const { change, submitForm } = this.props;
    await change("currentPage", 1);
    // submitForm('SearchForm');
    await handleSubmit();
    handleTabToggle("homeType", !isExpand);
  }

  handleReset() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    change("roomType", []);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  setBtnWrapperRef(node) {
    this.btnWrapperRef = node;
  }

  handleClickOutside(event) {
    const { className, handleTabToggle, isExpand, handleSubmit } = this.props;
    const { change, submitForm } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      change("currentPage", 1);
      // submitForm('SearchForm');
      handleSubmit();
      if (this.btnWrapperRef && !this.btnWrapperRef.contains(event.target)) {
        handleTabToggle("homeType", !isExpand);
      }
    }
  }

  handleToggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }

  checkboxHorizontalGroup = ({ label, name, options, input, isOpen }) => {
    const { formatMessage, locale } = this.props.intl;
    const { translatedItems } = this.state;

    let count = 4,
      firstArray = [],
      restArray = [];
    let itemList =
      options && options.length > 0
        ? options.filter((o) => o.isEnable == "1")
        : [];
    if (itemList && itemList.length > 0) {
      firstArray = itemList.slice(0, count);
      restArray = itemList.slice(count, itemList.length);
    }

    return (
      <div className={cx(s.displayTable)}>
        {firstArray &&
          firstArray.length > 0 &&
          firstArray.map((option, index) => {
            if (option.isEnable !== "1") {
              return <span maxPrice />;
            }

            const titleKey = `settings.${option.id}.${locale}`;
            const descriptionKey = `settings.description.${option.id}.${locale}`;

            const translatedTitleItem = translatedItems.getTranslations.find(
              (item) => {
                return item.id === titleKey;
              }
            );

            const translatedDescriptionItem = translatedItems.getTranslations.find(
              (item) => {
                return item.id === descriptionKey;
              }
            );

            let splitLineContent = translatedDescriptionItem
              ? translatedDescriptionItem.value.split("\n")
              : option.itemDescription && option.itemDescription.split("\n");

            let newSplitLineContent =
              splitLineContent &&
              splitLineContent.filter(function(el) {
                return el;
              });

            const itemName = translatedTitleItem
              ? translatedTitleItem.value
              : option.itemName;

            return (
              <div className={cx(s.displayTypeFlex, cs.paddingBottom3)}>
                <div className={s.checkboxSection}>
                  <CustomCheckbox
                    key={index}
                    className={"icheckbox_square-green"}
                    name={`${input.name}[${index}]`}
                    value={option.id}
                    checked={input.value.indexOf(option.id) !== -1}
                    onChange={(event) => {
                      const newValue = [...input.value];
                      if (event === true) {
                        newValue.push(option.id);
                      } else {
                        newValue.splice(newValue.indexOf(option.id), 1);
                      }
                      input.onChange(newValue);
                    }}
                  />
                </div>
                <img
                  src={typeIcon}
                  className={cx(
                    "imgIconRight",
                    s.iconCss,
                    "imgIconRightTypeRTL"
                  )}
                />
                <div>
                  {itemName}
                  <div>
                    {newSplitLineContent &&
                      newSplitLineContent.length > 0 &&
                      newSplitLineContent.map((itemValue, indexes) => {
                        return (
                          <span>
                            <p
                              className={s.dot}
                              dangerouslySetInnerHTML={{ __html: itemValue }}
                            />
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
        {this.renderCollapse(input, restArray, isOpen)}
      </div>
    );
  };

  renderCollapse(input, restArray, isOpen) {
    const { formatMessage, locale } = this.props.intl;
    const { translatedItems } = this.state;

    if (restArray && restArray.length > 0) {
      return (
        <div>
          <Collapse className={s.collapseContainer} in={isOpen}>
            <div>
              {restArray.map((option, index) => {
                const titleKey = `settings.${option.id}.${locale}`;
                const descriptionKey = `settings.description.${option.id}.${locale}`;

                const translatedTitleItem = translatedItems.getTranslations.find(
                  (item) => {
                    return item.id === titleKey;
                  }
                );

                const translatedDescriptionItem = translatedItems.getTranslations.find(
                  (item) => {
                    return item.id === descriptionKey;
                  }
                );

                let splitLineContent = translatedDescriptionItem
                  ? translatedDescriptionItem.value.split("\n")
                  : option.itemDescription &&
                    option.itemDescription.split("\n");

                let newSplitLineContent =
                  splitLineContent &&
                  splitLineContent.filter(function(el) {
                    return el;
                  });

                const itemName = translatedTitleItem
                  ? translatedTitleItem.value
                  : option.itemName;

                return (
                  <div className={cx(s.displayTypeFlex, cs.paddingBottom3)}>
                    <div className={s.checkboxSection}>
                      <CustomCheckbox
                        key={index}
                        className={"icheckbox_square-green"}
                        name={`${input.name}[${index}]`}
                        value={option.id}
                        checked={input.value.indexOf(option.id) !== -1}
                        onChange={(event) => {
                          const newValue = [...input.value];
                          if (event === true) {
                            newValue.push(option.id);
                          } else {
                            newValue.splice(newValue.indexOf(option.id), 1);
                          }
                          input.onChange(newValue);
                        }}
                      />
                    </div>
                    <img
                      src={typeIcon}
                      className={cx(
                        "imgIconRight",
                        s.iconCss,
                        "imgIconRightTypeRTL"
                      )}
                    />
                    <div>
                      {itemName}
                      <div>
                        {newSplitLineContent &&
                          newSplitLineContent.length > 0 &&
                          newSplitLineContent.map((itemValue, indexes) => {
                            return (
                              <span>
                                <p
                                  className={s.dot}
                                  dangerouslySetInnerHTML={{
                                    __html: itemValue,
                                  }}
                                />
                              </span>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Collapse>
          <Button
            bsStyle="link"
            type="button"
            className={cx(
              s.btn,
              s.btnLink,
              s.btnLinkSecondary,
              s.toggleLink,
              s.captionTitle,
              s.filterToggleLink,
              s.dropdownOverflow,
              "bgBlack",
              "bgBlackHover",
              s.showMoreBtn
            )}
            onClick={() => this.handleToggle()}
          >
            {isOpen
              ? formatMessage(messages.showLess)
              : formatMessage(messages.showMore)}
            {isOpen && <img src={upIcon} className={"showBtnGap"} />}
            {!isOpen && <img src={downIcon} className={"showBtnGap"} />}
          </Button>
        </div>
      );
    } else {
      return <span />;
    }
  }

  renterButtonLabel() {
    const {
      fieldsSettingsData: { carType },
      homeType,
    } = this.props;
    const { formatMessage } = this.props.intl;
    let buttonLabel = formatMessage(messages.carType);
    let singleHomeType;

    if (homeType && homeType.length > 0) {
      if (homeType.length > 1) {
        return (
          <span>
            {buttonLabel} <span className={s.dotCss}></span>{" "}
            <span className={s.lenghtCss}>{homeType.length}</span>
          </span>
        );
      } else if (homeType.length == 1) {
        singleHomeType = carType.filter((item) => {
          return item.id == homeType[0];
        });
        if (singleHomeType && singleHomeType.length > 0) {
          return <span>{singleHomeType[0].itemName}</span>;
        } else {
          return (
            <span>
              {buttonLabel} <span className={s.dotCss}></span>{" "}
              <span className={s.lenghtCss}>{homeType.length}</span>
            </span>
          );
        }
      }
    }
    return <span>{buttonLabel}</span>;
  }

  render() {
    const { className, handleTabToggle, isExpand, filterIcon } = this.props;
    const {
      fieldsSettingsData: { carType },
      homeType,
    } = this.props;
    const { formatMessage } = this.props.intl;
    const { isOpen } = this.state;

    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <Button
            className={cx(
              { [s.btnSecondary]: isExpand === true || homeType.length > 0 },
              s.btn
            )}
            onClick={() => handleTabToggle("homeType", !isExpand)}
          >
            <img
              src={filterIcon}
              className={cx(
                "searchHeaderIcon",
                s.carTypeIcon,
                "searchHeaderIconWidth"
              )}
            />{" "}
            {this.renterButtonLabel()}
          </Button>
        </div>
        {isExpand && (
          <div
            className={cx(s.searchFilterPopover, "searchFilterPopoverRTL")}
            ref={this.setWrapperRef}
          >
            <div className={s.searchFilterPopoverContent}>
              <Field
                name="roomType"
                component={this.checkboxHorizontalGroup}
                options={carType}
                isOpen={isOpen}
              />
              <div className={cx(s.searchFilterPopoverFooter, s.applyFlex)}>
                <Button
                  bsStyle="link"
                  className={cx(s.btnLink, s.applyBtn)}
                  onClick={this.handleSubmit}
                >
                  <FormattedMessage {...messages.apply} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

HomeType = reduxForm({
  form: "SearchForm", // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(HomeType);

// Decorate with connect to read form values
const selector = formValueSelector("SearchForm"); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  homeType: selector(state, "roomType"),
});

const mapDispatch = {
  change,
  submitForm,
};

export default injectIntl(
  withStyles(s, cs)(connect(mapState, mapDispatch)(HomeType))
);
