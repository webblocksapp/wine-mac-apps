import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const fixAppResources = () => {
  const cwd = process.cwd();
  const tauriConfig = JSON.parse(
    fs.readFileSync(path.join(cwd, 'src-tauri/tauri.conf.json'), 'utf8')
  );
  const appName = tauriConfig.package.productName;
  let bundlePath = path.join(
    process.cwd(),
    `src-tauri/target/release/bundle/macos/${appName}.app`
  );

  const BASE_RESOURCES_PATH = `${bundlePath}/Contents/Resources`;
  let resourcesPath = `${BASE_RESOURCES_PATH}/_up_`;
  let targetPath = '';

  const isRelative = () => {
    return fs.existsSync(resourcesPath);
  };

  if (isRelative()) {
    while (fs.existsSync(resourcesPath)) {
      resourcesPath = `${resourcesPath}/_up_`;
    }

    targetPath = resourcesPath.replace(/\/_up_$/, '');
    execSync(`mv ${targetPath}/packages/* ${BASE_RESOURCES_PATH}`);
    execSync(`rm -r ${BASE_RESOURCES_PATH}/_up_`);
  }
};

fixAppResources();
