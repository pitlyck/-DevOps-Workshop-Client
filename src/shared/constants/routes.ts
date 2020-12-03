import { appId } from './appConfig';

export const CONTENT_VIEW_ROUTE = '/content';

export const PROFILE_VIEW_ROUTE = `${CONTENT_VIEW_ROUTE}/profile-view`;

export const CHANNEL_VIEW_ROUTE = `${CONTENT_VIEW_ROUTE}/channel-view`;
export const SPECIFIC_CHANNEL_VIEW_ROUTE = (channelId: Uuid) => `${CHANNEL_VIEW_ROUTE}/${channelId}`;

export const LOGIN_ROUTE = '/';


export const SERVER_ROUTE = process.env.BACKEND_URL;
export const BEARER_ROUTE = `${SERVER_ROUTE}auth/`;
export const CHANNELS_ROUTE = `app/${appId}/channel/`;
export const MESSAGES_ROUTE = 'message/';
export const APP_ROUTE = `app/${appId}/`;
export const USERS_ROUTE = `${appId}/user/`;
export const FILE_ROUTE = 'file/';
export const DOWNLOAD_LINK_ROUTE = '/download-link/';
