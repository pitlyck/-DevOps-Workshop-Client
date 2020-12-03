import * as React from 'react';
import { ProfileFieldsContainer } from '../containers/ProfileFieldsContainer';
import { ProfileAvatarSettingsContainer } from '../containers/ProfileAvatarSettingsContainer';

export const ProfileView: React.SFC = () => (
  <div>
    <div>
      <section className="user-profile">
        <ProfileAvatarSettingsContainer/>
        <ProfileFieldsContainer/>
      </section>
    </div>
  </div>
);

ProfileView.displayName = 'ProfileView';
