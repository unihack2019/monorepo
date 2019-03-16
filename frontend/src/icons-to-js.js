// Greatest code in the world :P
const globby = require('globby');
const { join, basename, relative } = require('path');
const { exists, writeFile } = require('mz/fs');
function plainIcon(folderName) {
  return `${folderName}-plain.svg`;
}
function originalIcon(folderName) {
  return `${folderName}-original.svg`;
}

function exportStatement(folderName, importName) {
  return `export { default as ${folderName.replace(/-/g, '').toLowerCase()} } from './${relative(
    __dirname,
    importName,
  ).replace(/\\/g, '/')}';\n`;
}
async function createTheFile() {
  const paths = await globby([join(__dirname, 'devicon-master/*')], { onlyFiles: false });
  let code = '';
  for (const path of paths) {
    const folderName = basename(path);
    const original = join(path, originalIcon(folderName));
    const plain = join(path, plainIcon(folderName));

    if (await exists(original)) {
      code += exportStatement(folderName, original);
    } else if (await exists(plain)) {
      code += exportStatement(folderName, plain);
    }
  }
  /*
  code += 'export default {\n';
  for(const path of paths) {
    const folderName = basename(path);
    const original = join(path, originalIcon(folderName));
    const plain = join(path, plainIcon(folderName));
    if (await exists(plain)) {
      code += `  ${folderName}: ${folderName},\n`;  
    } else if (await exists(original)) {
      code += `  ${folderName}: ${folderName},\n`;  
    }
  }
  code += '}\n';*/
  console.log(code);
  await writeFile(join(__dirname, 'devicons.js'), code, 'utf8');
}
createTheFile().catch(console.error);
