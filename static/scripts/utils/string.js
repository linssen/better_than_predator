export function slugify(str) {
    str = str
        .replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, '')
        .replace(/\s{2,}/g, ' ')
        .replace(/\s/g, '-')
        .toLowerCase();
    return window.encodeURIComponent(str);
}
