import { execSync } from 'child_process';

/**
 * Adds inside the tauri compressed folder the needed resources.
 */
const compressResources = () => {
  const compressFrameworks = () => {
    execSync(
      'tar -czf src-tauri/compressed/Frameworks.tgz -C ../../packages/app-contents/Frameworks .'
    );
  };

  const compressConfigApp = () => {
    execSync(
      'tar -czf src-tauri/compressed/config-app.tgz -C ../config-app/src-tauri/target/release/bundle/macos config-app.app'
    );
  };

  const run = () => {
    compressFrameworks();
    compressConfigApp();
  };

  run();
};

compressResources();
