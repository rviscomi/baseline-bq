import fs from 'fs';

import {browsers, features, groups} from 'web-features';

const browser_releases = Object.values(browsers).flatMap(browser => {
  return browser.releases.map(release => {
    return {
      browser: browser.name,
      version: release.version,
      release_date: release.date
    };
  });
});

const browser_versions = Object.fromEntries(Object.entries(browsers).map(([browser_id, browser]) => {
  return [browser_id, {
    browser: browser.name,
    versions: Object.fromEntries(browser.releases.map(release => {
      return [release.version, release.date];
    }))
  }];
}));

fs.writeFileSync('dist/browser_releases.jsonnl', browser_releases.map(i => {
  return JSON.stringify(i);
}).join('\n'));

function stripLTEPrefix(str) {
  if (!str) {
    return str;
  }
  if (!str.startsWith('≤')) {
    return str;
  }
  return str.slice(1);
}

const web_platform_features = Object.entries(features).map(([feature_id, feature]) => {
  return {
    feature_id,
    feature_name: feature.name,
    baseline_status: feature.status.baseline,
    baseline_high_date: stripLTEPrefix(feature.status.baseline_high_date),
    baseline_low_date: stripLTEPrefix(feature.status.baseline_low_date),
    browser_support: Object.entries(feature.status.support).map(([browser_id, version]) => {
      const browser = browsers[browser_id];
      return {
        browser: browser.name,
        version: stripLTEPrefix(version),
        release_date: browser_versions[browser_id].versions[version]
      };
    }),
    description: feature.description,
    description_html: feature.description_html,
    compat_features: feature.compat_features,
    specs: feature.spec ? [].concat(feature.spec) : [],
    groups: feature.group ? [].concat(feature.group) : []
  }
});

fs.writeFileSync('dist/features.jsonnl', web_platform_features.map(i => {
  return JSON.stringify(i);
}).join('\n'));
