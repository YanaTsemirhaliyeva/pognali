import fs from 'fs';

const OUTPUT_FOLDER = 'out';
const PUBLIC_FOLDER = 'public';

new Promise(() => {
  fs.writeFileSync(
      `${OUTPUT_FOLDER}/robots.txt`,
      'User-agent: *\nDisallow: /'
  );
});

new Promise(() => {
  fs.writeFileSync(
      `${PUBLIC_FOLDER}/pognali.txt`,
      'User-agent: *\nDisallow: /'
  );
});
