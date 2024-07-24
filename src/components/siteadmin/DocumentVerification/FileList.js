import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, gql, compose } from "react-apollo";
import s from "./DocumentVerification.css";
import cx from "classnames";

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  handleChange = (action) => {
    this.setState((prev) => (prev.isModalOpen = action));
  };

  render() {
    const { data } = this.props;
    let pdf = "PDF";
    let img = "Image";
    let path = "/images/document/";

    return (
      <div>
        <div className={s.links} onClick={() => this.handleChange(true)}>
          {" "}
          Images{" "}
        </div>
        {this.state.isModalOpen && (
          <div
            className={s.backdrop}
            onClick={(e) =>
              e.currentTarget === e.target && this.handleChange(false)
            }
          >
            <div className={s.modal}>
              <div
                className={cx(s.closeColor, "closeColorRTL")}
                onClick={() => this.handleChange(false)}
              >
                ×
              </div>
              {data.map((item, index) => {
                let icon = item.fileType == "application/pdf" ? pdf : img;
                return (
                  <div className={s.imgContainer} key={index}>
                    <img
                      className={s.img}
                      src={item.fileName}
                      alt="passport"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default FileList;
