import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import history from '../../core/history';

import { NavItem } from 'react-bootstrap';
// Redux action
import { toggleClose } from '../../actions/Menu/toggleControl';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class NavLink extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    target: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.any,
    noLink: PropTypes.bool,
    className: PropTypes.string,
    toggleClose: PropTypes.any.isRequired,
  };

  handleClick = (event) => {
    const { noLink, toggleClose, target } = this.props;
    toggleClose();
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    
  
    if (!noLink) {
      if (target) {
        window.open(this.props.to, target);
      } else {
        history.push(this.props.to);
      }
    }
  };

  render() {
    const { to, children, className, target } = this.props;
    return <NavItem target={target} href={to} onClick={this.handleClick} className={className}>{children}</NavItem>;
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  toggleClose
};

export default connect(mapState, mapDispatch)(NavLink);
