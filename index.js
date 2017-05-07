var QuilkFrontendRouter = function QuilkFrontendRouter( routesObject ) {
    var this$1 = this;

    var path = this.trimEnd( String( window.location.pathname ), '/' );
    for( var key in routesObject ){
        if( this$1.path_match( path, key ) ) {
            for( var i = 0 ; i < routesObject[key].length ; ++i ){
                this$1.start_instance( routesObject[key][i] );
            }
        }
    }
};

/**
 * Calls new on a class
 *
 * @param init
 */
QuilkFrontendRouter.prototype.start_instance = function start_instance ( init ) {
    try {
        new init;
    } catch (e) {
        console.error( e );
    }
};

/**
 * Returns true if the provided path matches the key
 *
 * @param path
 * @param key
 * @returns {boolean}
 */
QuilkFrontendRouter.prototype.path_match = function path_match ( path, key ) {
        var this$1 = this;


    //handle trailing wildcards
    if( key.slice(-1) === '*' ) {

        key = key.substring(0, key.length - 1);

        if( key === '/' && path !== '/' && path.split('/').length === 2) { return true; }

        if( this.compare(path, key) ) { return true; }
        else { return ( path.indexOf( key ) === 0 ); }
    }

    //handle std route
    if(key.indexOf( '(' ) === -1) { return this.compare(path, key); }

    //handle key with params eg ()
    var match = false;
    this.key_to_paths( key ).forEach( function ( k_path ) {
        if( this$1.compare(path, k_path) ) { match = true; }
    } );

    return match;
};

/**
 * Takes a key from the constants and returns a numeric array of all possible paths
 *
 * @param key
 * @returns {[*]}
 */
QuilkFrontendRouter.prototype.key_to_paths = function key_to_paths ( key ) {
        var this$1 = this;

    var key_parts = key.split( '(' );
    var ret = [ this.trimEnd( key_parts[ 0 ], '/' ) ];
    //walk over each provided segment in the () | separated params, ensuring the last ) char is stripped
    key_parts[ 1 ].slice( 0, -1 ).split( '|' ).forEach( function ( seg ) {
        ret.push( this$1.trimEnd( key_parts[ 0 ] + seg, '/' ) );
    } );
    return ret;
};

/**
 * Compares a given key and path. If the kay contains a : separated param this is removed first from the key and path before comparison.
 *
 * @param path
 * @param key
 */
QuilkFrontendRouter.prototype.compare = function compare ( path, key ){

    key = this.trimEnd( key, '/' );
    if( key.indexOf(':') === -1 ) { return (path === key); }

    //we have found a key with a param, strip param from path and key, then re-compared
    key = this.trimEnd(key.split(':')[0], '/');

    //strip the trialing url segment
    var paths = path.split('/');
    paths.pop();

    path = this.trimEnd(paths.join('/'), '/');

    return (path === key);
};

/**
 * Trims the end of the string if matched to the str2trim. Clone of the lodash trimEnd function
 *
 * @param str
 * @param str2Trim
 * @returns {string}
 */
QuilkFrontendRouter.prototype.trimEnd = function trimEnd ( str, str2Trim ) {
    if( str.substring( str.length - str2Trim.length, str.length ) === str2Trim )
        { return str.substring( 0, str.length - str2Trim.length ); }
    return str;
};

module.exports = QuilkFrontendRouter;
//# sourceMappingURL=index.js.map
