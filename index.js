import _ from 'lodash';
import {Indiekit} from '@indiekit/indiekit';
import {JekyllPreset} from '@indiekit/preset-jekyll';
import {GithubStore} from '@indiekit/store-github';
import {InternetArchiveSyndicator} from '@indiekit/syndicator-internet-archive';
import {MastodonSyndicator} from '@indiekit/syndicator-mastodon';
import {TwitterSyndicator} from '@indiekit/syndicator-twitter';

const indiekit = new Indiekit();
const jekyll = new JekyllPreset();

const github = new GithubStore({
  user: 'joebuhlig',
  repo: 'joebuhlig.com',
  branch: 'master',
  token: process.env.GITHUB_TOKEN
});

const mastodon = new MastodonSyndicator({
  checked: true,
  forced: true,
  url: 'https://mastodon.social',
  user: 'joebuhlig'
});

const twitter = new TwitterSyndicator({
  checked: true,
  forced: true,
  user: 'joebuhlig'
});

const postTypes = [{
  type: 'article',
  name: 'Article',
  post: {
    path: '_posts/{yyyy}-{MM}-{dd}-{slug}.md',
    url: '{slug}/'
  },
  media: {
    path: '_assets/media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{t}.{ext}'
  }
},{
  type: 'note',
  name: 'Note',
  post: {
    path: '_notes/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.md',
    url: 'note/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: '_assets/media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{t}.{ext}'
  }
},{
  type: 'photo',
  name: 'Photo',
  post: {
    path: '_photos/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.md',
    url: 'photo/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: '_assets/media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{t}.{ext}'
  }
},{
  type: 'video',
  name: 'Video',
  post: {
    path: '_videos/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.md',
    url: 'video/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: '_assets/media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{t}.{ext}'
  }
},{
  type: 'bookmark',
  name: 'Bookmark',
  post: {
    path: '_bookmarks/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.md',
    url: 'bookmark/{yyyy}/{MM}/{dd}/{slug}/'
  }
},{
  type: 'reply',
  name: 'Reply',
  post: {
    path: '_replies/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.md',
    url: 'reply/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: '_assets/media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{t}.{ext}'
  }
},{
  type: 'like',
  name: 'Like',
  post: {
    path: '_likes/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.md',
    url: 'like/{yyyy}/{MM}/{dd}/{slug}/'
  }
},{
  type: 'repost',
  name: 'Repost',
  post: {
    path: '_reposts/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.md',
    url: 'repost/{yyyy}/{MM}/{dd}/{slug}/'
  }
},{
  type: 'event',
  name: 'Event',
  post: {
    path: '_events/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.md',
    url: 'event/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: '_assets/media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{t}.{ext}'
  }
},{
  type: 'Steps',
  name: 'Steps',
  post: {
    path: '_steps/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}-{t}.md',
    url: 'steps/{yyyy}-{MM}-{dd}/'
  }
}];

const storeMessageTemplate = metaData => {
  const {result, postType, fileType} = metaData;
  return `🤖 ${result} a ${postType} ${fileType}`;
};

indiekit.set('publication.locale', 'en-US');
indiekit.set('publication.me', 'https://joebuhlig.com');
indiekit.set('publication.preset', jekyll);
indiekit.set('publication.postTypes', postTypes);
indiekit.set('publication.store', github);
indiekit.set('publication.storeMessageTemplate', storeMessageTemplate);
indiekit.set('publication.syndicationTargets', [
  mastodon,
  twitter
]);
indiekit.set('publication.timeZone', 'America/Chicago');

const server = indiekit.server();

export default server;
