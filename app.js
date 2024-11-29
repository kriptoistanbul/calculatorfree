// app.js

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
    res.cookie('locale', language, { maxAge: 900000, httpOnly: true });
    res.locals.locale = language;
  } else {
    req.setLocale(req.cookies.locale);
    res.locals.locale = req.cookies.locale;
  }
  next();
});

// Language switcher route
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

// Sample Blog Posts Data (Replace with Database or CMS in Production)
const blogPosts = [
  {
    slug: 'example-post',
    title: 'Example Blog Post',
    date: '2023-10-01',
    category: 'Finance',
    categorySlug: 'financial',
    excerpt: 'This is an example excerpt of the blog post.',
    content: '<p>This is the content of the example blog post.</p>',
  },
  {
    slug: 'new-post',
    title: 'New Blog Post',
    date: '2024-04-15',
    category: 'Health',
    categorySlug: 'health-fitness',
    excerpt: 'This is a new blog post excerpt.',
    content: '<p>This is the content of the new blog post.</p>',
  },
  // Add more posts as needed
];

// Define calculator routes
const calculatorRoutes = [
  // Date and Time Calculators
  { path: '/calculators/age', view: 'calculators/age', title: 'Age Calculator', description: 'Calculate your exact age in years, months, and days.' },
  { path: '/calculators/date-difference', view: 'calculators/date-difference', title: 'Date Difference Calculator', description: 'Calculate the difference between two dates.' },
  { path: '/calculators/time-zone-converter', view: 'calculators/time-zone-converter', title: 'Time Zone Converter', description: 'Convert time between different time zones.' },
  { path: '/calculators/work-hours', view: 'calculators/work-hours', title: 'Work Hours Calculator', description: 'Calculate total work hours.' },
  
  // Financial Calculators
  { path: '/calculators/loan', view: 'calculators/loan', title: 'Advanced Loan Calculator', description: 'Calculate loan payments and interests.' },
  { path: '/calculators/investment-return', view: 'calculators/investment-return', title: 'Investment Return Calculator', description: 'Calculate returns on investments.' },
  
  // Health and Fitness Calculators
  { path: '/calculators/bmi', view: 'calculators/bmi', title: 'BMI Calculator', description: 'Calculate your Body Mass Index.' },
  { path: '/calculators/body-fat', view: 'calculators/body-fat', title: 'Body Fat Calculator', description: 'Calculate your body fat percentage.' },
  { path: '/calculators/calorie-nutrition', view: 'calculators/calorie-nutrition', title: 'Calorie and Nutrition Calculator', description: 'Calculate your daily calorie and nutrition intake.' },
  { path: '/calculators/pregnancy-due-date', view: 'calculators/pregnancy-due-date', title: 'Pregnancy Due Date Calculator', description: 'Calculate your pregnancy due date.' },
  { path: '/calculators/ovulation', view: 'calculators/ovulation', title: 'Ovulation Calculator', description: 'Calculate your ovulation days.' },
  
  // Educational Calculators
  { path: '/calculators/grade-gpa', view: 'calculators/grade-gpa', title: 'Grade and GPA Calculator', description: 'Calculate your grades and GPA.' },
  { path: '/calculators/scientific', view: 'calculators/scientific', title: 'Scientific Calculator', description: 'Use our scientific calculator for complex calculations.' },
  { path: '/calculators/unit-conversion', view: 'calculators/unit-conversion', title: 'Unit Conversion Calculator', description: 'Convert units easily.' },
  
  // Astrology and Zodiac Calculators
  { path: '/calculators/planetary-aspect', view: 'calculators/planetary-aspect', title: 'Planetary Aspect Calculator', description: 'Calculate planetary aspects in astrology.' },
  { path: '/calculators/mercury-sign', view: 'calculators/mercury-sign', title: 'Mercury Sign Calculator', description: 'Find out your Mercury sign.' },
  { path: '/calculators/moon-sign', view: 'calculators/moon-sign', title: 'Moon Sign Calculator', description: 'Find out your Moon sign.' },
  { path: '/calculators/venus-sign', view: 'calculators/venus-sign', title: 'Venus Sign Calculator', description: 'Find out your Venus sign.' },
  { path: '/calculators/mars-sign', view: 'calculators/mars-sign', title: 'Mars Sign Calculator', description: 'Find out your Mars sign.' },
  { path: '/calculators/western-zodiac', view: 'calculators/western-zodiac', title: 'Western Zodiac Calculator', description: 'Find out your Western zodiac sign.' },
  { path: '/calculators/chinese-zodiac', view: 'calculators/chinese-zodiac', title: 'Chinese Zodiac Calculator', description: 'Find out your Chinese zodiac sign.' },
  { path: '/calculators/vedic-astrology', view: 'calculators/vedic-astrology', title: 'Vedic Astrology Calculator', description: 'Explore Vedic astrology.' },
  { path: '/calculators/compatibility', view: 'calculators/compatibility', title: 'Compatibility Calculator', description: 'Check compatibility between signs.' },
  
  // Environmental Impact Calculators
  { path: '/calculators/carbon-footprint', view: 'calculators/carbon-footprint', title: 'Carbon Footprint Calculator', description: 'Calculate your carbon footprint.' },
  { path: '/calculators/water-usage', view: 'calculators/water-usage', title: 'Water Usage Calculator', description: 'Calculate your water usage.' },
  { path: '/calculators/energy-consumption', view: 'calculators/energy-consumption', title: 'Energy Consumption Calculator', description: 'Calculate your energy consumption.' },
  
  // Business and Marketing Calculators
  { path: '/calculators/roi', view: 'calculators/roi', title: 'ROI Calculator', description: 'Calculate Return on Investment.' },
  { path: '/calculators/break-even', view: 'calculators/break-even', title: 'Break-even Analysis Calculator', description: 'Calculate your break-even point.' },
  { path: '/calculators/project-cost', view: 'calculators/project-cost', title: 'Project Cost Estimator', description: 'Estimate your project costs.' },
];

