import $ from 'jquery';

export default class httpService {

    constructor () {
        this.basePath = '';
    }

    http ( method, route, data ) {
        return new Promise( ( resolve, reject ) => {
            $.ajax({
                url: this.basePath + route,
                method: method,
                data: data || {},
                success: ( response ) => {
                    let err = false, returnContent;
                    try{
                        if( !response.success === false ) err = true;
                        if( response.payload ) returnContent = response.payload;
                        else returnContent = response;
                    } catch( e ) {
                        returnContent = response;
                    }
                    if( err ) reject( err );
                    else resolve( returnContent );
                }
            })
            .fail( ( response ) => {
                reject( response );
            } );

        } );
    }

    post ( route, data ) {
        return this.http( 'post', route, data );
    }

    get ( route, data ) {
        return this.http( 'get', route, data );
    }

    put ( route, data ) {
        return this.http( 'put', route, data );
    }

    del ( route ) {
        return this.http( 'delete', route );
    }
}