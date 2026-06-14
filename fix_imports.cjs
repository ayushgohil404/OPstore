const fs = require('fs');

['src/routes/journal/$slug.tsx', 'src/routes/journal/index.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace("import { Link } from '@tanstack/react-start'", "import { Link } from '@tanstack/react-router'");
  fs.writeFileSync(file, content);
});
