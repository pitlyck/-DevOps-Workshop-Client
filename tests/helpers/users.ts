import { User } from '../../src/profile/models/User';

export const user1Id = 'e012c8e5-dce2-479b-b40b-60f180f662f1';
export const user1 = new User({
  id: user1Id,
  email: 'user1@email.com',
  name: 'user1',
  avatarPath: 'www.path1.com',
});

export const user2Id = '0ed3aaad-59c4-4f3b-b97e-5e3714573743';
export const user2 = new User({
  id: user2Id,
  email: 'user2@email.com',
  name: 'user2',
  avatarPath: 'www.path2.com',
});

export const firstUserId = user1Id;
export const firstUserEmail = 'firstUser@email.com';
export const firstUserName = 'firstUserName';
export const firstUserAvatarPath = 'www.firstPath.com';