// Define category routes
const categories = [
  { path: '/categories/date-time', view: 'categories/date-time', title: 'Date and Time Calculators', description: 'Explore calculators related to date and time.' },
  { path: '/categories/financial', view: 'categories/financial', title: 'Financial Calculators', description: 'Explore financial calculators.' },
  { path: '/categories/health-fitness', view: 'categories/health-fitness', title: 'Health and Fitness Calculators', description: 'Explore health and fitness calculators.' },
  { path: '/categories/educational', view: 'categories/educational', title: 'Educational Calculators', description: 'Explore educational calculators.' },
  { path: '/categories/astrology-zodiac', view: 'categories/astrology-zodiac', title: 'Astrology and Zodiac Calculators', description: 'Explore astrology and zodiac calculators.' },
  { path: '/categories/environmental-impact', view: 'categories/environmental-impact', title: 'Environmental Impact Calculators', description: 'Explore environmental impact calculators.' },
  { path: '/categories/business-marketing', view: 'categories/business-marketing', title: 'Business and Marketing Calculators', description: 'Explore business and marketing calculators.' },
  // Add more categories if needed
];

// Homepage Routes

// Homepage route for default language (English)
app.get('/', (req, res) => {
  console.log('Accessed homepage route');
  res.render('index', {
    title: res.__('Online Free Calculator - Your One-Stop Destination for All Calculations'),
    description: res.__('Discover a wide range of free calculators for finance, health, astrology, education, and more. Simplify complex calculations with ease.'),
    langPrefix: res.locals.locale === 'en' ? '' : `/${res.locals.locale}`,
  });
});

// Homepage routes with language prefix
['fr', 'es', 'de', 'zh', 'ru', 'ja', 'ar', 'pt', 'hi'].forEach(lang => {
  app.get(`/${lang}/`, (req, res) => {
    console.log(`Accessed /${lang}/ homepage route`);
    res.setLocale(lang);
    res.render('index', {
      title: res.__('Online Free Calculator - Your One-Stop Destination for All Calculations'),
      description: res.__('Discover a wide range of free calculators for finance, health, astrology, education, and more. Simplify complex calculations with ease.'),
      langPrefix: `/${lang}`,
    });
  });
});

