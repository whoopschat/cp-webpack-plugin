# cp-webpack-plugin
> cp-webpack-plugin

## Getting started
* make sure node and npm installed;

### Install
```
> npm install cp-webpack-plugin --save
```

### Usage

##### webpack.config.js

```javascript
//webpack.config.js
var path = require('path');
var CpWebpackPlugin = require('cp-webpack-plugin');

module.exports = {
  ...
  plugins: [
    new CpWebpackPlugin([
      from: path.resolve('./static'),
      to: path.resolve('./dist'),
    ])
  ]
  ...
}
```