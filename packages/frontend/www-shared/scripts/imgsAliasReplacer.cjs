const fs = require('fs');

exports.default = ({ orig, file }) => {
  const fileContents = fs.readFileSync(file, 'utf8');
  const absPath = file.split('dist/').pop();
  const nestedLevels = absPath.split('/').length - 2;

  if (fileContents.match('@imgs/')) {
    const relPath =
      Array(nestedLevels).fill('..').join('/') + '../public/imgs/';
    let newContents = fileContents.replace(/\@imgs\//g, relPath);
    fs.writeFileSync(file, newContents);
  }

  return orig;
};
