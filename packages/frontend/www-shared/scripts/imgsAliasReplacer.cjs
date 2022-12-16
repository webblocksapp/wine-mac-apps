const fs = require('fs');

exports.default = ({ orig, file }) => {
  const fileContents = fs.readFileSync(file, 'utf8');
  const absPath = file.split('dist/').pop();
  const nestedLevels = absPath.split('/').length - 2;

  if (file.match('ProcessStatusIcon')) {
    if (fileContents.match('@imgs/')) {
      const relPath =
        Array(nestedLevels).fill('..').join('/') + '/assets/imgs/';
      let newContents = fileContents.replace(/\@imgs\//g, relPath);
      newContents = newContents.replace(/\.(png|jpg|gif|svg)";/g, '.jsx"');
      fs.writeFileSync(file, newContents);
    }
  }
  return orig;
};
