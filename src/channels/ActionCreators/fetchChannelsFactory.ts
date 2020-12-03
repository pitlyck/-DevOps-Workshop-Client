import { Dispatch } from 'redux';
import { IFetchChannelsFactoryDependencies } from './requests/fetchChannels';

export const fetchChannelsFactory = (dependencies: IFetchChannelsFactoryDependencies) => (): any => (dispatch: Dispatch): Promise<Action> => {
  dispatch(dependencies.fetchBegin());
  const errorId = dependencies.idGenerator();
  return dependencies.fetch()
    .then(response => response.json())
    .then((json) => {
      dispatch(dependencies.getChannelOrder);
      return dispatch(dependencies.success(json));
    })
    .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
};
