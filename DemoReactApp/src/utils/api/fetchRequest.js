import { validateResponse } from './validateResponse';

export const fetchRequest = (uri, token, bodyJson) =>
    fetch(
        uri,
        {
            method: 'PUT',
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(bodyJson),
        })
        .then(validateResponse);
