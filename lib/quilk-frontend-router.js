

export default class quilkFrontendRouter {

    /**
     * Loops over a routesObject provided calling any classes that match the current browser url
     */
    constructor( routesObject ) {
        let path = this.trimEnd( String( window.location.pathname ), '/' );
        routesObject.forEach( ( classes, key ) =>{
            if( this.path_match( path, key ) ) {
                classes.forEach( classes, ( classToStart ) => {
                    this.start_instance( classToStart );
                } );
            }
        } );
    }

    /**
     * Calls new on a class
     *
     * @param init
     */
    start_instance ( init ) {
        try {
            new init;
        } catch (e) {
            console.error( e );
        }
    }

    /**
     * Returns true if the provided path matches the key
     *
     * @param path
     * @param key
     * @returns {boolean}
     */
    path_match ( path, key ) {
        //handle params
        if(key.indexOf( '(' ) === -1) return this.compare(path, key);

        //handle trailing wildcards
        if( key.slice(-1) === '*' ) {
            key.slice(-1);
            key = str.substring(0, str.length - 1);
        }

        let match = false;
        this.key_to_paths( key ).forEach( ( k_path ) => {
            if( this.compare(path, k_path) ) match = true;
        } );

        return match;
    }

    /**
     * Takes a key from the constants and returns a numeric array of all possible paths
     *
     * @param key
     * @returns {[*]}
     */
    key_to_paths ( key ) {
        let key_parts = key.split( '(' );
        let ret = [ this.trimEnd( key_parts[ 0 ], '/' ) ];
        //walk over each provided segment in the () | separated params, ensuring the last ) char is stripped
        key_parts[ 1 ].slice( 0, -1 ).split( '|' ).forEach( ( seg ) => {
            ret.push( this.trimEnd( key_parts[ 0 ] + seg, '/' ) );
        } );
        return ret;
    }

    /**
     * Compares a given key and path. If the kay contains a : separated param this is removed first from the key and path before comparison.
     *
     * @param path
     * @param key
     */
    compare ( path, key ){

        key = this.trimEnd( key, '/' );
        if( key.indexOf(':') === -1 ) return (path === key);

        //we have found a key with a param, strip param from path and key, then re-compared
        key = this.trimEnd(key.split(':')[0], '/');

        //strip the trialing url segment
        let paths = path.split('/');
        paths.pop();

        path = this.trimEnd(paths.join('/'), '/');

        return (path === key);
    }

    /**
     * Trims the end of the string if matched to the str2trim. Clone of the lodash trimEnd function
     *
     * @param str
     * @param str2Trim
     * @returns {string}
     */
    trimEnd ( str, str2Trim ) {
        if( str.substring( str.length - str2Trim.length, str.length ) === str2Trim )
            return str.substring( 0, str.length - str2Trim.length );
        return str;
    }
}