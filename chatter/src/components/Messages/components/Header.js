import React from 'react';
import UserProfile from '../../../common/components/UserProfile';

export default function Header() {
  return (
    <div className="messages__header">
      <div className="messages__header__left-content">
        <UserProfile name="Botty" icon="fas fa-comment-dots" color="#4DB8EF" />
        <div className="messages__header__left-content__text">
          <h1>Botty <div className="messages__header__online-dot" /></h1>
          <p>Cloud, The Internet</p>
        </div>
      </div>
      <div className="messages__header__right-content">
        <div className="messages__header__status">
          <i className="mdi mdi-eye-outline" />
          <p className="no-margin">botty-beep-boop</p>
        </div>
        <div className="messages__header__status">
          <i className="far fa-clock" />
          <p className="no-margin">5m</p>
        </div>
      </div>
    </div>
  );
}
