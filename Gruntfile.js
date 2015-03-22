'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		typescript:{
			base:{
				src:['WebGLTest/glLib.ts'],
				dest:'WebGLTest/jThree.js',
				options:{
					comments:true,
					target:'es5'
				}

			}
		},watch:{
			scripts:{
				files:['WebGLTest/*.ts','WebGLTest/jThree/*.ts'],
				tasks:['compile'],
				options:{}
			}
		},
		qunit:{
			all:['http://localhost:8081/WebGLTest/Test.html']
		},
		connect:{
			local:{
				options:{
					keepalive:true,
					port:8081
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-typescript');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('travis',['typescript']);
	grunt.registerTask('compile',['typescript']);
	grunt.registerTask('server',['connect']);
	grunt.registerTask('default',['typescript','connect','qunit']);
};
