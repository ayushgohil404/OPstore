const fs = require('fs');
const glob = require('glob'); // Note: we can use a simple script instead
const dirs = ['src/server/functions', 'src/routes', 'src/components'];

function processDir(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = dir + '/' + file.name;
    if (file.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('\\`') || content.includes('\\$')) {
        content = content.replace(/\\\`/g, '`').replace(/\\\$/g, '$');
        fs.writeFileSync(fullPath, content);
        console.log('Fixed', fullPath);
      }
    }
  }
}

dirs.forEach(processDir);
