import {
  User,
  UserServerModel
} from '../../../../src/profile/models/User';
import { convertServerToViewUserModel } from '../../../../src/profile/utils/convertUserModels';

describe('Correctly converts from the server model to the view model', () => {
  const name = 'testUser';
  const email = 'testUser@test.test';
  const avatarPath = 'www.avatarPath.test';
  const id = '1945a888-02f7-4692-9d59-afddbcb49d18';

  const modelsWithoutAnAttribute = [
    {
      caseName: 'without the id attribute',
      serverModel: new UserServerModel({
        email,
        customData: {
          name,
          avatarPath,
        }
      }),
      clientModel: new User({
        id: undefined,
        email,
        avatarPath,
        name,
      })
    },
    {
      caseName: 'without the name attribute',
      serverModel: new UserServerModel({
        email,
        customData: {
          id,
          avatarPath,
        }
      }),
      clientModel: new User({
        id,
        name: undefined,
        email,
        avatarPath,
      })
    },
    {
      caseName: 'without the avatarPath attribute',
      serverModel: new UserServerModel({
        email,
        customData: {
          id,
          name,
        }
      }),
      clientModel: new User({
        id,
        name,
        email,
        avatarPath: undefined,
      })
    },
    {
      caseName: 'without the email attribute',
      serverModel: new UserServerModel({
        customData: {
          id,
          name,
          avatarPath,
        }
      }),
      clientModel: new User({
        id,
        name,
        email: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
        avatarPath,
      })
    },

  ];

  it('returns the clientModel when a serverModel is received', () => {
    const clientUser = new User({
      id,
      email,
      name,
      avatarPath
    });
    const serverUser = new UserServerModel({
      email,
      customData: {
        id,
        name,
        avatarPath,
      }
    });

    const actual = convertServerToViewUserModel(serverUser);

    expect(actual).toEqual(clientUser);
  });

  modelsWithoutAnAttribute.forEach(testCase => {
    it(`returns the correct clientModel when a serverModel ${testCase.caseName} is received`, () => {
      const actual = convertServerToViewUserModel(testCase.serverModel);

      expect(actual).toEqual(testCase.clientModel);
    });
  });
});
