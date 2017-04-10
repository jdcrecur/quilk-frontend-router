(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var quilkFrontendRouter = function () {

    /**
     * Loops over a routesObject provided calling any classes that match the current browser url
     */
    function quilkFrontendRouter(routesObject) {
        var _this = this;

        _classCallCheck(this, quilkFrontendRouter);

        var path = this.trimEnd(String(window.location.pathname), '/');
        routesObject.forEach(function (classes, key) {
            if (_this.path_match(path, key)) {
                classes.forEach(classes, function (classToStart) {
                    _this.start_instance(classToStart);
                });
            }
        });
    }

    /**
     * Calls new on a class
     *
     * @param init
     */


    _createClass(quilkFrontendRouter, [{
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
            var _this2 = this;

            //handle params
            if (key.indexOf('(') === -1) return this.compare(path, key);

            //handle trailing wildcards
            if (key.slice(-1) === '*') {
                key.slice(-1);
                key = str.substring(0, str.length - 1);
            }

            var match = false;
            this.key_to_paths(key).forEach(function (k_path) {
                if (_this2.compare(path, k_path)) match = true;
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
            var _this3 = this;

            var key_parts = key.split('(');
            var ret = [this.trimEnd(key_parts[0], '/')];
            //walk over each provided segment in the () | separated params, ensuring the last ) char is stripped
            key_parts[1].slice(0, -1).split('|').forEach(function (seg) {
                ret.push(_this3.trimEnd(key_parts[0] + seg, '/'));
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

    return quilkFrontendRouter;
}();

exports.default = quilkFrontendRouter;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2hvbWUvam9obi8ubnZtL3ZlcnNpb25zL25vZGUvdjYuNS4wL2xpYi9ub2RlX21vZHVsZXMvcXVpbGsvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9xdWlsay1mcm9udGVuZC1yb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0lDQU0sbUI7O0FBRUY7OztBQUdBLGlDQUFhLFlBQWIsRUFBNEI7QUFBQTs7QUFBQTs7QUFDeEIsWUFBSSxPQUFPLEtBQUssT0FBTCxDQUFjLE9BQVEsT0FBTyxRQUFQLENBQWdCLFFBQXhCLENBQWQsRUFBa0QsR0FBbEQsQ0FBWDtBQUNBLHFCQUFhLE9BQWIsQ0FBc0IsVUFBRSxPQUFGLEVBQVcsR0FBWCxFQUFtQjtBQUNyQyxnQkFBSSxNQUFLLFVBQUwsQ0FBaUIsSUFBakIsRUFBdUIsR0FBdkIsQ0FBSixFQUFtQztBQUMvQix3QkFBUSxPQUFSLENBQWlCLE9BQWpCLEVBQTBCLFVBQUUsWUFBRixFQUFvQjtBQUMxQywwQkFBSyxjQUFMLENBQXFCLFlBQXJCO0FBQ0gsaUJBRkQ7QUFHSDtBQUNKLFNBTkQ7QUFPSDs7QUFFRDs7Ozs7Ozs7O3VDQUtpQixJLEVBQU87QUFDcEIsZ0JBQUk7QUFDQSxvQkFBSSxJQUFKO0FBQ0gsYUFGRCxDQUVFLE9BQU8sQ0FBUCxFQUFVO0FBQ1Isd0JBQVEsS0FBUixDQUFlLENBQWY7QUFDSDtBQUNKOztBQUVEOzs7Ozs7Ozs7O21DQU9hLEksRUFBTSxHLEVBQU07QUFBQTs7QUFDckI7QUFDQSxnQkFBRyxJQUFJLE9BQUosQ0FBYSxHQUFiLE1BQXVCLENBQUMsQ0FBM0IsRUFBOEIsT0FBTyxLQUFLLE9BQUwsQ0FBYSxJQUFiLEVBQW1CLEdBQW5CLENBQVA7O0FBRTlCO0FBQ0EsZ0JBQUksSUFBSSxLQUFKLENBQVUsQ0FBQyxDQUFYLE1BQWtCLEdBQXRCLEVBQTRCO0FBQ3hCLG9CQUFJLEtBQUosQ0FBVSxDQUFDLENBQVg7QUFDQSxzQkFBTSxJQUFJLFNBQUosQ0FBYyxDQUFkLEVBQWlCLElBQUksTUFBSixHQUFhLENBQTlCLENBQU47QUFDSDs7QUFFRCxnQkFBSSxRQUFRLEtBQVo7QUFDQSxpQkFBSyxZQUFMLENBQW1CLEdBQW5CLEVBQXlCLE9BQXpCLENBQWtDLFVBQUUsTUFBRixFQUFjO0FBQzVDLG9CQUFJLE9BQUssT0FBTCxDQUFhLElBQWIsRUFBbUIsTUFBbkIsQ0FBSixFQUFpQyxRQUFRLElBQVI7QUFDcEMsYUFGRDs7QUFJQSxtQkFBTyxLQUFQO0FBQ0g7O0FBRUQ7Ozs7Ozs7OztxQ0FNZSxHLEVBQU07QUFBQTs7QUFDakIsZ0JBQUksWUFBWSxJQUFJLEtBQUosQ0FBVyxHQUFYLENBQWhCO0FBQ0EsZ0JBQUksTUFBTSxDQUFFLEtBQUssT0FBTCxDQUFjLFVBQVcsQ0FBWCxDQUFkLEVBQThCLEdBQTlCLENBQUYsQ0FBVjtBQUNBO0FBQ0Esc0JBQVcsQ0FBWCxFQUFlLEtBQWYsQ0FBc0IsQ0FBdEIsRUFBeUIsQ0FBQyxDQUExQixFQUE4QixLQUE5QixDQUFxQyxHQUFyQyxFQUEyQyxPQUEzQyxDQUFvRCxVQUFFLEdBQUYsRUFBVztBQUMzRCxvQkFBSSxJQUFKLENBQVUsT0FBSyxPQUFMLENBQWMsVUFBVyxDQUFYLElBQWlCLEdBQS9CLEVBQW9DLEdBQXBDLENBQVY7QUFDSCxhQUZEO0FBR0EsbUJBQU8sR0FBUDtBQUNIOztBQUVEOzs7Ozs7Ozs7Z0NBTVUsSSxFQUFNLEcsRUFBSzs7QUFFakIsa0JBQU0sS0FBSyxPQUFMLENBQWMsR0FBZCxFQUFtQixHQUFuQixDQUFOO0FBQ0EsZ0JBQUksSUFBSSxPQUFKLENBQVksR0FBWixNQUFxQixDQUFDLENBQTFCLEVBQThCLE9BQVEsU0FBUyxHQUFqQjs7QUFFOUI7QUFDQSxrQkFBTSxLQUFLLE9BQUwsQ0FBYSxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWUsQ0FBZixDQUFiLEVBQWdDLEdBQWhDLENBQU47O0FBRUE7QUFDQSxnQkFBSSxRQUFRLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBWjtBQUNBLGtCQUFNLEdBQU47O0FBRUEsbUJBQU8sS0FBSyxPQUFMLENBQWEsTUFBTSxJQUFOLENBQVcsR0FBWCxDQUFiLEVBQThCLEdBQTlCLENBQVA7O0FBRUEsbUJBQVEsU0FBUyxHQUFqQjtBQUNIOztBQUVEOzs7Ozs7Ozs7O2dDQU9VLEcsRUFBSyxRLEVBQVc7QUFDdEIsZ0JBQUksSUFBSSxTQUFKLENBQWUsSUFBSSxNQUFKLEdBQWEsU0FBUyxNQUFyQyxFQUE2QyxJQUFJLE1BQWpELE1BQThELFFBQWxFLEVBQ0ksT0FBTyxJQUFJLFNBQUosQ0FBZSxDQUFmLEVBQWtCLElBQUksTUFBSixHQUFhLFNBQVMsTUFBeEMsQ0FBUDtBQUNKLG1CQUFPLEdBQVA7QUFDSDs7Ozs7O2tCQUdVLG1CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNsYXNzIHF1aWxrRnJvbnRlbmRSb3V0ZXIge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9vcHMgb3ZlciBhIHJvdXRlc09iamVjdCBwcm92aWRlZCBjYWxsaW5nIGFueSBjbGFzc2VzIHRoYXQgbWF0Y2ggdGhlIGN1cnJlbnQgYnJvd3NlciB1cmxcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoIHJvdXRlc09iamVjdCApIHtcclxuICAgICAgICBsZXQgcGF0aCA9IHRoaXMudHJpbUVuZCggU3RyaW5nKCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKSwgJy8nICk7XHJcbiAgICAgICAgcm91dGVzT2JqZWN0LmZvckVhY2goICggY2xhc3Nlcywga2V5ICkgPT57XHJcbiAgICAgICAgICAgIGlmKCB0aGlzLnBhdGhfbWF0Y2goIHBhdGgsIGtleSApICkge1xyXG4gICAgICAgICAgICAgICAgY2xhc3Nlcy5mb3JFYWNoKCBjbGFzc2VzLCAoIGNsYXNzVG9TdGFydCApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0X2luc3RhbmNlKCBjbGFzc1RvU3RhcnQgKTtcclxuICAgICAgICAgICAgICAgIH0gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENhbGxzIG5ldyBvbiBhIGNsYXNzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGluaXRcclxuICAgICAqL1xyXG4gICAgc3RhcnRfaW5zdGFuY2UgKCBpbml0ICkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIG5ldyBpbml0O1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvciggZSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgcHJvdmlkZWQgcGF0aCBtYXRjaGVzIHRoZSBrZXlcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aFxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHBhdGhfbWF0Y2ggKCBwYXRoLCBrZXkgKSB7XHJcbiAgICAgICAgLy9oYW5kbGUgcGFyYW1zXHJcbiAgICAgICAgaWYoa2V5LmluZGV4T2YoICcoJyApID09PSAtMSkgcmV0dXJuIHRoaXMuY29tcGFyZShwYXRoLCBrZXkpO1xyXG5cclxuICAgICAgICAvL2hhbmRsZSB0cmFpbGluZyB3aWxkY2FyZHNcclxuICAgICAgICBpZigga2V5LnNsaWNlKC0xKSA9PT0gJyonICkge1xyXG4gICAgICAgICAgICBrZXkuc2xpY2UoLTEpO1xyXG4gICAgICAgICAgICBrZXkgPSBzdHIuc3Vic3RyaW5nKDAsIHN0ci5sZW5ndGggLSAxKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMua2V5X3RvX3BhdGhzKCBrZXkgKS5mb3JFYWNoKCAoIGtfcGF0aCApID0+IHtcclxuICAgICAgICAgICAgaWYoIHRoaXMuY29tcGFyZShwYXRoLCBrX3BhdGgpICkgbWF0Y2ggPSB0cnVlO1xyXG4gICAgICAgIH0gKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGFrZXMgYSBrZXkgZnJvbSB0aGUgY29uc3RhbnRzIGFuZCByZXR1cm5zIGEgbnVtZXJpYyBhcnJheSBvZiBhbGwgcG9zc2libGUgcGF0aHNcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ga2V5XHJcbiAgICAgKiBAcmV0dXJucyB7WypdfVxyXG4gICAgICovXHJcbiAgICBrZXlfdG9fcGF0aHMgKCBrZXkgKSB7XHJcbiAgICAgICAgbGV0IGtleV9wYXJ0cyA9IGtleS5zcGxpdCggJygnICk7XHJcbiAgICAgICAgbGV0IHJldCA9IFsgdGhpcy50cmltRW5kKCBrZXlfcGFydHNbIDAgXSwgJy8nICkgXTtcclxuICAgICAgICAvL3dhbGsgb3ZlciBlYWNoIHByb3ZpZGVkIHNlZ21lbnQgaW4gdGhlICgpIHwgc2VwYXJhdGVkIHBhcmFtcywgZW5zdXJpbmcgdGhlIGxhc3QgKSBjaGFyIGlzIHN0cmlwcGVkXHJcbiAgICAgICAga2V5X3BhcnRzWyAxIF0uc2xpY2UoIDAsIC0xICkuc3BsaXQoICd8JyApLmZvckVhY2goICggc2VnICkgPT4ge1xyXG4gICAgICAgICAgICByZXQucHVzaCggdGhpcy50cmltRW5kKCBrZXlfcGFydHNbIDAgXSArIHNlZywgJy8nICkgKTtcclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbXBhcmVzIGEgZ2l2ZW4ga2V5IGFuZCBwYXRoLiBJZiB0aGUga2F5IGNvbnRhaW5zIGEgOiBzZXBhcmF0ZWQgcGFyYW0gdGhpcyBpcyByZW1vdmVkIGZpcnN0IGZyb20gdGhlIGtleSBhbmQgcGF0aCBiZWZvcmUgY29tcGFyaXNvbi5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gcGF0aFxyXG4gICAgICogQHBhcmFtIGtleVxyXG4gICAgICovXHJcbiAgICBjb21wYXJlICggcGF0aCwga2V5ICl7XHJcblxyXG4gICAgICAgIGtleSA9IHRoaXMudHJpbUVuZCgga2V5LCAnLycgKTtcclxuICAgICAgICBpZigga2V5LmluZGV4T2YoJzonKSA9PT0gLTEgKSByZXR1cm4gKHBhdGggPT09IGtleSk7XHJcblxyXG4gICAgICAgIC8vd2UgaGF2ZSBmb3VuZCBhIGtleSB3aXRoIGEgcGFyYW0sIHN0cmlwIHBhcmFtIGZyb20gcGF0aCBhbmQga2V5LCB0aGVuIHJlLWNvbXBhcmVkXHJcbiAgICAgICAga2V5ID0gdGhpcy50cmltRW5kKGtleS5zcGxpdCgnOicpWzBdLCAnLycpO1xyXG5cclxuICAgICAgICAvL3N0cmlwIHRoZSB0cmlhbGluZyB1cmwgc2VnbWVudFxyXG4gICAgICAgIGxldCBwYXRocyA9IHBhdGguc3BsaXQoJy8nKTtcclxuICAgICAgICBwYXRocy5wb3AoKTtcclxuXHJcbiAgICAgICAgcGF0aCA9IHRoaXMudHJpbUVuZChwYXRocy5qb2luKCcvJyksICcvJyk7XHJcblxyXG4gICAgICAgIHJldHVybiAocGF0aCA9PT0ga2V5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRyaW1zIHRoZSBlbmQgb2YgdGhlIHN0cmluZyBpZiBtYXRjaGVkIHRvIHRoZSBzdHIydHJpbS4gQ2xvbmUgb2YgdGhlIGxvZGFzaCB0cmltRW5kIGZ1bmN0aW9uXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHN0clxyXG4gICAgICogQHBhcmFtIHN0cjJUcmltXHJcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0cmltRW5kICggc3RyLCBzdHIyVHJpbSApIHtcclxuICAgICAgICBpZiggc3RyLnN1YnN0cmluZyggc3RyLmxlbmd0aCAtIHN0cjJUcmltLmxlbmd0aCwgc3RyLmxlbmd0aCApID09PSBzdHIyVHJpbSApXHJcbiAgICAgICAgICAgIHJldHVybiBzdHIuc3Vic3RyaW5nKCAwLCBzdHIubGVuZ3RoIC0gc3RyMlRyaW0ubGVuZ3RoICk7XHJcbiAgICAgICAgcmV0dXJuIHN0cjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcXVpbGtGcm9udGVuZFJvdXRlcjsiXX0=
