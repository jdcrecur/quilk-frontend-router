module.exports = {

    /* The modules to run when quilk is called. */
    modules : [

        /* Compose the vendor js file. */
        {   name: 'Vendor Files babelify',
            module: 'babelify_vendor',
            npm_modules: "package.json",
            configure: {
                babelrc: '.babelrc'
            },
            target: '/build/js/vendor.js'  },

        /* Compose the app js file */
        {   name: 'App JS Files babelify',
            module: 'babelify_app',
            entries: "/js/app.js",
            npm_modules: "package.json",
            configure: {
                babelrc: '.babelrc'
            },
            target: '/build/js/app.js'  },

        /* Compose the app.css file with the sass find module */
        {   name: "App CSS (SASS find)",
            module: "sass_find",
            outputStyle: "expanded",
            sourceComments: true,
            include_first: [
                "/sass/core/_core_loader.scss"
            ],
            ignorePaths : [
                "/sass/core/"
            ],
            find_in_path: "/sass/",
            target: "/build/css/app.css"  }

    ],

    /* Tell quilk to not rebuild when a change is heard in the build folder */
    dont_watch: [
        "/build/"
    ],

    /* Some release commands to compress it all for production */
    release_commands_or_modules: {
        prod:{
            post: [ {
                name: "minify the app js",
                module: "node_minify",
                type: "uglifyjs",
                input:  "/build/js/app.js",
                target: "/build/js/app.js"
            }, {
                name: "minify the css",
                module: "node_minify",
                type: "sqwish",
                input:[ "/build/css/app.css" ],
                target: "/build/css/app.css"
            }]
        }
    },

    /* A default developer */
    developers : {
        default : {
            platform : "linux",
            notifier : {
                "on_for_level" : 9,
                "style": "NotifySend", /* See the quilk docs for the correct notifier for your O.S. */
                "time" : 5000
            }
        }
    }
};