const request = require("request");
const rp = require("request-promise");

const { writeFileSync, rmdirSync, readFileSync } = require("fs");
const mkdirp = require("mkdirp");
const { JSDOM } = require("jsdom");

const dumpDir = "./dump";
const processDir = "./process";

function download(url) {
  return new Promise((resolve, reject) => {
    rp(url)
      .then((html) => {
        writeFileSync(`${dumpDir}/index.html`, html);
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function getAllTagNameList() {
  const html = readFileSync(`${dumpDir}/index.html`, "utf-8");
  const dom = new JSDOM(html);

  return [
    ...dom.window.document.querySelector(`#allTags`).querySelectorAll(`a`),
  ].map((dom) => {
    return dom.getAttribute("title");
  });
}

(async () => {
  mkdirp(dumpDir);
  mkdirp(processDir);
  await download("https://codemyui.com/all-tags/");
  const allTagNameList = getAllTagNameList();
  writeFileSync(`${processDir}/all-tag.json`, JSON.stringify(allTagNameList));
})();
