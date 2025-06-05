import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';


export default (script: string) => {
    let dir = path.resolve(import.meta.url, '../'),
        root = path.parse(dir).root;

    while (dir !== root) {
        let filepath = path.resolve(dir, `node_modules/.bin/${script}`);

        if (fs.existsSync(filepath)) {
            return spawn(filepath, process.argv.slice(2), { shell: true, stdio: 'inherit' });
        }

        dir = path.dirname(dir);
    }

    throw new Error(`@esportsplus/cli-passthrough: could not find ${script}`);
};