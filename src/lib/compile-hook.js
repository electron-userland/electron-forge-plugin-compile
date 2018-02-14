import fs from 'fs-extra';
import path from 'path';

export default (originalDir, asyncOra) => async (buildPath, electronVersion, pPlatform, pArch) => {
  await asyncOra('Compiling Application', async () => {
    const compileCLI = require(path.resolve(originalDir, 'node_modules/electron-compile/lib/cli.js'));

    async function compileAndShim(appDir) {
      for (const entry of await fs.readdir(appDir)) {
        if (!entry.match(/^(node_modules|bower_components)$/)) {
          const fullPath = path.join(appDir, entry);

          if ((await fs.stat(fullPath)).isDirectory()) {
            const log = console.log;
            console.log = () => {};
            await compileCLI.main(appDir, [fullPath]);
            console.log = log;
          }
        }
      }

      const packageJSON = await fs.readJson(path.resolve(appDir, 'package.json'));

      const index = packageJSON.main || 'index.js';
      packageJSON.originalMain = index;
      packageJSON.main = 'es6-shim.js';

      await fs.writeFile(path.join(appDir, 'es6-shim.js'),
        await fs.readFile(path.join(path.resolve(originalDir, 'node_modules/electron-compile/lib/es6-shim.js')), 'utf8'));

      await fs.writeJson(path.join(appDir, 'package.json'), packageJSON, { spaces: 2 });
    }

    await compileAndShim(buildPath);
  });
};
