(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var QuilkFrontendRouter = function () {

    /**
     * Loops over a routesObject provided calling any classes that match the current browser url
     */
    function QuilkFrontendRouter(routesObject) {
        _classCallCheck(this, QuilkFrontendRouter);

        var path = this.trimEnd(String(window.location.pathname), '/');
        for (var key in routesObject) {
            if (this.path_match(path, key)) {
                for (var i = 0; i < routesObject[key].length; ++i) {
                    this.start_instance(routesObject[key][i]);
                }
            }
        }
    }

    /**
     * Calls new on a class
     *
     * @param init
     */


    _createClass(QuilkFrontendRouter, [{
        key: 'start_instance',
        value: function start_instance(init) {
            try {
                new init();
            } catch (e) {
                console.error(e);
            }
        }

        /**
         * Returns true if the provided path matches the key
         *
         * @param path
         * @param key
         * @returns {boolean}
         */

    }, {
        key: 'path_match',
        value: function path_match(path, key) {
            var _this = this;

            //handle trailing wildcards
            if (key.slice(-1) === '*') {

                key = key.substring(0, key.length - 1);

                if (key === '/' && path !== '/' && path.split('/').length === 2) return true;

                if (this.compare(path, key)) return true;else return path.indexOf(key) === 0;
            }

            //handle std route
            if (key.indexOf('(') === -1) return this.compare(path, key);

            //handle key with params eg ()
            var match = false;
            this.key_to_paths(key).forEach(function (k_path) {
                if (_this.compare(path, k_path)) match = true;
            });

            return match;
        }

        /**
         * Takes a key from the constants and returns a numeric array of all possible paths
         *
         * @param key
         * @returns {[*]}
         */

    }, {
        key: 'key_to_paths',
        value: function key_to_paths(key) {
            var _this2 = this;

            var key_parts = key.split('(');
            var ret = [this.trimEnd(key_parts[0], '/')];
            //walk over each provided segment in the () | separated params, ensuring the last ) char is stripped
            key_parts[1].slice(0, -1).split('|').forEach(function (seg) {
                ret.push(_this2.trimEnd(key_parts[0] + seg, '/'));
            });
            return ret;
        }

        /**
         * Compares a given key and path. If the kay contains a : separated param this is removed first from the key and path before comparison.
         *
         * @param path
         * @param key
         */

    }, {
        key: 'compare',
        value: function compare(path, key) {

            key = this.trimEnd(key, '/');
            if (key.indexOf(':') === -1) return path === key;

            //we have found a key with a param, strip param from path and key, then re-compared
            key = this.trimEnd(key.split(':')[0], '/');

            //strip the trialing url segment
            var paths = path.split('/');
            paths.pop();

            path = this.trimEnd(paths.join('/'), '/');

            return path === key;
        }

        /**
         * Trims the end of the string if matched to the str2trim. Clone of the lodash trimEnd function
         *
         * @param str
         * @param str2Trim
         * @returns {string}
         */

    }, {
        key: 'trimEnd',
        value: function trimEnd(str, str2Trim) {
            if (str.substring(str.length - str2Trim.length, str.length) === str2Trim) return str.substring(0, str.length - str2Trim.length);
            return str;
        }
    }]);

    return QuilkFrontendRouter;
}();

exports.default = QuilkFrontendRouter;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2hvbWUvam9obi8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNS4wL2xpYi9ub2RlX21vZHVsZXMvcXVpbGsvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9xdWlsay1mcm9udGVuZC1yb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQXFCLG1COztBQUVqQjs7O0FBR0EsaUNBQWEsWUFBYixFQUE0QjtBQUFBOztBQUN4QixZQUFJLE9BQU8sS0FBSyxPQUFMLENBQWMsT0FBUSxPQUFPLFFBQVAsQ0FBZ0IsUUFBeEIsQ0FBZCxFQUFrRCxHQUFsRCxDQUFYO0FBQ0EsYUFBSyxJQUFJLEdBQVQsSUFBZ0IsWUFBaEIsRUFBOEI7QUFDMUIsZ0JBQUksS0FBSyxVQUFMLENBQWlCLElBQWpCLEVBQXVCLEdBQXZCLENBQUosRUFBbUM7QUFDL0IscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBaUIsSUFBSSxhQUFhLEdBQWIsRUFBa0IsTUFBdkMsRUFBZ0QsRUFBRSxDQUFsRCxFQUFxRDtBQUNqRCx5QkFBSyxjQUFMLENBQXFCLGFBQWEsR0FBYixFQUFrQixDQUFsQixDQUFyQjtBQUNIO0FBQ0o7QUFDSjtBQUNKOztBQUVEOzs7Ozs7Ozs7dUNBS2lCLEksRUFBTztBQUNwQixnQkFBSTtBQUNBLG9CQUFJLElBQUo7QUFDSCxhQUZELENBRUUsT0FBTyxDQUFQLEVBQVU7QUFDUix3QkFBUSxLQUFSLENBQWUsQ0FBZjtBQUNIO0FBQ0o7O0FBRUQ7Ozs7Ozs7Ozs7bUNBT2EsSSxFQUFNLEcsRUFBTTtBQUFBOztBQUVyQjtBQUNBLGdCQUFJLElBQUksS0FBSixDQUFVLENBQUMsQ0FBWCxNQUFrQixHQUF0QixFQUE0Qjs7QUFFeEIsc0JBQU0sSUFBSSxTQUFKLENBQWMsQ0FBZCxFQUFpQixJQUFJLE1BQUosR0FBYSxDQUE5QixDQUFOOztBQUVBLG9CQUFJLFFBQVEsR0FBUixJQUFlLFNBQVMsR0FBeEIsSUFBK0IsS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixNQUFoQixLQUEyQixDQUE5RCxFQUFpRSxPQUFPLElBQVA7O0FBRWpFLG9CQUFJLEtBQUssT0FBTCxDQUFhLElBQWIsRUFBbUIsR0FBbkIsQ0FBSixFQUE4QixPQUFPLElBQVAsQ0FBOUIsS0FDSyxPQUFTLEtBQUssT0FBTCxDQUFjLEdBQWQsTUFBd0IsQ0FBakM7QUFDUjs7QUFFRDtBQUNBLGdCQUFHLElBQUksT0FBSixDQUFhLEdBQWIsTUFBdUIsQ0FBQyxDQUEzQixFQUE4QixPQUFPLEtBQUssT0FBTCxDQUFhLElBQWIsRUFBbUIsR0FBbkIsQ0FBUDs7QUFFOUI7QUFDQSxnQkFBSSxRQUFRLEtBQVo7QUFDQSxpQkFBSyxZQUFMLENBQW1CLEdBQW5CLEVBQXlCLE9BQXpCLENBQWtDLFVBQUUsTUFBRixFQUFjO0FBQzVDLG9CQUFJLE1BQUssT0FBTCxDQUFhLElBQWIsRUFBbUIsTUFBbkIsQ0FBSixFQUFpQyxRQUFRLElBQVI7QUFDcEMsYUFGRDs7QUFJQSxtQkFBTyxLQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztxQ0FNZSxHLEVBQU07QUFBQTs7QUFDakIsZ0JBQUksWUFBWSxJQUFJLEtBQUosQ0FBVyxHQUFYLENBQWhCO0FBQ0EsZ0JBQUksTUFBTSxDQUFFLEtBQUssT0FBTCxDQUFjLFVBQVcsQ0FBWCxDQUFkLEVBQThCLEdBQTlCLENBQUYsQ0FBVjtBQUNBO0FBQ0Esc0JBQVcsQ0FBWCxFQUFlLEtBQWYsQ0FBc0IsQ0FBdEIsRUFBeUIsQ0FBQyxDQUExQixFQUE4QixLQUE5QixDQUFxQyxHQUFyQyxFQUEyQyxPQUEzQyxDQUFvRCxVQUFFLEdBQUYsRUFBVztBQUMzRCxvQkFBSSxJQUFKLENBQVUsT0FBSyxPQUFMLENBQWMsVUFBVyxDQUFYLElBQWlCLEdBQS9CLEVBQW9DLEdBQXBDLENBQVY7QUFDSCxhQUZEO0FBR0EsbUJBQU8sR0FBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7Z0NBTVUsSSxFQUFNLEcsRUFBSzs7QUFFakIsa0JBQU0sS0FBSyxPQUFMLENBQWMsR0FBZCxFQUFtQixHQUFuQixDQUFOO0FBQ0EsZ0JBQUksSUFBSSxPQUFKLENBQVksR0FBWixNQUFxQixDQUFDLENBQTFCLEVBQThCLE9BQVEsU0FBUyxHQUFqQjs7QUFFOUI7QUFDQSxrQkFBTSxLQUFLLE9BQUwsQ0FBYSxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixDQUFiLEVBQWdDLEdBQWhDLENBQU47O0FBRUE7QUFDQSxnQkFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBWjtBQUNBLGtCQUFNLEdBQU47O0FBRUEsbUJBQU8sS0FBSyxPQUFMLENBQWEsTUFBTSxJQUFOLENBQVcsR0FBWCxDQUFiLEVBQThCLEdBQTlCLENBQVA7O0FBRUEsbUJBQVEsU0FBUyxHQUFqQjtBQUNIOztBQUVEOzs7Ozs7Ozs7O2dDQU9VLEcsRUFBSyxRLEVBQVc7QUFDdEIsZ0JBQUksSUFBSSxTQUFKLENBQWUsSUFBSSxNQUFKLEdBQWEsU0FBUyxNQUFyQyxFQUE2QyxJQUFJLE1BQWpELE1BQThELFFBQWxFLEVBQ0ksT0FBTyxJQUFJLFNBQUosQ0FBZSxDQUFmLEVBQWtCLElBQUksTUFBSixHQUFhLFNBQVMsTUFBeEMsQ0FBUDtBQUNKLG1CQUFPLEdBQVA7QUFDSDs7Ozs7O2tCQS9HZ0IsbUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVpbGtGcm9udGVuZFJvdXRlciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBMb29wcyBvdmVyIGEgcm91dGVzT2JqZWN0IHByb3ZpZGVkIGNhbGxpbmcgYW55IGNsYXNzZXMgdGhhdCBtYXRjaCB0aGUgY3VycmVudCBicm93c2VyIHVybFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvciggcm91dGVzT2JqZWN0ICkge1xyXG4gICAgICAgIGxldCBwYXRoID0gdGhpcy50cmltRW5kKCBTdHJpbmcoIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSApLCAnLycgKTtcclxuICAgICAgICBmb3IoIGxldCBrZXkgaW4gcm91dGVzT2JqZWN0ICl7XHJcbiAgICAgICAgICAgIGlmKCB0aGlzLnBhdGhfbWF0Y2goIHBhdGgsIGtleSApICkge1xyXG4gICAgICAgICAgICAgICAgZm9yKCBsZXQgaSA9IDAgOyBpIDwgcm91dGVzT2JqZWN0W2tleV0ubGVuZ3RoIDsgKytpICl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydF9pbnN0YW5jZSggcm91dGVzT2JqZWN0W2tleV1baV0gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxzIG5ldyBvbiBhIGNsYXNzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGluaXRcclxuICAgICAqL1xyXG4gICAgc3RhcnRfaW5zdGFuY2UgKCBpbml0ICkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBpbml0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvciggZSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcHJvdmlkZWQgcGF0aCBtYXRjaGVzIHRoZSBrZXlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aFxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHBhdGhfbWF0Y2ggKCBwYXRoLCBrZXkgKSB7XHJcblxyXG4gICAgICAgIC8vaGFuZGxlIHRyYWlsaW5nIHdpbGRjYXJkc1xyXG4gICAgICAgIGlmKCBrZXkuc2xpY2UoLTEpID09PSAnKicgKSB7XHJcblxyXG4gICAgICAgICAgICBrZXkgPSBrZXkuc3Vic3RyaW5nKDAsIGtleS5sZW5ndGggLSAxKTtcclxuXHJcbiAgICAgICAgICAgIGlmKCBrZXkgPT09ICcvJyAmJiBwYXRoICE9PSAnLycgJiYgcGF0aC5zcGxpdCgnLycpLmxlbmd0aCA9PT0gMikgcmV0dXJuIHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiggdGhpcy5jb21wYXJlKHBhdGgsIGtleSkgKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgZWxzZSByZXR1cm4gKCBwYXRoLmluZGV4T2YoIGtleSApID09PSAwICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2hhbmRsZSBzdGQgcm91dGVcclxuICAgICAgICBpZihrZXkuaW5kZXhPZiggJygnICkgPT09IC0xKSByZXR1cm4gdGhpcy5jb21wYXJlKHBhdGgsIGtleSk7XHJcblxyXG4gICAgICAgIC8vaGFuZGxlIGtleSB3aXRoIHBhcmFtcyBlZyAoKVxyXG4gICAgICAgIGxldCBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMua2V5X3RvX3BhdGhzKCBrZXkgKS5mb3JFYWNoKCAoIGtfcGF0aCApID0+IHtcclxuICAgICAgICAgICAgaWYoIHRoaXMuY29tcGFyZShwYXRoLCBrX3BhdGgpICkgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgIH0gKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFrZXMgYSBrZXkgZnJvbSB0aGUgY29uc3RhbnRzIGFuZCByZXR1cm5zIGEgbnVtZXJpYyBhcnJheSBvZiBhbGwgcG9zc2libGUgcGF0aHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7WypdfVxyXG4gICAgICovXHJcbiAgICBrZXlfdG9fcGF0aHMgKCBrZXkgKSB7XHJcbiAgICAgICAgbGV0IGtleV9wYXJ0cyA9IGtleS5zcGxpdCggJygnICk7XHJcbiAgICAgICAgbGV0IHJldCA9IFsgdGhpcy50cmltRW5kKCBrZXlfcGFydHNbIDAgXSwgJy8nICkgXTtcclxuICAgICAgICAvL3dhbGsgb3ZlciBlYWNoIHByb3ZpZGVkIHNlZ21lbnQgaW4gdGhlICgpIHwgc2VwYXJhdGVkIHBhcmFtcywgZW5zdXJpbmcgdGhlIGxhc3QgKSBjaGFyIGlzIHN0cmlwcGVkXHJcbiAgICAgICAga2V5X3BhcnRzWyAxIF0uc2xpY2UoIDAsIC0xICkuc3BsaXQoICd8JyApLmZvckVhY2goICggc2VnICkgPT4ge1xyXG4gICAgICAgICAgICByZXQucHVzaCggdGhpcy50cmltRW5kKCBrZXlfcGFydHNbIDAgXSArIHNlZywgJy8nICkgKTtcclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbXBhcmVzIGEgZ2l2ZW4ga2V5IGFuZCBwYXRoLiBJZiB0aGUga2F5IGNvbnRhaW5zIGEgOiBzZXBhcmF0ZWQgcGFyYW0gdGhpcyBpcyByZW1vdmVkIGZpcnN0IGZyb20gdGhlIGtleSBhbmQgcGF0aCBiZWZvcmUgY29tcGFyaXNvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aFxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICovXHJcbiAgICBjb21wYXJlICggcGF0aCwga2V5ICl7XHJcblxyXG4gICAgICAgIGtleSA9IHRoaXMudHJpbUVuZCgga2V5LCAnLycgKTtcclxuICAgICAgICBpZigga2V5LmluZGV4T2YoJzonKSA9PT0gLTEgKSByZXR1cm4gKHBhdGggPT09IGtleSk7XHJcblxyXG4gICAgICAgIC8vd2UgaGF2ZSBmb3VuZCBhIGtleSB3aXRoIGEgcGFyYW0sIHN0cmlwIHBhcmFtIGZyb20gcGF0aCBhbmQga2V5LCB0aGVuIHJlLWNvbXBhcmVkXHJcbiAgICAgICAga2V5ID0gdGhpcy50cmltRW5kKGtleS5zcGxpdCgnOicpWzBdLCAnLycpO1xyXG5cclxuICAgICAgICAvL3N0cmlwIHRoZSB0cmlhbGluZyB1cmwgc2VnbWVudFxyXG4gICAgICAgIGxldCBwYXRocyA9IHBhdGguc3BsaXQoJy8nKTtcclxuICAgICAgICBwYXRocy5wb3AoKTtcclxuXHJcbiAgICAgICAgcGF0aCA9IHRoaXMudHJpbUVuZChwYXRocy5qb2luKCcvJyksICcvJyk7XHJcblxyXG4gICAgICAgIHJldHVybiAocGF0aCA9PT0ga2V5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaW1zIHRoZSBlbmQgb2YgdGhlIHN0cmluZyBpZiBtYXRjaGVkIHRvIHRoZSBzdHIydHJpbS4gQ2xvbmUgb2YgdGhlIGxvZGFzaCB0cmltRW5kIGZ1bmN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHN0clxyXG4gICAgICogQHBhcmFtIHN0cjJUcmltXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0cmltRW5kICggc3RyLCBzdHIyVHJpbSApIHtcclxuICAgICAgICBpZiggc3RyLnN1YnN0cmluZyggc3RyLmxlbmd0aCAtIHN0cjJUcmltLmxlbmd0aCwgc3RyLmxlbmd0aCApID09PSBzdHIyVHJpbSApXHJcbiAgICAgICAgICAgIHJldHVybiBzdHIuc3Vic3RyaW5nKCAwLCBzdHIubGVuZ3RoIC0gc3RyMlRyaW0ubGVuZ3RoICk7XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxufSJdfQ==
