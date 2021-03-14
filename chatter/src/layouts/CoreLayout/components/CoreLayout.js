import React from 'react';
import { LatestMessages } from '../../../contexts/LatestMessages/LatestMessages';
import ContactPanel from '../../../components/ContactPanel';
import UserList from '../../../components/UserList';
import Messages from '../../../components/Messages';
import IconBackground from './IconBackground';
import '../styles/_core-layout.scss';

export default function CoreLayout() {
  return (
    <div className="core">
      <IconBackground />
      <LatestMessages>
        <UserList />
        <Messages />
        <ContactPanel />
     </LatestMessages>
    </div>
  );
}
