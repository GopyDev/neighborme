var fs = require('fs');
var BASE_PATH = './app/static/js/';

function createAppendFunc(packageName) {
  return function(suffix) {
    return BASE_PATH + packageName + suffix;
  }
}

function filePaths(appendFunc) {
  var jsPaths = ['/**/*.js', '/**/*.jsx'].map(appendFunc);
  var excludeModulePath = ['!' + appendFunc('/module.js')];
  return jsPaths.concat(excludeModulePath);
}

function defineFiles() {
  var files = fs.readdirSync(BASE_PATH);
  var result = {};
  var i;
  var length;
  var file;
  var key;
  var value;
  var appendFunc;

  for (i = 0, length = files.length; i < length; i++) {
    file = files[i];
    if (!fs.statSync(BASE_PATH + file).isDirectory()) { continue; }
    if (file === 'vendor') { continue; }

    appendFunc = createAppendFunc(file);
    key = appendFunc('/module.js');
    value = filePaths(appendFunc);

    result[key] = value;
  }

  return result;
}

module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ["babelify", {
              loose: "all"
            }]
          ]
        },
        files: defineFiles()
      }
    },
    watch: {
      scripts: {
        files: [
          "./app/static/js/**/*.js",
          "./app/static/js/**/*.jsx",
          "!./app/static/js/**/module.js"
        ],
        tasks: ["browserify"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("build", ["browserify"]);
};
