/**
 * Created by brook on 2016/10/18.
 */
const app = require('../server');
const superagent = require('superagent');
const cheerio = require('cheerio');
/**
 *  data = [
 {
   houseUrl, // 房屋链接
   xiaoqu, // 小区
   huxing, // 户型
   mianji, // 面积
   chaoxiang, // 朝向
   zhuangxiu,// 装修
   dianti, //电梯
   louceng, // 楼层
   jianfang, // 建房时间
   time, // 成交时间
   price, // 单价
   totalPrice, // 总价
 }
 ];
 */
const data = [];
const parserPage = ($, data) => {
  const list = $('.listContent').children('li');
  for (let i = 0; i < list.length; i++){
    const divTag = $(list[i]).children('.info');

    const title = $(divTag).children('.title').children('a')[0];
    const houseUrl = title.attribs.href;
    const xiaoqu = title.children[0].data.split(" ")[0];
    const huxing = title.children[0].data.split(" ")[1];
    const mianji = title.children[0].data.split(" ")[2];

    const houseInfo = $(divTag).children('.address').children('.houseInfo')[0].children[0].next.data;
    const chaoxiang = houseInfo.split('|')[0];
    const zhuangxiu = houseInfo.split('|')[1];
    const dianti = houseInfo.split('|')[2];

    const floor = $(divTag).find('.positionInfo')[0].children[0].next.data;
    const louceng = floor.split(" ")[0];
    const jianfang = floor.split(" ")[1];

    const time = $(divTag).children('.address').children('.dealDate')[0].children[0].data;
    const price =$(divTag).find('.unitPrice').find('.number')[0].children[0].data;
    const totalPrice = $(divTag).children('.address').find('.number')[0].children[0].data;

    data.push({
      houseUrl,
      xiaoqu,
      huxing,
      mianji,
      chaoxiang,
      zhuangxiu,
      dianti,
      louceng,
      jianfang,
      time,
      price,
      totalPrice,
    });
  }
};

const url = 'http://nj.lianjia.com/chengjiao/';
const spider = app => {
  app.get('/begin', (req, res, next) => {
    superagent.get(url)
      .end((err, sres) => {
        if(err) return next(err); // 错误处理
        const $ = cheerio.load(sres.text); //load html
        const records = parseInt($('.total').find('span').html(), 10);
        const pages = (records % 30 === 0) ? records/30 : records/30 + 1;
        console.log(`${records},${pages}`);
        parserPage($, data);
        res.json(data);

      })
  });
};
module.exports = spider;
