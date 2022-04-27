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
    path: '_assets/media/{yyyy}-{MM}-{dd}-{slug}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{slug}.{ext}'
  }
},{
  type: 'note',
  name: 'Note',
  post: {
    path: '_notes/{yyyy}-{MM}-{dd}-{slug}.md',
    url: 'note/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: '_assets/media/{yyyy}-{MM}-{dd}-{slug}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{slug}.{ext}'
  }
},{
  type: 'photo',
  name: 'Photo',
  post: {
    path: '_photos/{yyyy}-{MM}-{dd}-{slug}.md',
    url: 'photo/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: '_assets/media/{yyyy}-{MM}-{dd}-{slug}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{slug}.{ext}'
  }
},{
  type: 'video',
  name: 'Video',
  post: {
    path: '_videos/{yyyy}-{MM}-{dd}-{slug}.md',
    url: 'video/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: '_assets/media/{yyyy}-{MM}-{dd}-{slug}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{slug}.{ext}'
  }
},{
  type: 'bookmark',
  name: 'Bookmark',
  post: {
    path: '_bookmarks/{yyyy}-{MM}-{dd}-{slug}.md',
    url: 'bookmark/{yyyy}/{MM}/{dd}/{slug}/'
  }
},{
  type: 'reply',
  name: 'Reply',
  post: {
    path: '_replies/{yyyy}-{MM}-{dd}-{slug}.md',
    url: 'reply/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: '_assets/media/{yyyy}-{MM}-{dd}-{slug}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{slug}.{ext}'
  }
},{
  type: 'like',
  name: 'Like',
  post: {
    path: '_likes/{yyyy}-{MM}-{dd}-{slug}.md',
    url: 'like/{yyyy}/{MM}/{dd}/{slug}/'
  }
},{
  type: 'repost',
  name: 'Repost',
  post: {
    path: '_reposts/{yyyy}-{MM}-{dd}-{slug}.md',
    url: 'repost/{yyyy}/{MM}/{dd}/{slug}/'
  }
},{
  type: 'event',
  name: 'Event',
  post: {
    path: '_events/{yyyy}-{MM}-{dd}-{slug}.md',
    url: 'event/{yyyy}/{MM}/{dd}/{slug}/'
  },
  media: {
    path: '_assets/media/{yyyy}-{MM}-{dd}-{slug}.{ext}',
    url: 'media/{yyyy}/{MM}/{dd}/{slug}.{ext}'
  }
},{
  type: 'Steps',
  name: 'Steps',
  post: {
    path: '_steps/{yyyy}-{MM}-{dd}-{slug}.md',
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
  uid: 'https://twitter.com/joebuhlig/',
  name: '@joebuhlig@twitter.com'
}, {
  uid: 'https://mastodon.social/@joebuhlig',
  name: '@joebuhlig@mastodon.social'
}]);

indiekit.set('publication.timeZone', 'America/Chicago');

const server = indiekit.server();

export default server;
