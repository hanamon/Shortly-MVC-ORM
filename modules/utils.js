// [이해 불가] : request 모듈 찾아보기
const request = require('request');
// [이해 불가] : URL 정규표현식 찾아보기
const rValidUrl = /^(?!mailto:)(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:\/[^\s]*)?$/i;

exports.getUrlTitle = (url, cd) => {
  request(url, (err, res, html) => {
    if (err) {
      console.log('Error reading url heading: ', err);
      return cd(err);
    } else {
      // [이해 불가] : 태그 정규표현식
      const tag = /<title>(.*)<\/title>/;
      const match = html.match(tag);
      console.log(match.length);
      const title = match ? match[1] : url;
      return cd(err, title)
    }
  });
};

exports.isValidUrl = (url) => {
  return url.match(rValidUrl);
};
