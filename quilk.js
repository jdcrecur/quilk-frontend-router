module.exports = {
  modules : [
      {
          name: 'Vendor Files babelify',
          module: 'babelify',
          configure: {
              babelrc: '.babelrc'
          },
          extensions: ['.js'],
          debug: false,
          entries: "lib/quilk-frontend-router.js",
          target: '/dist/quilk-frontend-router.js'
      }
  ],

  "dont_watch": [
    "dist"
  ],

  "release_commands_or_modules": {
    "prod":{
      "post": [
          {
              name: "minify the app js",
              module: "node_minify",
              type:"uglifyjs",
              input: ["/dist/quilk-frontend-router.js"],
              target: "/dist/quilk-frontend-router.min.js"
          }
      ]
    }
  },

  "developers" : {
    "default" : {
      "platform" : "linux",
      "notifier" : {
        "on"   : false
      }
    }
  }
};