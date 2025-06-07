import { spawn } from 'child_process';
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
            let args = process.argv.slice(2)
                .map(v => `"${v.replace(/"/g, '\\"')}"`)
                .join(' ');

            return spawn(`${filepath} ${args}`, { shell: true, stdio: 'inherit' });
        }

        dir = path.dirname(dir);
    }

    throw new Error(`@esportsplus/cli-passthrough: could not find ${script}`);
};