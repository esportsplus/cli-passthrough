import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';


export default (script: string) => {
    let dir = path.resolve(import.meta.url, '../'),
        i = 0,
        root = path.parse(dir).root;

    while (dir !== root && i++ < 10) {
        let filepath = path.resolve(dir, `node_modules/.bin/${script}`);

        if (fs.existsSync(filepath)) {
            return spawn(filepath, process.argv.slice(2), { shell: true, stdio: 'inherit' });
        }

        dir = path.dirname(dir);
    }

    throw new Error(`@esportsplus/cli-passthrough: could not find ${script}`);
};