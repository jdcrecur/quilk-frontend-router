(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.QuilkFrontendRouter = factory());
}(this, (function () {

var QuilkFrontendRouter = function QuilkFrontendRouter (routesObject) {
  var this$1 = this;

  var path = this.trimEnd(String(window.location.pathname), '/');
  for (var key in routesObject) {

    if (Array.isArray(routesObject[key])) {
      this$1.run_path_matchers(routesObject, path, key);
    } else {
      if (key === 'path') {
        for (var subkey in routesObject[key]) {
          this$1.run_path_matchers(routesObject[key], path, subkey);
        }
      } else {
        // check we have jquery else alert an error
        if (typeof window.$ === 'undefined') {
          alert('To use attribute selection with the QuilkFrontendRouter please ensure you load in jquery to the window object.');
        } else {
          this$1.run_attribute_matchers(routesObject[key]);
        }
      }
    }
  }
};

/**
 * Initialises classes based on the attributes given
 *
 * @param attributesObject
 */
QuilkFrontendRouter.prototype.run_attribute_matchers = function run_attribute_matchers (attributesObject) {
    var this$1 = this;

  var $ = window.$;
  attributesObject.forEach(function (values, attr) {
    values.forEach(function (constructors, value) {
      if (value === '*') {
        this$1.run_attribute_constructors(constructors);
      } else {
        var valueArr = value.split(' ');

        // run against classes
        switch (attr) {
          case 'class' : {
            var selector = valueArr.join(', .');
            if ($(selector).length > 0) { this$1.run_attribute_constructors(constructors); }
          }
            break
          case 'id' : {
            var selector$1 = valueArr.join(', #');
            if ($(selector$1).length > 0) { this$1.run_attribute_constructors(constructors); }
          }
            break;
          default : {
            var selector$2 = '';
            valueArr.forEach(function (attrVal){
              selector$2 += '*['+attr+'='+attrVal+'], ';
            });
            selector$2 = selector$2.slice(0, -2);

            if ($(selector$2).length > 0) {
              this$1.run_attribute_constructors(constructors);
            }
          }
        }
      }
    });
  });
};

/**
 * Pass an numeric array of class to initialize
 *
 * @param constructorsArr
 */
QuilkFrontendRouter.prototype.run_attribute_constructors = function run_attribute_constructors (constructorsArr) {
    var this$1 = this;

  constructorsArr.forEach(function (construct, i) {
    this$1.start_instance(construct);
  });
};

/**
 * Runs checks against the key and the path
 *
 * @param routesObject
 * @param path
 * @param key
 */
QuilkFrontendRouter.prototype.run_path_matchers = function run_path_matchers (routesObject, path, key) {
    var this$1 = this;

  if (this.path_match(path, key)) {
    for (var i = 0; i < routesObject[key].length; ++i) {
      this$1.start_instance(routesObject[key][i]);
    }
  }
};

/**
 * Calls new on a class
 *
 * @param init
 */
QuilkFrontendRouter.prototype.start_instance = function start_instance (init) {
  try {
    new init;
  } catch (e) {
    console.error(e);
  }
};

/**
 * Returns true if the provided path matches the key
 *
 * @param path
 * @param key
 * @returns {boolean}
 */
QuilkFrontendRouter.prototype.path_match = function path_match (path, key) {
    var this$1 = this;


  //handle trailing wildcards
  if (key.slice(-1) === '*') {

    key = key.substring(0, key.length - 1);

    if (key === '/' && path !== '/' && path.split('/').length === 2) { return true }

    if (this.compare(path, key)) { return true }
    else { return ( path.indexOf(key) === 0 ) }
  }

  //handle std route
  if (key.indexOf('(') === -1) { return this.compare(path, key) }

  //handle key with params eg ()
  var match = false;
  this.key_to_paths(key).forEach(function (k_path) {
    if (this$1.compare(path, k_path)) { match = true; }
  });

  return match
};

/**
 * Takes a key from the constants and returns a numeric array of all possible paths
 *
 * @param key
 * @returns {[*]}
 */
QuilkFrontendRouter.prototype.key_to_paths = function key_to_paths (key) {
    var this$1 = this;

  var key_parts = key.split('(');
  var ret = [this.trimEnd(key_parts[0], '/')];
  //walk over each provided segment in the () | separated params, ensuring the last ) char is stripped
  key_parts[1].slice(0, -1).split('|').forEach(function (seg) {
    ret.push(this$1.trimEnd(key_parts[0] + seg, '/'));
  });
  return ret
};

/**
 * Compares a given key and path. If the kay contains a : separated param this is removed first from the key and path before comparison.
 *
 * @param path
 * @param key
 */
QuilkFrontendRouter.prototype.compare = function compare (path, key) {

  key = this.trimEnd(key, '/');
  if (key.indexOf(':') === -1) { return (path === key) }

  //we have found a key with a param, strip param from path and key, then re-compared
  key = this.trimEnd(key.split(':')[0], '/');

  //strip the trialing url segment
  var paths = path.split('/');
  paths.pop();

  path = this.trimEnd(paths.join('/'), '/');

  return (path === key)
};

/**
 * Trims the end of the string if matched to the str2trim. Clone of the lodash trimEnd function
 *
 * @param str
 * @param str2Trim
 * @returns {string}
 */
QuilkFrontendRouter.prototype.trimEnd = function trimEnd (str, str2Trim) {
  if (str.substring(str.length - str2Trim.length, str.length) === str2Trim)
    { return str.substring(0, str.length - str2Trim.length) }
  return str
};

return QuilkFrontendRouter;

})));
//# sourceMappingURL=quilk-frontend-router.js.map
