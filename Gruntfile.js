module.exports = function (grunt) {
    'use strict';

    require('time-grunt')(grunt);


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: "<%= pkg.name %>"
            }
        },
        notify: {
            css: {
                options: {
                    title: "<%= pkg.name %> CSS",
                    message: "Fertig kompiliert. ✓"
                }
            },
            js: {
                options: {
                    title: "<%= pkg.name %> JavaScript",
                    message: "Fertig kompiliert. ✓"
                }
            },
            jade: {
                options: {
                    title: "<%= pkg.name %> JADE",
                    message: "Fertig kompiliert. ✓"
                }
            },
            build: {
                options: {
                    title: "<%= pkg.name %> Deploy",
                    message: "Ready to deploy. ✓"
                }
            }
        },
        concat: {
            options: {
                separator: "\n\n"
            },
            js: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    '<%= pkg.buildConfig.devfold %>assets/js/<%= pkg.name %>.js'
                ],
                dest: '<%= pkg.buildConfig.publicfold %>js/<%= pkg.name %>.js'
            },
            css: {
                src: [
                    '<%= pkg.buildConfig.publicfold %>css/<%= pkg.name %>-temp.css'
                ],
                dest: '<%= pkg.buildConfig.publicfold %>css/<%= pkg.name %>.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> minified js file */\n'
            },
            dist: {
                files: {
                    '<%= pkg.buildConfig.publicfold %>js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
                }
            }
        },
        imagemin: {
            dynamic: {
              files: [{
                expand: true,                
                cwd: '<%= pkg.buildConfig.devfold %>assets/img',
                src: ['**/*.{png,jpg,gif}'],
                dest: '<%= pkg.buildConfig.publicfold %>img/'
              }]
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '/* <%= pkg.name %> minified css file */',
                    keepSpecialComments: '0'
                },
                files: {
                    '<%= pkg.buildConfig.publicfold %>css/<%= pkg.name %>.min.css': '<%= pkg.buildConfig.publicfold %>css/<%= pkg.name %>.css'
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', '<%= pkg.buildConfig.devfold %>assets/js/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                },
                reporter: require('jshint-stylish')
            }
        },
        sass: {
            compile: {
                options: {
                    sourcemap: 'auto'
                },
                files: {
                    '<%= pkg.buildConfig.publicfold %>css/<%= pkg.name %>-temp.css': '<%= pkg.buildConfig.devfold %>assets/sass/<%= pkg.name %>.sass'
                }
            }
        },
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.buildConfig.devfold %>assets/templates',
                        src: ['**/*.jade'],
                        dest: '<%= pkg.buildConfig.publicfold %>',
                        ext: '.html'
                    }
                ]}
        },
        autoprefixer: {
            options: {
                autoprefixerBrowsers: [
                  "Android >= 4",
                  "Chrome >= 21",
                  "Firefox >= 20",
                  "Explorer >= 10",
                  "iOS >= 6",
                  "Opera >= 12",
                  "Safari >= 5"
                ],
            },
            core: {
                options: {
                    map: true
                },
                src: '<%= pkg.buildConfig.publicfold %>css/<%= pkg.name %>.css'
            }
        },
        connect: {
            all: {
                options:{
                    port: 6666,
                    hostname: '*',
                    base: '<%= pkg.buildConfig.publicfold %>',
                    keepalive: true
                }
            }
        },
        open : {
            dev : {
                path: 'http://localhost:6666',
                app: 'Firefox'
            }
        },
        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            js: {
                files: ['<%= jshint.files %>', '<%= concat.js.src %>'],
                tasks: ['jshint', 'concat:js', 'notify:js']
            },
            sass: {
                files: ['<%= pkg.buildConfig.devfold %>assets/sass/*.sass'],
                tasks: ['sass', 'concat:css', 'autoprefixer:core', 'notify:css']
            },
            jade: {
                files: [
                    '<%= pkg.buildConfig.devfold %>assets/templates/*.jade'
                ],
                tasks: ['jade', 'notify:jade']
            }
        },
        clean: {
            build: ["<%= pkg.buildConfig.publicfold %>"]  
        },
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.buildConfig.devfold %>assets/font/',
                        src: ['**/*'],
                        dest: '<%= pkg.buildConfig.publicfold %>/font/'
                    }
                ]
            },
            svg: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.buildConfig.devfold %>assets/img/',
                        src: ['**/*.svg'],
                        dest: '<%= pkg.buildConfig.publicfold %>/img/',
                        filter: 'isFile'
                    }
                ]
            }
        }
    });

    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-open');


    grunt.registerTask('server', ['connect']);
    grunt.registerTask('dev', ['open', 'jshint', 'sass', 'jade', 'concat', 'autoprefixer:core', 'copy', 'watch']);
    grunt.registerTask('build', ['clean', 'jshint', 'copy', 'imagemin', 'concat:js', 'uglify', 'sass', 'jade', 'concat:css', 'autoprefixer:core', 'cssmin', 'notify:build']);
    
    grunt.task.run('notify_hooks');

};
