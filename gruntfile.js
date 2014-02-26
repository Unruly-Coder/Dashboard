module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            js: {
                files: ['client/vendor/js/**/*.js', 'client/app/**/*.js'],
                tasks: ['concat:js']
            },
            scss2css: {
                files: ['client/sass/*.scss'],
                tasks: ['compass']
            },
            externalcss: {
                files: ['client/vendor/css/**/*.css'],
                tasks: ['concat:css']
            }
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
        }

    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('Development', ['watch']);

}
