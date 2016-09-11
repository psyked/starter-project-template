module.exports = function (grunt) {

    var babel = require('rollup-plugin-babel');
    var uglify = require('rollup-plugin-uglify');

    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    "css/index.css": "scss/root.scss"
                }
            }
        },

        rollup: {
            options: {
                plugins: [
                    babel({
                        presets: ['es2015-rollup']
                    })
                ],
                sourceMap: true
            },
            dist: {
                options: {
                    plugins: [
                        babel({
                            presets: ['es2015-rollup']
                        }),
                        uglify()
                    ]
                },
                files: {
                    'js/index.js': 'js_source/index.js'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            styles: {
                files: ['scss/**/*.scss'], // which files to watch
                tasks: ['sass'],
                options: {
                    nospawn: true
                }
            },
            scripts: {
                files: ['js_source/**/*.js'], // which files to watch
                tasks: ['rollup'],
                options: {
                    nospawn: true
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 8080,
                    livereload: true,
                    base: './',
                    open: 'http://localhost:8080'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-rollup');

    grunt.registerTask('default', ['sass', 'rollup', 'connect', 'watch']);
};
