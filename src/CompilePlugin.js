import createPackagerCompileHook from './lib/compile-hook';
import createApplicationLauncher from './lib/application-launcher';

export class CompilePlugin {
  constructor() {
    this.name = 'compile';
    this.startLogic = createApplicationLauncher(this);
    this.getHook = this.getHook.bind(this);
  }

  init(dir, forgeConfig, asyncOra) {
    this.dir = dir;
    this.asyncOra = asyncOra;
  }

  getHook(name) {
    switch (name) {
      case 'packageAfterCopy':
        return createPackagerCompileHook(this.dir, this.asyncOra);
    }
  }
}