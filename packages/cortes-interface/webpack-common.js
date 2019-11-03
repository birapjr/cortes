const fs = require('fs');
const path = require('path');

const distPackage = require('./package.json');

const isNativePackage = packageName =>
  !!process.binding('natives')[packageName];

function getVersions(dependencies) {
  const result = {};

  Object.keys(dependencies)
    .sort()
    .forEach(depName => {
      /* eslint-disable import/no-dynamic-require, global-require */
      const dep = require(`./package.json`);
      /* eslint-enable import/no-dynamic-require, global-require */
      result[depName] = dep.version;
    });

  return result;
}

const externalDependencies = {};

module.exports = {
  externals: (context, request, callback) => {
    if (request.match(/^[./]/)) {
      return callback();
    }

    const packageName = request.split('/')[0];
    if (!isNativePackage(packageName)) {
      externalDependencies[packageName] = true;
    }

    return callback(null, `commonjs ${request}`);
  },
  writePackageJsonPlugin: filePath => ({
    apply(compiler) {
      const plugin = { name: 'DistPackageJson' };
      compiler.hooks.done.tapAsync(plugin, () => {
        const name = distPackage.name.split('/')[1];
        distPackage.dependencies = getVersions(externalDependencies);
        distPackage.scripts = { 'start:ui': 'node index.js' };
        distPackage.name = name;

        delete distPackage.devDependencies;
        delete distPackage.peerDependencies;
        distPackage.dependencies = {
          express: '4.16.4'
        };

        const dist = path.dirname(filePath);
        if (!fs.existsSync(dist)) {
          fs.mkdirSync(dist);
        }

        console.log(distPackage);

        fs.writeFileSync(filePath, JSON.stringify(distPackage, 0, 2));
      });
    }
  }),
  writeInfoDataFilePlugin: (filePath, data) => ({
    apply(compiler) {
      const dist = path.dirname(filePath);
      if (!fs.existsSync(dist)) {
        fs.mkdirSync(dist);
      }

      console.log(data);
      fs.writeFileSync(filePath, JSON.stringify(data, 0, 2));
    }
  })
};