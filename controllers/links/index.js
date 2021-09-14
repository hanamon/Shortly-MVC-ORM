const utils = require('../../modules/utils');
const { Url } = require('../../models');

module.exports = {
  get: async (req, res) => {
    const urls = await Url.findAll();
    res.status(200).json(urls);
  },
  post: (req, res) => {
    const { url } = req.body;
    
    // 입력받은 URL이 존재하지 않는다면 다음을 리턴한다.
    if( !url ) return res.status(400).send('Bad Request.');

    // 입력받은 URL이 유효한지 검사한다.
    if( !utils.isValidUrl(url) ) return res.sendStatus(400);
    
    // 입력받은 URL이 유효하다면 다음을 수행한다.
    utils.getUrlTitle(url, (err, title) => {
      // 입력받은 URL로 접속해서 제목을 읽을 수 없다면 다음을 리턴한다.
      if( err ) return res.status(400).send('Error reading url heading');
      // 입력받은 URL로 접속해서 제목을 읽을 수 있다면 다음을 수행한다.
      // findOrCreate : 쿼리와 일치하는 행을 찾거나 행이 없으면 빌드한다. (중복 저장 방지)
      Url
        .findOrCreate({
          where: { url },
          defaults: { title }
        })
        .then(([result, created]) => {
          if( !created ) return res.status(201).json(result); // find
          res.status(201).json(result); // Created
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500); // Server error
        });
    });
  },
  redirect: (req, res) => {
    Url
      .findOne({
        where: { id: req.params.id }
      })
      .then((result) => {
        if( !result ) {
          // 204 코드 : 서버가 요청을 성공적으로 처리했지만 콘텐츠가 없다.
          res.sendStatus(204); // No Content
        }
        else {
          // result에 업데이트 하기 때문에 옵션을 제공하지 않아도 된다.
          return result.update({ visits: result.visits + 1 });
        }
      })
      .then((result) => {
        // 요청 받은 params id 에 해당하는 레코드의 url로 리디렉션한다.
        res.redirect(result.url);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500); // Server error
      });
  }
};
