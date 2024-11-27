const express = require('express');
const path = require('path');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const i18n = require('i18n');
const cookieParser = require('cookie-parser');
const { SitemapStream, streamToPromise } = require('sitemap');

// Configure i18n for multilingual support
i18n.configure({
  locales: ['en', 'fr', 'es', 'de', 'zh', 'ru', 'ja', 'ar', 'pt', 'hi'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  cookie: 'locale',
  queryParameter: 'lang',
  autoReload: true,
  syncFiles: true,
});

// Initialize middleware
app.use(cookieParser());
app.use(i18n.init);

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Middleware to pass variables to templates
app.use((req, res, next) => {
  res.locals.currentUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  res.locals.originalUrl = req.originalUrl;
  res.locals.locale = req.getLocale();
  next();
});

// Detect browser language and set as default if no cookie is set
app.use((req, res, next) => {
  if (!req.cookies.locale) {
    let language = req.acceptsLanguages(i18n.getLocales());
    if (!language) {
      language = 'en'; // Default to English if no match
    }
    req.setLocale(language);
    res.cookie('locale', language);
    res.locals.locale = language;
  } else {
    req.setLocale(req.cookies.locale);
    res.locals.locale = req.cookies.locale;
  }
  next();
});

// Language switcher
app.get('/change-language/:locale', (req, res) => {
  const locale = req.params.locale;
  if (i18n.getLocales().includes(locale)) {
    res.cookie('locale', locale, { maxAge: 900000, httpOnly: true });
    req.setLocale(locale);
    res.locals.locale = locale;
  }
  const redirectTo = req.query.redirect || '/';
  res.redirect(redirectTo);
});

// Helper function to remove language prefix from URL
function removeLangPrefix(url) {
  return url.replace(/^\/(en|fr|es|de|zh|ru|ja|ar|pt|hi)/, '');
}

// Homepage route without language prefix (English is default)
app.get('/', (req, res) => {
  req.setLocale('en');
  res.locals.locale = 'en';
  res.render('index', {
    title: res.__('Online Free Calculator'),
    description: res.__('Discover a wide range of free calculators for finance, health, astrology, education, and more.'),
  });
});

// Routes with language prefix for other languages
app.get('/:lang(fr|es|de|zh|ru|ja|ar|pt|hi)/', (req, res) => {
  const lang = req.params.lang;
  req.setLocale(lang);
  res.locals.locale = lang;
  res.render('index', {
    title: res.__('Online Free Calculator'),
    description: res.__('Discover a wide range of free calculators for finance, health, astrology, education, and more.'),
  });
});

// Calculator routes without language prefix (English)
const calculatorRoutes = [
  // ... (Your calculator routes remain the same)
];

// Apply routes for default language (English)
calculatorRoutes.forEach(route => {
  app.get(route.path, (req, res) => {
    req.setLocale('en');
    res.locals.locale = 'en';
    res.render(route.view, {
      title: res.__(route.title),
      description: res.__(route.description),
    });
  });
});

// Apply routes with language prefix for other languages
['fr', 'es', 'de', 'zh', 'ru', 'ja', 'ar', 'pt', 'hi'].forEach(lang => {
  calculatorRoutes.forEach(route => {
    app.get(`/${lang}${route.path}`, (req, res) => {
      req.setLocale(lang);
      res.locals.locale = lang;
      res.render(route.view, {
        title: res.__(route.title),
        description: res.__(route.description),
      });
    });
  });
});

// About and Privacy Policy routes
app.get('/about', (req, res) => {
  req.setLocale('en');
  res.locals.locale = 'en';
  res.render('about', {
    title: res.__('About Us'),
    description: res.__('Learn more about our mission and the team behind the calculators.'),
  });
});

app.get('/privacy-policy', (req, res) => {
  req.setLocale('en');
  res.locals.locale = 'en';
  res.render('privacy-policy', {
    title: res.__('Privacy Policy'),
    description: res.__('Understand how we handle your data and privacy.'),
  });
});

// About and Privacy Policy routes with language prefix
['fr', 'es', 'de', 'zh', 'ru', 'ja', 'ar', 'pt', 'hi'].forEach(lang => {
  app.get(`/${lang}/about`, (req, res) => {
    req.setLocale(lang);
    res.locals.locale = lang;
    res.render('about', {
      title: res.__('About Us'),
      description: res.__('Learn more about our mission and the team behind the calculators.'),
    });
  });

  app.get(`/${lang}/privacy-policy`, (req, res) => {
    req.setLocale(lang);
    res.locals.locale = lang;
    res.render('privacy-policy', {
      title: res.__('Privacy Policy'),
      description: res.__('Understand how we handle your data and privacy.'),
    });
  });
});

// Blog routes
app.get('/blog', (req, res) => {
  req.setLocale('en');
  res.locals.locale = 'en';
  res.render('blog/index', {
    title: res.__('Blog'),
    description: res.__('Read our latest articles and updates.'),
  });
});

app.get('/blog/:slug', (req, res) => {
  req.setLocale('en');
  res.locals.locale = 'en';
  const slug = req.params.slug;
  // Fetch blog post based on slug
  res.render('blog/post', {
    title: res.__(`Blog Post: ${slug}`),
    description: res.__('Read our latest articles and updates.'),
    slug: slug,
  });
});

// Blog routes with language prefix
['fr', 'es', 'de', 'zh', 'ru', 'ja', 'ar', 'pt', 'hi'].forEach(lang => {
  app.get(`/${lang}/blog`, (req, res) => {
    req.setLocale(lang);
    res.locals.locale = lang;
    res.render('blog/index', {
      title: res.__('Blog'),
      description: res.__('Read our latest articles and updates.'),
    });
  });

  app.get(`/${lang}/blog/:slug`, (req, res) => {
    req.setLocale(lang);
    res.locals.locale = lang;
    const slug = req.params.slug;
    // Fetch blog post based on slug
    res.render('blog/post', {
      title: res.__(`Blog Post: ${slug}`),
      description: res.__('Read our latest articles and updates.'),
      slug: slug,
    });
  });
});

// Sitemap generation
app.get('/sitemap.xml', async (req, res) => {
  res.header('Content-Type', 'application/xml');
  const smStream = new SitemapStream({ hostname: `https://calculator-free.online` });
  const links = [
    { url: `/`, changefreq: 'daily', priority: 1.0 },
    { url: `/about`, changefreq: 'monthly', priority: 0.8 },
    { url: `/privacy-policy`, changefreq: 'monthly', priority: 0.8 },
    // Add more URLs dynamically if needed
  ];

  // Add calculator routes
  calculatorRoutes.forEach(route => {
    links.push({
      url: `${route.path}`,
      changefreq: 'weekly',
      priority: 0.7
    });
  });

  // Add language-prefixed URLs
  ['fr', 'es', 'de', 'zh', 'ru', 'ja', 'ar', 'pt', 'hi'].forEach(lang => {
    links.push({ url: `/${lang}/`, changefreq: 'daily', priority: 1.0 });
    links.push({ url: `/${lang}/about`, changefreq: 'monthly', priority: 0.8 });
    links.push({ url: `/${lang}/privacy-policy`, changefreq: 'monthly', priority: 0.8 });

    calculatorRoutes.forEach(route => {
      links.push({
        url: `/${lang}${route.path}`,
        changefreq: 'weekly',
        priority: 0.7
      });
    });
  });

  links.forEach(link => {
    smStream.write(link);
  });
  smStream.end();

  const sitemap = await streamToPromise(smStream).then(sm => sm.toString());
  res.send(sitemap);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});