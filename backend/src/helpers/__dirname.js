import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

/**
 * Переменная хранящая корневой каталог backend
 * @type {string}
*/
export const __dirname = resolve(dirname(fileURLToPath(import.meta.url)), '../../');