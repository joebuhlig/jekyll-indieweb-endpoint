import _ from 'lodash';
import {Indiekit} from '@indiekit/indiekit';
import {JekyllPreset} from '@indiekit/preset-jekyll';
import {GithubStore} from '@indiekit/store-github';
import {InternetArchiveSyndicator} from '@indiekit/syndicator-internet-archive';
import {MastodonSyndicator} from '@indiekit/syndicator-mastodon';
import {TwitterSyndicator} from '@indiekit/syndicator-twitter';

// New indiekit instance
const indiekit = new Indiekit();

// Configure publication preset
const jekyll = new JekyllPreset();

// Configure content store
const github = new GithubStore({
  user: 'joebuhlig',
  repo: 'joebuhlig.com',
  branch: 'master',
  token: process.env.GITHUB_TOKEN
});

// Configure Internet Archive syndicator
const internetArchive = new InternetArchiveSyndicator({
  checked: true,
  forced: true
});

// Configure Mastodon syndicator
const mastodon = new MastodonSyndicator({
  checked: true,
  forced: true,
  url: 'https://mastodon.social',
  user: 'joebuhlig'
});

// Configure Twitter syndicator
const twitter = new TwitterSyndicator({
  checked: true,
  forced: true,
  user: 'joebuhlig'
});

const storeMessageTemplate = metaData => {
  const {result, postType, fileType} = metaData;
  return `🤖 ${result} a ${postType} ${fileType}`;
};

// Publication settings
indiekit.set('publication.locale', 'en-US');
indiekit.set('publication.me', 'https://joebuhlig.com');
indiekit.set('publication.preset', jekyll);
indiekit.set('publication.store', github);
indiekit.set('publication.storeMessageTemplate', storeMessageTemplate);
indiekit.set('publication.syndicationTargets', [
  // TODO: Re-enable saving to IA when can syndicate without timing out
  // See: https://github.com/getindiekit/indiekit/issues/324
  //
  // internetArchive,
  mastodon,
  twitter
]);
indiekit.set('publication.timeZone', 'America/Chicago');

// Server
const server = indiekit.server();

export default server;