const api = 'https://hacker-news.firebaseio.com/v0';
const json = '.json?print=pretty';

function removeDead (posts) {
  return posts.filter(Boolean).filter(({ dead }) => dead !== true);
}

function removeDeleted(posts) {
  return posts.filter(({ deleted }) => deleted !== true);
}

function onlyComments (posts) {
  return posts.filter(({ type }) => type === 'comment');
}

function onlyPosts (posts) {
  return posts.filter(({ type }) => type === 'story' || type === 'job');
}

export function fetchItem(id) {
  return fetch(`${api}/item/${id}${json}`)
  .then((response) => response.json())
}

export function fetchComments(ids) {
  return Promise.all(ids.map(fetchItem))
  .then((comments) => removeDeleted(onlyComments(removeDead(comments))))
}

export function fetchStories(type) {
  return fetch(`${api}/${type}stories${json}`)
  .then((response) => response.json())
  .then((ids) => {
    if(!ids) {
      throw new Error(`Sorry no stories for ${type}...`);
    }

    return ids.slice(0,30);
  })
  .then((ids) => Promise.all(ids.map(fetchItem)))
  .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
}

export function fetchUser(id) {
  return fetch(`${api}/user/${id}${json}`)
  .then((response) => response.json())
}

export function fetchPosts(ids) {
  return Promise.all(ids.map(fetchItem))
  .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
}