const fs = require('fs');

['src/routes/journal/$slug.tsx', 'src/routes/journal/index.tsx', 'src/routes/pages/contact.tsx'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace("import { createFileRoute } from '@tanstack/react-router'\n", '');
  content = content.replace("import { createFileRoute, Link } from '@tanstack/react-start'", "import { Link } from '@tanstack/react-start'");
  content = content.replace("import { createFileRoute } from '@tanstack/react-start'\n", '');
  fs.writeFileSync(file, content);
});
