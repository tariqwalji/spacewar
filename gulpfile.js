const gulp = require("gulp");
const babel = require("gulp-babel");

gulp.task("js", () => {
    return gulp.src("./src/game.js").pipe(gulp.dest("."));
});

gulp.task("default", () => {
    gulp.watch("src/game.js", gulp.series("js"));
});