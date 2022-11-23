import React from 'react';
import NotificationAlert from 'react-notification-alert';
import cs from 'classnames';
import classes from './Notifications.module.scss';

class Notifications extends React.Component {
  getOptions = (type, title, message, icon) => {
    switch (type) {
      case 'create':
        return {
          type: 'success',
          // adding mr-3 class in icon because default margin is slightly more
          icon: `${icon || 'fas fa-smile-beam'} mr-3`,
          message: (
            <div className="alert-text">
              <span className="alert-title" data-notify="title">
                {' '}
                {title || "Hooray! You're a creator!"}
              </span>
              <span data-notify="message">{message || ''}</span>
            </div>
          ),
        };
      case 'update':
        return {
          type: 'success',
          // adding mr-3 class in icon because default margin is slightly more
          icon: `${icon || 'fas fa-smile-beam'} mr-3`,
          message: (
            <div className="alert-text">
              <span className="alert-title" data-notify="title">
                {' '}
                {title || 'Success!'}
              </span>
              <span data-notify="message">{message || ''}</span>
            </div>
          ),
        };
      case 'warning':
        return {
          type: 'warning',
          // adding mr-3 class in icon because default margin is slightly more
          icon: `${icon || 'fas fa-frown-open'} mr-3`,
          message: (
            <div className="alert-text">
              <span className="alert-title" data-notify="title">
                {' '}
                {title || 'Uh oh! Something went wrong'}
              </span>
            </div>
          ),
        };
      case 'failure':
        return {
          type: 'danger',
          // adding mr-3 class in icon because default margin is slightly more
          icon: `${icon || 'fas fa-frown'} mr-3`,
          message: (
            <div className="alert-text">
              <span className="alert-title" data-notify="title">
                {' '}
                {title || 'Uh oh! Something went wrong'}
              </span>
              <span data-notify="message">
                {message || 'Please try again later'}
              </span>
            </div>
          ),
        };
      default:
        return {
          type: 'success',
          // adding mr-3 class in icon because default margin is slightly more
          icon: `${icon || 'fas fa-smile-beam'} mr-3`,
          message: (
            <div className="alert-text">
              <span className="alert-title" data-notify="title">
                {' '}
                {title || "Hooray! You're a creator!"}
              </span>
              <span data-notify="message">{message || ''}</span>
            </div>
          ),
        };
    }
  };

  show = options => {
    const notifyOptions = this.getOptions(
      options.operation,
      options.title,
      options.message,
      options.icon,
    );
    // eslint-disable-next-line react/no-string-refs
    this.refs.notificationAlert.notificationAlert({
      ...options,
      ...notifyOptions,
    });
  };

  render() {
    return (
      <>
        <div className={cs('rna-wrapper', classes.root)}>
          {/* eslint-disable-next-line react/no-string-refs */}
          <NotificationAlert ref="notificationAlert" />
        </div>
      </>
    );
  }
}

export default Notifications;
