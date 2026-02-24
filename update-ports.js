const fs = require('fs');
const apps = ['company-profile', 'ecommerce', 'government', 'catalog'];

apps.forEach((app, index) => {
  const path = `apps/${app}/package.json`;
  const pkg = JSON.parse(fs.readFileSync(path, 'utf8'));
  pkg.scripts.dev = `next dev --port ${3001 + index}`;
  fs.writeFileSync(path, JSON.stringify(pkg, null, 2));
  console.log(`Updated port for ${app} to ${3001 + index}`);
});
