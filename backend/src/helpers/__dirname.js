import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

export const __dirname = resolve(dirname(fileURLToPath(import.meta.url)), '../../');