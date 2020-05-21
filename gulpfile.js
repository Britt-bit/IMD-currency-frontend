const {src, dest, watch} = require("gulp");
const image = require("gulp-image");
const sass = require("gulp-sass");
sass.compiler = require("node-sass");

image('image', function(){
    return src('./source/inculdes/*')
        .pipe(image())
        .pipe(dest('dist/'));
});

//exports.sass2css = function() {
//    return src("./source/sass/app.scss")
//        .pipe(sass().on("error", sass.logError))
//        .pipe(dest("dist/"));
//};

exports.default = function() {
    watch("./source/includes/**", image);
};