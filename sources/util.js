const startsWith = (string, search, position = 0) => {
  return string.lastIndexOf(search, position) === position;
};

const includes = (string, search, position = 0) => {
  return string.indexOf(search, position) !== -1;
};

module.exports = {
  startsWith,
  includes,
};
