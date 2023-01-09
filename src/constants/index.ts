import { config } from 'dotenv';

import { Cache } from '../controllers/index';

config();

const cache = new Cache();

export default cache;
