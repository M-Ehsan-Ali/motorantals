import PropTypes from "prop-types";
import { Component } from "react";
import { connect } from "react-redux";
import { setOmiseInstance } from "../actions/omise";

class AsyncOmiseProvider extends Component {
  static propTypes = {
    apiKey: PropTypes.string.isRequired,
    setOmiseInstance: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this._mounted = true;
    const { apiKey } = this.props;
    const script = document.createElement("script");
    script.src = "https://cdn.omise.co/omise.js";
    script.async = true;
    script.onload = () => {
      if (window.Omise) {
        window.Omise.setPublicKey(apiKey);
        this.props.setOmiseInstance(window.Omise);
      }
    };
    console.log("script", script);
    document.body.appendChild(script);
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const { omiseInstance } = this.props;

    return (
      // Render children only when omiseInstance is available
      this.props.children
    );
  }
}

const mapStateToProps = (state) => ({
  omiseInstance: state.omiseInstance,
});

const mapDispatchToProps = {
  setOmiseInstance,
};

export default connect(mapStateToProps, mapDispatchToProps)(AsyncOmiseProvider);
