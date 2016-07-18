import React, { Component, PropTypes } from 'react';
import NavItem from './NavItem.jsx';

const propTypes = {
  activeIndex: PropTypes.number
};

export default class SubNav extends Component {
  constructor(props) {
    super(props);
    this.navItems = [
      {url: '/dashboard/browse', name: 'Browse'},
      {url: '/dashboard/requests', name: 'My Requests'},
      {url: '/dashboard/offers', name: 'My Offers'},
      {url: '/dashboard/profile', name: 'Settings'}
    ];
    this.navItems[this.props.activeIndex].isActive = true;
  }

  render() {
    return (
      <div className="sub-nav">
        <div className="container">
          <ul className="nav nav-pills nav-justified">
            {this.navItems.map((navItem, i) => {
              return (
                <NavItem
                  key={i}
                  url={navItem.url}
                  name={navItem.name}
                  isActive={navItem.isActive}
                />
              );
            })}
          </ul>
        </div>
      </div>
    )
  }
}

SubNav.propTypes = propTypes;
