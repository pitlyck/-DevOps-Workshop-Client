import {
  toggleChannelMember
} from '../../../../src/channels/utils/channelUtils';
import { convertServerToViewChannelModel } from '../../../../src/channels/utils/convertChannelModels';
import {
  channel1
} from '../../../helpers/channels';
import { user1Id, user2Id } from '../../../helpers/users';
import { Uuid } from '../../../helpers/types';
import * as Immutable from 'immutable';

describe('Correctly toggles a user ID in a list of channel members', () => {
  it('adds user to memberList if he is not present', () => {
    const memberIdsInitial = Immutable.List<Uuid>([user1Id]);
    const expected = Immutable.List<Uuid>([user1Id, user2Id]);

    const actual = toggleChannelMember(user2Id, memberIdsInitial);

    expect(actual).toEqual(expected);
  });

  it('removes user from memberList if he is present', () => {
    const memberIdsInitial = Immutable.List<Uuid>([user1Id, user2Id]);
    const expected = Immutable.List<Uuid>([user1Id]);

    const actual = toggleChannelMember(user2Id, memberIdsInitial);

    expect(actual).toEqual(expected);
  });
});
