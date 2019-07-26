module.exports = function(grunt){

	grunt.initConfig({
		
		service_worker: {
		    options: {
				baseDir: '/',
				workerFile: 'service-worker.js'
		    }
		},

		pkg:grunt.file.readJSON('package.json'),

		bump: {
		    options: {
				files: ['package.json'],
			    updateConfigs: ['pkg', 'component'],
				commit: false,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ['package.json'],
				createTag: false,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: false,
				pushTo: 'upstream',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
				globalReplace: false,
				prereleaseName: false,
				metadata: '',
				regExp: false
		    }
		},

		cssmin: {  
            sitecss: {  
                options: {  
                    banner: '/* Hiperactivo */'  
                },  
                files: {  
                    	'dist/app/assets/css/externos.min.css': [
    					'app/bower_components/angular-bootstrap/ui-bootstrap-csp.css',
    					'app/bower_components/bootstrap/dist/css/bootstrap.min.css',
                    ]
                }  
            }  
        },

        uglify: {  
            options: {  
                compress: true  
            },  
            app: {  
                src: [  
	                'app/js/directives/**/*.js',
	                'app/js/dao/*.js',
	                'app/js/models/*.js',
	                'app/js/controllers/*.js',
	                'app/js/config.js',
	                'app/js/app.js',
                ],  
                dest: 'dist/app/js/app.min.js'  
            },            
            libs: {  
                src: [  
                    'app/bower_components/angular/angular.js',
				    'app/bower_components/angular-route/angular-route.js',
				    'app/bower_components/angular-messages/angular-messages.js',
				    'app/bower_components/jquery/dist/jquery.min.js',
				    'app/bower_components/bootstrap/dist/js/bootstrap.min.js',
				    'app/bower_components/bootbox/bootbox.js',
				    'app/bower_components/bootbox.js/bootbox.js',
				    'app/bower_components/ngBootbox/dist/ngBootbox.min.js',
				    'app/bower_components/angular-sanitize/angular-sanitize.js',
				    'app/bower_components/angular-rut/dist/angular-rut.min.js',
				    'app/bower_components/ng-file-upload/ng-file-upload-shim.min.js',
				    'app/bower_components/ng-file-upload/ng-file-upload.min.js',
				    'app/bower_components/angular-bootstrap/ui-bootstrap.js',
				    'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
				    'app/bower_components/google-maps/lib/Google.min.js',
				    'app/bower_components/ngmap/build/scripts/ng-map.min.js'
                ],  
                dest: 'dist/app/js/libs/libs.min.js'  
            },
            vendor: {  
                src: [

                ],  
                dest: 'dist/app/assets/vendor/vendor.min.js'  
            },
            tema: {  
                src: [
                	'app/assets/js/theme.js',
				    'app/assets/vendor/rs-plugin/js/jquery.themepunch.tools.min.js',
				    'app/assets/vendor/rs-plugin/js/jquery.themepunch.revolution.min.js',
				    'app/assets/js/views/view.contact.js',
				    'app/assets/js/demos/demo-medical.js',
				    'app/assets/js/custom.js',
				    'app/assets/js/theme.init.js'
                ],  
                dest: 'dist/app/assets/js/tema.min.js'  
            }
        },

		clean: ['./dist'],

		copy: {
			main: {
				files:[
					{
						expand: true, src: [
							'./app/**','./app/manifest.json',
							'!./app/bower_components/**'
						], dest: 'dist/'
					},
				]
			},
			minify: {
			    files: [
					// includes files within path and its sub-directories
					{
						expand: true, src: [
				      	'./app/assets/**/*.ico',
				      	'./app/assets/**/*.css',
				      	'./app/assets/**/*.woff',
				      	'./app/assets/**/*.woff2',
				      	'./app/assets/**/*.eot',
				      	'./app/assets/**/*.ttf',
				      	'./app/assets/**/*.png',
				      	'./app/assets/**/*.gif',
				      	'./app/assets/**/*.jpg',
				      	'./app/assets/**/*.jpeg',
				      	'./app/assets/**/*.json',
				      	'./app/assets/**/*.pdf',
				      	'!./app/assets/**/*.js',
				      	'./app/data/**',
				      	'./app/assets/vendor/vendor.min.js',
				      	'./app/assets/js/tema.min.js',
				      	'./app/manifest.json',
				      	'./app/main.js',
				      	'./app/service-worker.js',
				      	'./app/app.min.js',
				      	'./app/views/**',
				      	'./app/js/directives/**/*.html',
				      	], 
				      	dest: 'dist/'
					},
			    ],
			},
		},

		ngconstant: {
			// Options for all targets
			options: {
				space: '  ',
				wrap: '"use strict";\n\n {\%= __ngModule %}',
				name: 'constantes',
			},
			// Environment targets
			local: {
				options: {
					dest: './app/js/config.js',
				},
				constants: {
					ENV: {
						name: 'local',
						URLRecursos: 'http://localhost:4200/',
						APIEndPoint: 'https://test.hiperactivo.cl/pwa/api/public/',
						NotificacionEndPoint: 'http://localhost:3000/',
					}
				}				
			},
			// Environment targets
			development: {
				options: {
					dest: './app/js/config.js',
				},
				constants: {
					ENV: {
						base: '"/pwa/"',
						name: 'development',
						URLRecursos: 'https://test.hiperactivo.cl/pwa/',
						APIEndPoint: 'https://test.hiperactivo.cl/pwa/api/public/',
						NotificacionEndPoint: 'https://www.policenter.cl/ha/api/public/',
					}
				}
			},
			// Environment targets
			production: {
				options: {
					dest: './app/js/config.js'
				},
				constants: {
					ENV: {
						base: '"/"',
						name: 'production',
						URLRecursos: 'https://www.policenter.cl/',
						APIEndPoint: 'https://www.policenter.cl/ha/api/public/',
						NotificacionEndPoint: 'https://www.policenter.cl/ha/api/public/',
					}
				}
			}
		},

		processhtml: {
			development: {
				options: {
		        	process: true,
			        data: {
						title: 'DEV PWA',
						message: 'Development',
						base: '"/pwa/"'
			        }
				},
				files: {
			        './dist/app/index.html': ['./app/index.html']
				}    
		    },
		    production: {
				options: {
		        	process: true,
		        	data: {
						title: 'PWA',
						title: 'PWA',
						message: 'Production',
						base: '"/"'
					}
				},
				files: {
			        './dist/app/index.html': ['./app/index.html']
				}    
			},
		},

		compress: {
			main: {
			    options: {
			      mode: 'zip',
			      archive: './dist/app.zip'
			    },
			    files: [{
			      expand: true,
			      src: ['./dist/app/**'],
			      //dest: './dist/'
			    }]
			}
		},

		watch:{			
			files:['./app/','./app/*.*','./app/**/*.*'],
			//files:['./dist/app/','./dist/app/*.*'],
  		},
  		
  		express: {
  			all: {
  				options:{
					port:4200,
					hostname:'localhost',
  					bases:['./app/','./app/**/*.*'],
  					livereload: true
  				}
			},
			dev: {
  				options:{
					port:4200,
					hostname:'localhost',
  					bases:['./dist/app/','./dist/app/**/*.*'],
				    livereload: true
  				}
			},
			prod: {
  				options:{
					port:4200,
					hostname:'localhost',
  					bases:['./dist/app/','./dist/app/**/*.*'],
				    livereload: true
  				}
  			}
		},

  		open: {
		    all: {
		        path: 'http://localhost:4200/'
		    }
		}
	});
 
 	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-copy');	
	grunt.loadNpmTasks('grunt-ng-constant');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-open');	
	grunt.loadNpmTasks('grunt-service-worker');

	grunt.registerTask('build:prod',[
		'ngconstant:production',
		//'express:prod',
		'clean',
		'bump',
		'copy:minify',
		'copy:main',
		'processhtml:production',
		'minify',
		'compress'
		//'open',
		//'watch'
	]);
	
	grunt.registerTask('build:dev',[
		'ngconstant:development',
		//'express:dev',
		'clean',
		'copy:minify',
		'processhtml:development',
		'minify',
		'compress',
		//'open',
		//'watch'
	]);
	
	grunt.registerTask('prod',[
		'ngconstant:production',
		'express:prod',
		'clean',
		'copy:main',
		'processhtml:production',
		//'minify',
		//'open',
		//'watch'
	]);
	
	grunt.registerTask('dev',[
		'ngconstant:development',
		//'express:dev',
		'clean',
		'copy:main',
		'processhtml:development',
		//'minify',
		'open',
		'watch'
	]);

	grunt.registerTask('local',[
		'ngconstant:local',
		'bump',
		'express:all',
		'open',
		'watch'
	]);
	
	grunt.registerTask('minify',['cssmin','uglify']);

	grunt.registerTask('default',['local']);

};