const {src, dest, watch} = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");

sass2css = function() {
    return src("./source/sass/app.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(dest("dist/"));
};

exports.default = function() {
    watch("./source/sass/**/*.scss", sass2css);
};