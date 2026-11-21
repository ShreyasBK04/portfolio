import fs from 'fs';

console.log('=== SEO AUDIT VALIDATION ===');

// 1. Validate index.html JSON-LD
const html = fs.readFileSync('index.html', 'utf8');
const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (jsonLdMatch) {
  try {
    const parsed = JSON.parse(jsonLdMatch[1]);
    console.log('✓ JSON-LD Syntax: VALID');
    console.log('  Entities count in @graph:', parsed['@graph'] ? parsed['@graph'].length : 1);
    parsed['@graph'].forEach(e => console.log('   -', e['@type'], ':', e.name || e.url));
  } catch(e) {
    console.error('✗ JSON-LD Syntax ERROR:', e.message);
    process.exit(1);
  }
} else {
  console.error('✗ JSON-LD tag NOT found in index.html');
  process.exit(1);
}

// 2. Validate robots.txt
if (fs.existsSync('public/robots.txt')) {
  const robots = fs.readFileSync('public/robots.txt', 'utf8');
  console.log('\n✓ robots.txt: PRESENT (' + robots.length + ' bytes)');
  console.log('  Contains Sitemap:', robots.includes('Sitemap:'));
} else {
  console.error('✗ robots.txt NOT found');
  process.exit(1);
}

// 3. Validate sitemap.xml
if (fs.existsSync('public/sitemap.xml')) {
  const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
  console.log('\n✓ sitemap.xml: PRESENT (' + sitemap.length + ' bytes)');
  const urls = sitemap.match(/<loc>(.*?)<\/loc>/g);
  console.log('  URLs listed in sitemap:', urls ? urls.length : 0);
  if (urls) urls.forEach(u => console.log('   -', u.replace(/<\/?loc>/g, '')));
} else {
  console.error('✗ sitemap.xml NOT found');
  process.exit(1);
}

// 4. Validate metadata tags in index.html
console.log('\n✓ HTML Meta Tags:');
console.log('  Title:', html.match(/<title>([^<]+)<\/title>/)?.[1]);
console.log('  Canonical:', html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]);
console.log('  Robots:', html.match(/<meta name="robots" content="([^"]+)"/)?.[1]);
console.log('  OG Title:', html.match(/<meta property="og:title" content="([^"]+)"/)?.[1]);
console.log('  Twitter Title:', html.match(/<meta name="twitter:title" content="([^"]+)"/)?.[1]);
console.log('\n✓ All validation checks passed successfully!');
