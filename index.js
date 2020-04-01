const fs = require("fs");
const util = require("./util");

function handle(opts = {}) {
    if (opts instanceof Array) {
        opts.forEach(option => {
            handle(option);
        });
    } else if (opts.from && fs.existsSync(opts.from)) {
        util.copySync(opts.from, opts.to, (file) => {
            if (opts.debug) {
                console.log('cp-webpack-plugin >>> ', file);
            }
            if (opts.filter && typeof opts.filter === "function"){
                return opts.filter(file);
            }
            return true; 
        }, opts.map);
    }
}

function pligin(options) {
    this.options = options;
}

pligin.prototype.apply = function (compiler) {
    if (compiler.hooks) {
        compiler.hooks.afterEmit.tap("done", () => {
            if (this.options.debug) {
                console.log('');
            }
            handle(this.options);
            if (this.options.debug) {
                console.log('');
            }
        })
    } else {
        compiler.plugin('done', function () {
            if (this.options.debug) {
                console.log('');
            }
            handle(this.options);
            if (this.options.debug) {
                console.log('');
            }
        });
    }
}

module.exports = exports = pligin