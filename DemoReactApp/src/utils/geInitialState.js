import { getInitialItems } from './getInitialItems';
import { getPersistedToken } from './getPersistedToken';

export const getInitialState = () => ({
    todoApp: {
        items: {
            ...getInitialItems()
        }
    },
    shared: {
        token: getPersistedToken()
    }
});
