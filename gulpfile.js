// Imports
var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var rename = require("gulp-rename");
var GulpSSH = require('gulp-ssh');
var sequence = require('run-sequence');
var argv = require('yargs').argv;
var merge = require('merge-stream');
var node_ssh = require('node-ssh');

gulp.task('publish:source', function () {
    var config = {
        host: argv.host,
        port: 22,
        username: argv.username,
        password: argv.password
    };

    var gulpSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: config
    });

    return gulp
        .src(['./dist/**'])
        .pipe(gulpSSH.dest(`/opt/${argv.service}`));
});

gulp.task('publish:dockerfile', function () {
    var config = {
        host: argv.host,
        port: 22,
        username: argv.username,
        password: argv.password
    };

    var gulpSSH = new GulpSSH({
        ignoreErrors: false,
        sshConfig: config
    });

    return gulp
        .src(['./Dockerfile', './nginx.conf'])
        .pipe(gulpSSH.dest(`/docker-uploads/${argv.service}`));
});

gulp.task('docker:stop', function (done) {
    var ssh = new node_ssh();

    ssh.connect({
        host: argv.host,
        username: argv.username,
        password: argv.password
    }).then(function () {
        ssh.execCommand(`docker stop ${argv.service}`).then(function (result) {
            return ssh.execCommand(`docker rm ${argv.service}`);
        }).then(function (result) {
            ssh.dispose();
            done();
        }).catch(function (err) {
            done(err);
        });
    }).catch(function (err) {
        done(err);
    });
});

gulp.task('docker:build', function (done) {
    var ssh = new node_ssh();

    ssh.connect({
        host: argv.host,
        username: argv.username,
        password: argv.password
    }).then(function () {
        ssh.execCommand(`docker build --no-cache -t ${argv.service} /docker-uploads/${argv.service}`).then(function (result) {
            return ssh.execCommand(`docker run -d -p 9090:4200 -v /opt/${argv.service}:/usr/share/nginx/html --name ${argv.service} -t ${argv.service}`);
        }).then(function (result) {
            ssh.dispose();
            done();
        }).catch(function (err) {
            done(err);
        });
    }).catch(function (err) {
        done(err);
    });
});

gulp.task('docker:start', function (done) {
    var ssh = new node_ssh();

    ssh.connect({
        host: argv.host,
        username: argv.username,
        password: argv.password
    }).then(function () {
        ssh.execCommand(`docker start ${argv.service}`).then(function (result) {
            ssh.dispose();
            done();
        }).catch(function (err) {
            done(err);
        });
    }).catch(function (err) {
        done(err);
    });
});
