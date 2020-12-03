module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "^.+\\.test\\.(j|t)sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  "moduleNameMapper": {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  }
};
