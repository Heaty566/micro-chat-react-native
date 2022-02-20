import { SERVER_URL, DEVELOPMENT } from '@env';

export const config = {
    DEVELOPMENT: DEVELOPMENT || '',
    SERVER_URL: SERVER_URL || '',
};

if (config.DEVELOPMENT === 'ACTIVE') console.log(config);
