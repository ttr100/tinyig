const fs = require('fs');
const path = require('path');
const handlebars = require("handlebars");

function handlebarRender(content, data){
  const renderer = handlebars.compile(content);
  return renderer(data);
}

function registerHtmlPartial(partialName, fileName){
  let targetFile = path.join('html/partials', fileName);
  let content = fs.readFileSync(targetFile, 'utf-8');

  handlebars.registerPartial(partialName, content)
}

function html(fileName, data){
  let targetFile = path.join('html', fileName);
  let exist = fs.existsSync(targetFile)
  if(exist){
    registerHtmlPartial('layout', 'layout.html');
    registerHtmlPartial('headPartial', 'head.html');
    registerHtmlPartial('navigationBar', 'navigationBar.html');

    let content = fs.readFileSync(targetFile, 'utf-8');
    return handlebarRender(content, data);
  }

  return `File not found ${fileName}`;
}

module.exports = {
  render: html
}
