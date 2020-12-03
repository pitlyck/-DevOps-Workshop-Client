import * as React from 'react';
import * as Immutable from 'immutable';
import * as PropTypes from 'prop-types';
import { IAnnotatedUser } from './Message';
import { Avatar } from '../../profile/components/Avatar';

interface IAnnotatedUserPaneProps {
  readonly annotatedUsers: Immutable.List<IAnnotatedUser>;
}

export const AnnotatedUserPane: React.SFC<IAnnotatedUserPaneProps> = ({ annotatedUsers }) => (
  !annotatedUsers.isEmpty() ? (
    <ul className="annotated-user--pane">
      {annotatedUsers.map((user: IAnnotatedUser) => (
        <li
          key={user.id}
          className="annotated-user"
        >
          <Avatar
            avatarPath={user.avatarPath}
            avatarSize="annotated-avatar"
          />
          {user.name}
        </li>
      ))}
    </ul>
  ) : null
);

AnnotatedUserPane.displayName = 'AnnotatedUserPane';
AnnotatedUserPane.propTypes = {
  annotatedUsers: PropTypes.object.isRequired
};
