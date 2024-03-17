//Esta es una forma de importar un archivo json en node.js usando el modulo "module"
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

export const readJSON = (path) => require(path);
