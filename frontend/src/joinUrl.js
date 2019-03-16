function joinUrl(url, addedStuff) {
  return url.replace(/\/+/, '') + addedStuff;
}
export default joinUrl;
