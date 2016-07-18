import React, { Component, PropTypes } from 'react';
import SettingsNavItem from './SettingsNavItem.jsx';

const propTypes = {
  activeIndex: PropTypes.number
};

export default class SettingsNav extends Component {
  constructor(props) {
    super(props);
    this.navItems = [
      {url: '/settings/profile', name: 'Profile'},
      {url: '#', name: 'History'},
      {url: '/settings/payment', name: 'Payment'},
      {url: '#', name: 'Payout'},
      {url: '#', name: 'Promos'}
    ];
    this.navItems[this.props.activeIndex].isActive = true;
  }

  render() {
    return (
      <div className="settings-nav">
        <div className="container">
          <ul className="nav nav-pills nav-justified">
            {this.navItems.map((navItem, i) => {
               return (
                 <SettingsNavItem
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

SettingsNav.propTypes = propTypes;
