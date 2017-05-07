# quilk-frontend-router 

A simple router for your custom js apps. A simple, small and fast router with a tiny production weight of 2kb, also with zero dependencies.


## How to use it

This is your front door in... include the routing module and pass in your routes.

```
import $ from 'jquery';
import QuilkFrontendRouter from 'quilk-frontend-router';
import routes from './routes';
$(document).ready( () => { new QuilkFrontendRouter( routes ) } );
```

In this example the routes could look like:
```
// Import your controllers:
import indexController from './controllers/indexController';
import contactUsController from './controllers/contactUsController';
import sliderController from './controllers/sliderController';
import blogController from './controllers/blogController';

/**
 * Example straight key:
 * '/this-route-only/'
 * 
 * The above will only match if the pathname is the same as the key, ie:
 * '/this-route-only'
 * '/this-route-only/'
 *
 *
 * Example key with params:
 * '/some-route/(controller-a|controller-b|controller-b/param_a)'
 *
 * The above will call the array of controller classes provided if the incoming url pathname is any of the following list, but nothing more:
 * '/some-route/'
 * '/some-route/controller-a'
 * '/some-route/controller-b'
 * '/some-route/controller-b/param_a'
 *
 * Exmaple wildcard key:
 * '/somepath/*'
 *
 * The above will call the array of controller classes provided if the incoming url pathname is any of the following list, but nothing more:
 * '/some-route/'
 * '/some-route/*' basically it matches everything after the key '/somepath'
 * 
 */
 
export default {
    '/':   [ indexController ],
    '/contactUsController/(thanks)':  [ contactUsController ],
    '/blog-posts/*':  [ blogController, sliderController ]
};
```

The controllers just require a construct and you're good to go. Here is what the indexController could look like. This would console log 'This is the index controller' when the url pathname was '/':
```
export default class indexController {

    constructor () {
        this.logIt();
    }
    
    logIt () {
        console.log( `This is the index controller` );
    }
}
```