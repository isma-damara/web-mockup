const fs = require('fs');

function fixDependencies(pkgPath) {
  if (!fs.existsSync(pkgPath)) return;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  let changed = false;
  if (pkg.dependencies) {
    for (const name in pkg.dependencies) {
      if (pkg.dependencies[name] === 'workspace:*') {
        pkg.dependencies[name] = '*';
        changed = true;
      }
    }
  }
  if (changed) {
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
    console.log('Fixed dependencies for', pkgPath);
  }
}

const apps = ['home', 'company-profile', 'ecommerce', 'government', 'catalog'];
apps.forEach(app => fixDependencies(`apps/${app}/package.json`));
