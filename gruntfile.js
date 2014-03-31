module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            all: {
                files: ['client/public/**/*'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['client/vendor/js/**/*.js', 'client/app/**/*.js'],
                tasks: ['jshint', 'concat:js']
            },
            jsServer: {
                files: ['modules/**/*.js', 'services/**/*.js'],
                tasks: ['jshint']
            },
            scss2css: {
                files: ['client/sass/**/*.scss'],
                tasks: ['compass']
            },
            externalcss: {
                files: ['client/vendor/css/**/*.css'],
                tasks: ['concat:css']
            },
            widgetscss: {
                files: ['client/app/widgets/**/*.scss'],
                tasks: ['concat:widgetscss']
            },
            views: {
                files: ['client/app/widgets/**/*.html'],
                tasks: ['copy:views']
            }
        },
        jshint: {
            all: ['client/app/**/*.js', 'modules/**/*.js', 'services/**/*.js' ]
        },
        concat: {
            js: {
                src: [
                    'client/vendor/js/jquery-2.1.0.min.js',
                    'client/vendor/js/angular.js',
                    'client/vendor/js/**/*.js',
                    'client/app/app.js',
                    'client/app/**/*.js'
                ],
                dest: 'client/public/javascripts/app.js'
            },
            css: {
                src: [
                    'client/vendor/css/**/*.css',
                ],
                dest: 'client/public/stylesheets/external.css'
            },
            widgetscss: {
                src: ['client/app/widgets/**/*.scss'],
                dest: 'client/sass/_widgets.scss'
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'client/sass',
                    cssDir: 'client/public/stylesheets',
                    outputStyle: 'compressed'
                }
            }
        },
        copy: {
            views: {
                expand: true,
                cwd: 'client/app/widgets/',
                src: ['**/*.html'],
                dest: 'client/public/views/widgets/',
                flatten: true
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('development', ['watch']);
    grunt.registerTask('build', ['concat', 'compass', 'copy']);
}
