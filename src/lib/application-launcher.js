import { spawn } from 'child_process';
import path from 'path';

export default (plugin) => {
  return async ({
    enableLogging,
    runAsNode,
    inspect,
    args,
    appPath,
  }) => {
    const spawnOpts = {
      cwd: plugin.dir,
      stdio: 'inherit',
      env: Object.assign({}, process.env, enableLogging ? {
        ELECTRON_ENABLE_LOGGING: true,
        ELECTRON_ENABLE_STACK_DUMPING: true,
      } : {}),
    };
  
    if (runAsNode) {
      spawnOpts.env.ELECTRON_RUN_AS_NODE = true;
    } else {
      delete spawnOpts.env.ELECTRON_RUN_AS_NODE;
    }
  
    if (inspect) {
      args = ['--inspect'].concat(args);
    }
  
    let spawned;
  
    await plugin.asyncOra('Launching Application', async () => {
      spawned = spawn(process.execPath, [path.resolve(plugin.dir, 'node_modules/electron-prebuilt-compile/lib/cli'), appPath].concat(args), spawnOpts);
    });
  
    return spawned;
  };
}