// Apply calculator routes for default language (English)
calculatorRoutes.forEach(route => {
  app.get(route.path, (req, res) => {
    req.setLocale('en');
    res.locals.locale = 'en';
    res.render(route.view, {
      title: res.__(route.title),
      description: res.__(route.description),
      langPrefix: '',
    });
  });
});

// Apply calculator routes with language prefix for other languages
['fr', 'es', 'de', 'zh', 'ru', 'ja', 'ar', 'pt', 'hi'].forEach(lang => {
  calculatorRoutes.forEach(route => {
    app.get(`/${lang}${route.path}`, (req, res) => {
      req.setLocale(lang);
      res.locals.locale = lang;
      res.render(route.view, {
        title: res.__(route.title),
        description: res.__(route.description),
        langPrefix: `/${lang}`,
      });
    });
  });
});

// Apply category routes for default language (English)
categories.forEach(category => {
  app.get(category.path, (req, res) => {
    req.setLocale('en');
    res.locals.locale = 'en';
    res.render(category.view, {
      title: res.__(category.title),
      description: res.__(category.description),
      langPrefix: '',
    });
  });
});

// Apply category routes with language prefix for other languages
['fr', 'es', 'de', 'zh', 'ru', 'ja', 'ar', 'pt', 'hi'].forEach(lang => {
  categories.forEach(category => {
    app.get(`/${lang}${category.path}`, (req, res) => {
      req.setLocale(lang);
      res.locals.locale = lang;
      res.render(category.view, {
        title: res.__(category.title),
        description: res.__(category.description),
        langPrefix: `/${lang}`,
      });
    });
  });
});

// About Us and Privacy Policy pages for default language (English)
app.get('/about', (req, res) => {
  req.setLocale('en');
  res.locals.locale = 'en';
  res.render('about', {
    title: res.__('About Us'),
    description: res.__('Learn more about our mission and the team behind the calculators.'),
    langPrefix: '',
  });
});

app.get('/privacy-policy', (req, res) => {
  req.setLocale('en');
  res.locals.locale = 'en';
  res.render('privacy-policy', {
    title: res.__('Privacy Policy'),
    description: res.__('Understand how we handle your data and privacy.'),
    langPrefix: '',
  });
});

// About Us and Privacy Policy routes with language prefix for other languages
['fr', 'es', 'de', 'zh', 'ru', 'ja', 'ar', 'pt', 'hi'].forEach(lang => {
  app.get(`/${lang}/about`, (req, res) => {
    req.setLocale(lang);
    res.locals.locale = lang;
    res.render('about', {
      title: res.__('About Us'),
      description: res.__('Learn more about our mission and the team behind the calculators.'),
      langPrefix: `/${lang}`,
    });
  });

  app.get(`/${lang}/privacy-policy`, (req, res) => {
    req.setLocale(lang);
    res.locals.locale = lang;
    res.render('privacy-policy', {
      title: res.__('Privacy Policy'),
      description: res.__('Understand how we handle your data and privacy.'),
      langPrefix: `/${lang}`,
    });
  });
});

// Blog routes for default language (English)
app.get('/blog', (req, res) => {
  console.log('Accessed /blog route');
  req.setLocale('en');
  res.locals.locale = 'en';
  res.render('blog/index', {
    title: res.__('Blog'),
    description: res.__('Read our latest articles and updates.'),
    posts: blogPosts,
    langPrefix: '',
  });
});

app.get('/blog/:slug', (req, res) => {
  console.log(`Accessed /blog/${req.params.slug} route`);
  req.setLocale('en');
  res.locals.locale = 'en';
  const slug = req.params.slug;
  const post = blogPosts.find(p => p.slug === slug);

  if (post) {
    res.render('blog/post', {
      title: post.title,
      description: post.excerpt || '',
      post: post,
      langPrefix: '',
    });
  } else {
    res.status(404).render('404', { message: res.__('Post not found'), langPrefix: '' });
  }
});

