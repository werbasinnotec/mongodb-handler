'use strict';

const { ESLint } = require('eslint');
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const shell = require('gulp-shell');

const esl = new ESLint({ errorOnUnmatchedPattern: false });
const commands = {
	test: 'LOG_LEVELS=info SYSID_INOBACKEND=famous nyc --reporter=lcovonly --reporter=text gulp mocha',
};
const paths = {
  analyze: [ '**/*.js', '!node_modules/**/*.js', '!coverage/**/*.js' ],
  tests: [ 'test/**/*Test.js' ]
};

const taskTest = async () => shell.task([commands.test])();
const taskLint = async () => console.log((await esl.loadFormatter('stylish')).format(await esl.lintFiles(paths.analyze))); // eslint-disable-line no-console
const taskMocha = async () => gulp.src(paths.tests, { read: false })
																	.pipe(mocha({ exit: true, timeout: 25000 }))
																	.on('error', console.error); // eslint-disable-line  no-console

exports.test = gulp.series(taskTest);
exports.mocha = gulp.series(taskMocha);
exports.lint = gulp.series(taskLint);
exports.default = gulp.series(taskLint, taskTest);
