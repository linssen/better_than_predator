/* eslint-disable no-useless-escape */

export default function slugify(str) {
  const slug = str
    .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s/g, '-')
    .toLowerCase();
  return window.encodeURIComponent(slug);
}