// Blog routes with language prefix for other languages
['fr', 'es', 'de', 'zh', 'ru', 'ja', 'ar', 'pt', 'hi'].forEach(lang => {
  app.get(`/${lang}/blog`, (req, res) => {
    console.log(`Accessed /${lang}/blog route`);
    req.setLocale(lang);
    res.locals.locale = lang;
    res.render('blog/index', {
      title: res.__('Blog'),
      description: res.__('Read our latest articles and updates.'),
      posts: blogPosts, // Ideally, you would fetch localized posts here
      langPrefix: `/${lang}`,
    });
  });

  app.get(`/${lang}/blog/:slug`, (req, res) => {
    console.log(`Accessed /${lang}/blog/${req.params.slug} route`);
    req.setLocale(lang);
    res.locals.locale = lang;
    const slug = req.params.slug;
    const post = blogPosts.find(p => p.slug === slug);

    if (post) {
      res.render('blog/post', {
        title: post.title,
        description: post.excerpt || '',
        post: post,
        langPrefix: `/${lang}`,
      });
    } else {
      res.status(404).render('404', { message: res.__('Post not found'), langPrefix: `/${lang}` });
    }
  });
});

// Sitemap generation for each language
app.get('/sitemap.xml', async (req, res) => {
  res.header('Content-Type', 'application/xml');
  const smStream = new SitemapStream({ hostname: `https://calculator-free.online` });
  const links = [
    { url: `/`, changefreq: 'daily', priority: 1.0 },
    { url: `/about`, changefreq: 'monthly', priority: 0.8 },
    { url: `/privacy-policy`, changefreq: 'monthly', priority: 0.8 },
  ];

  // Add calculator routes
  calculatorRoutes.forEach(route => {
    links.push({
      url: `${route.path}`,
      changefreq: 'weekly',
      priority: 0.7
    });
  });

  // Add category routes
  categories.forEach(category => {
    links.push({
      url: `${category.path}`,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // Add blog posts
  blogPosts.forEach(post => {
    links.push({
      url: `/blog/${post.slug}`,
      changefreq: 'monthly',
      priority: 0.6
    });
  });

  links.forEach(link => {
    smStream.write(link);
  });
  smStream.end();

  try {
    const sitemap = await streamToPromise(smStream).then(sm => sm.toString());
    res.send(sitemap);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
});

// Sitemap routes for other languages
['fr', 'es', 'de', 'zh', 'ru', 'ja', 'ar', 'pt', 'hi'].forEach(lang => {
  app.get(`/${lang}/sitemap.xml`, async (req, res) => {
    res.header('Content-Type', 'application/xml');
    const smStream = new SitemapStream({ hostname: `https://calculator-free.online` });
    const links = [
      { url: `/${lang}/`, changefreq: 'daily', priority: 1.0 },
      { url: `/${lang}/about`, changefreq: 'monthly', priority: 0.8 },
      { url: `/${lang}/privacy-policy`, changefreq: 'monthly', priority: 0.8 },
    ];

    // Add calculator routes
    calculatorRoutes.forEach(route => {
      links.push({
        url: `/${lang}${route.path}`,
        changefreq: 'weekly',
        priority: 0.7
      });
    });

    // Add category routes
    categories.forEach(category => {
      links.push({
        url: `/${lang}${category.path}`,
        changefreq: 'weekly',
        priority: 0.8
      });
    });

    // Add blog posts
    blogPosts.forEach(post => {
      links.push({
        url: `/${lang}/blog/${post.slug}`,
        changefreq: 'monthly',
        priority: 0.6
      });
    });

    links.forEach(link => {
      smStream.write(link);
    });
    smStream.end();

    try {
      const sitemap = await streamToPromise(smStream).then(sm => sm.toString());
      res.send(sitemap);
    } catch (e) {
      console.error(e);
      res.status(500).end();
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', { message: res.__('Something went wrong!'), langPrefix: res.locals.locale === 'en' ? '' : `/${res.locals.locale}` });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { message: res.__('Page not found'), langPrefix: res.locals.locale === 'en' ? '' : `/${res.locals.locale}` });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});