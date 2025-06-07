import { execFile } from 'child_process';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';


export default (script: string) => {
    let dir = path.resolve(fileURLToPath(import.meta.url), '../'),
        i = 0,
        root = path.parse(dir).root;

    while (dir !== root && i++ < 100) {
        let filepath = path.resolve(dir, `node_modules/.bin/${script}`);

        if (fs.existsSync(filepath)) {
            return execFile(filepath, process.argv.slice(2));
        }

        dir = path.dirname(dir);
    }

    throw new Error(`@esportsplus/cli-passthrough: could not find ${script}`);
};