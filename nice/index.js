const request = require("request");
const moment = require("moment");

function getCodeMyUI(tagIdList) {
  return new Promise((resolve, reject) => {
    request(
      `https://codemyui.com/wp-json/wp/v2/posts?tags=${tagIdList.join(
        ","
      )}&_fields=date,id,excerpt,title,link,tags,jetpack_featured_media_url&after=2020-07-24T01:10:16`,
      function (error, response, body) {
        if (error) {
          reject(error);
        }
        resolve(body);
      }
    );
  });
}

(async () => {
  const catchInfoFromDate = moment()
    .subtract(30, "days")
    .utc()
    .format("YYYY-MM-DDTHH:mm:ss");
  const fetchDataInfo = await getCodeMyUI(
    [138009468, 2434200],
    catchInfoFromDate
  );
  console.log(fetchDataInfo);
})();
