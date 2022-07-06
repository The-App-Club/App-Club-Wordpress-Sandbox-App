const request = require("request");
const dayjs = require("dayjs");
const { readFileSync } = require("fs");
const processDir = "./process";

function getCodeMyUI(searchWord) {
  return new Promise((resolve, reject) => {
    request(
      `https://codemyui.com/wp-json/wp/v2/posts?search=${searchWord}&_fields=jetpack-related-posts`,
      function (error, response, body) {
        if (error) {
          reject(error);
        }
        resolve(JSON.parse(body));
      }
    );
  });
}

function randomRangeNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomTopicWord() {
  const json = readFileSync(`${processDir}/all-tag.json`, "utf-8");
  const itemList = JSON.parse(json);
  return itemList[randomRangeNumber(0, itemList.length - 1)];
}

function getMustTopicWord() {
  const mustTopicWordList = ["3d", "scroll", "effect"];
  return mustTopicWordList[randomRangeNumber(0, mustTopicWordList.length - 1)];
}

function groupBy(array, keyName) {
  return array.reduce((resultInfo, currentInfo) => {
    if (currentInfo[keyName] === undefined) {
      return resultInfo;
    }
    return Object.assign(resultInfo, {
      [currentInfo[keyName]]: (resultInfo[currentInfo[keyName]] || []).concat(
        currentInfo
      ),
    });
  }, {});
}

(async () => {
  const topicWord = getRandomTopicWord();
  const mustTopicWord = getMustTopicWord();
  const combinationKeyWord = `${mustTopicWord} ${topicWord}`;
  const fetchDataInfoList = await getCodeMyUI(`${combinationKeyWord}`);
  const prettyInfoList = [];
  for (let i = 0; i < fetchDataInfoList.length; i++) {
    const fetchDataInfo = fetchDataInfoList[i];
    const relatedPostInfoList = fetchDataInfo["jetpack-related-posts"];
    for (let j = 0; j < relatedPostInfoList.length; j++) {
      const relatedPostInfo = relatedPostInfoList[j];
      prettyInfoList.push({
        publicURL: relatedPostInfo.url,
        title: relatedPostInfo.title,
        date: dayjs(relatedPostInfo.date, "MMMM D YYYY").format("YYYY-MM-DD"),
        yyyy: dayjs(relatedPostInfo.date, "MMMM D YYYY").get("year"),
        mm: dayjs(relatedPostInfo.date, "MMMM D YYYY").get("month") + 1,
        dd: dayjs(relatedPostInfo.date, "MMMM D YYYY").get("date"),
        description: relatedPostInfo.excerpt,
        thumbnail: relatedPostInfo.img.src,
        keyword: `${combinationKeyWord}`,
      });
    }
  }

  if (prettyInfoList.length === 0) {
    console.log(JSON.stringify({ keyword: `${combinationKeyWord}` }));
  } else {
    const resultInfoList = [];

    const groupedYearInfo = groupBy(prettyInfoList, "yyyy");
    for (const [year, yearInfoList] of Object.entries(groupedYearInfo)) {
      const groupedMonthInfo = groupBy(yearInfoList, "mm");
      for (const [month, monthInfoList] of Object.entries(groupedMonthInfo)) {
        const groupedDayInfo = groupBy(monthInfoList, "dd");
        for (const [day, dayInfoList] of Object.entries(groupedDayInfo)) {
          resultInfoList.push({
            yyyy: year,
            mm: month,
            dd: day,
            infoList: dayInfoList,
          });
        }
      }
    }
    if (resultInfoList.length === 0) {
      console.log(JSON.stringify({ keyword: `${combinationKeyWord}` }));
    } else {
      console.log(JSON.stringify(resultInfoList));
    }
  }
})();
