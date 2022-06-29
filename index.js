import _ from 'lodash';
import {Indiekit} from '@indiekit/indiekit';
import {JekyllPreset} from '@indiekit/preset-jekyll';
import {GithubStore} from '@indiekit/store-github';
import {InternetArchiveSyndicator} from '@indiekit/syndicator-internet-archive';

const indiekit = new Indiekit();
const jekyll = new JekyllPreset();

const github = new GithubStore({
  user: 'joebuhlig',
  repo: 'joebuhlig.com',
  branch: 'master',
  token: process.env.GITHUB_TOKEN
});

const postTypes = [{
  type: 'article',
  name: 'Article',
  post: {
    path: '_posts/{yyyy}-{MM}-{dd}-{slug}.md',
    url: '{slug}/'
  },
  media: {
    path: 'assets/media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{HH}-{mm}-{ss}.{ext}'
  }
},{
  type: 'note',
  name: 'Note',
  post: {
    path: '_notes/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.md',
    url: 'note/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: 'media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.{ext}',
    url: 'media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.{ext}'
  }
},{
  type: 'photo',
  name: 'Photo',
  post: {
    path: '_photos/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.md',
    url: 'photo/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: 'media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.{ext}',
    url: 'media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.{ext}'
  }
},{
  type: 'video',
  name: 'Video',
  post: {
    path: '_videos/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.md',
    url: 'video/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: 'media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.{ext}',
    url: 'media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.{ext}'
  }
},{
  type: 'bookmark',
  name: 'Bookmark',
  post: {
    path: '_bookmarks/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.md',
    url: 'bookmark/{yyyy}/{MM}/{dd}/{slug}/'
  }
},{
  type: 'reply',
  name: 'Reply',
  post: {
    path: '_replies/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.md',
    url: 'reply/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: 'media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.{ext}',
    url: 'media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.{ext}'
  }
},{
  type: 'like',
  name: 'Like',
  post: {
    path: '_likes/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.md',
    url: 'like/{yyyy}/{MM}/{dd}/{slug}/'
  }
},{
  type: 'repost',
  name: 'Repost',
  post: {
    path: '_reposts/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.md',
    url: 'repost/{yyyy}/{MM}/{dd}/{slug}/'
  }
},{
  type: 'event',
  name: 'Event',
  post: {
    path: '_events/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.md',
    url: 'event/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: 'media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.{ext}',
    url: 'media/{yyyy}-{MM}-{dd}-{HH}-{mm}-{ss}.{ext}'
  }
},{
  type: 'Steps',
  name: 'Steps',
  post: {
    path: '_steps/{yyyy}-{MM}-{dd}.md',
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
indiekit.set('publication.syndicationTargets', [{
  info: {
    uid: 'https://twitter.com/joebuhlig',
    name: 'joebuhlig@twitter.com'}
}, {
  info: {
    uid: 'https://mastodon.social/@joebuhlig',
    name: '@joebuhlig@mastodon.social'}
}, {
  info: {
    uid: 'https://flickr.com/joebuhlig',
    name: 'joebuhlig@flickr.com'}
}, {
  info: {
    uid: 'https://instagram.com/joebuhlig',
    name: 'joebuhlig@instagram.com'}
}, {
  info: {
    uid: 'https://reddit.com/r/joebuhlig',
    name: '/r/joebuhlig@reddit.com'}
}, {
  info: {
    uid: 'https://medium.com/joebuhlig-com',
    name: 'joebuhlig-com@medium.com'}
}, {
  info: {
    uid: 'https://tumblr.com/blog/joebuhlig',
    name: 'joebuhlig@tumblr.com'}
}]);

indiekit.set('publication.timeZone', 'America/Chicago');

const server = indiekit.server();

export default server;
