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
        
        // post processing for css output files
        postcss: {
            options: {
                map: true, // inline sourcemaps
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions' // add vendor prefixes
                    }),
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'dist/css/index.css',
                dest: 'dist/css/index.min.css'
            }
        },

        rollup: {
            options: {
                plugins: [
                    babel(),
                ],
                sourceMap: true
            },
            dist: {
                options: {
                    plugins: [
                        babel(),
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
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-rollup');

    grunt.registerTask('default', ['sass', 'postcss', 'rollup', 'connect', 'watch']);
};
