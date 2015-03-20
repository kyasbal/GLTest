'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		typescript:{
			base:{
				src:['WebGLTest/glLib.ts'],
				dest:'final.js',
				options:{
					comments:true,
					target:'es5'
				}

			}
		}
	});
	grunt.loadNpmTasks('grunt-typescript');

	grunt.registerTask('type-compile',['typescript']);
};
