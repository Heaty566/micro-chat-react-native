import { SERVER_URL, DEVELOPMENT } from '@env';

export const config = {
    DEVELOPMENT: DEVELOPMENT || 'ACTIVE',
    SERVER_URL: SERVER_URL || 'http://localhost:4000',
};

if (config.DEVELOPMENT === 'ACTIVE') console.log(config);
