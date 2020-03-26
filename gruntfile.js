module.exports = function (grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		cssmin:{
			target:{
				files:[{
					expand: true,
					cwd:"assets/css",
					src: ['*.css', '!*.min.css'],
					dest: "assets/css",
					ext: '.min.css'
				}]
			}
		},
		uglify:{
			options:{
				manage: false
			},
			target:{
				files:[{
					expand:true,
					cwd: 'assets/js',
					src: ['*.js', '!*.min.js'],
					dest: 'assets/js',
					ext: '.min.js'
				}]
			}
		}
	});
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	
	grunt.registerTask("default",['uglify','cssmin']);
}