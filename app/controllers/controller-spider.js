
const superagent = require('superagent');
const cheerio = require('cheerio');
exports.getData = function(req,res){
  const reptileUrl = "https://ke.qq.com/course/list?mt=1001&st=2004&tt=3321";
  const arr = [];
  superagent.get(reptileUrl)
            .end((err,result)=>{
              if(err) res.send('ERROR');
              let $ = cheerio.load(result.text);
              $(".course-card-list li").each((index,element)=>{
                let href = $(element).find('.item-img-link').attr('href');
                let imageUrl = $(element).find('.item-img-link img').attr('src');
                let statusDes = $(element).find('.item-status .item-status-step').text();
                let itemDes = $(element).find('.item-tt a').text();
                let userNum = $(element).find('.item-line--middle .item-user').text();
                let price =   $(element).find('.item-line--bottom .item-price').text();

                let dataObj = {
                  href: href,
                  imageUrl: imageUrl,
                  statusDes: statusDes,
                  itemDes: itemDes,
                  userNum: userNum,
                  price: price
                };
                arr.push(dataObj);
              }); 
              res.send({
                data:arr
              });
            });
}