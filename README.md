# quilk-frontend-router 

A simple router for your custom js apps.


## How to use it

This is your front door in... include the routing module and pass in your routes/attributes.

```
import $ from 'jquery';
import QuilkFrontendRouter from 'quilk-frontend-router';
import routes from './routes';
$(document).ready( () => { new QuilkFrontendRouter( routes ) } );
```
You can also turn on verbose(ish) logging with
```
$(document).ready( () => { new QuilkFrontendRouter( routes, true ) } );
```


In this example your routes file could look like:
```
// Import your controllers, this will be initiated when a match is hit, either via route of html attr:
import indexController from './controllers/indexController';
import contactUsController from './controllers/contactUsController';
import sliderController from './controllers/sliderController';
import blogController from './controllers/blogController';
import GlobalController from './controllers/GlobalController'
import MainNaviController from './controllers/MainNaviController'
import Select2Controller from './controllers/Select2Controller'

/**
 * 
 * ****** URL PATH MATCHING *******
     * The router can be used to trigger on url paths and params.
     *
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

 * ****** HTML ATTRIBUTE MATCHING *******
     * The router can now also be used to match on html attributes, eg class or id or bespoke attrs, but see below for examples.
     * For the attirbute routing to work you must include jquery to the global window object
 * 
 */
 
export default {
    'path': {
        '*': [ GlobalController ]
        '/': [ indexController ],
        '/contactUsController/(thanks)':  [ contactUsController ],
        '/blog-posts/*':  [ blogController, sliderController ]
    },
    'attributes': {
        'content-type': {
          'artical-container': [articleContainerController],
          'article': [articlePageController]
        },
        'class': {
          'mega-navi': [MainNaviController],
          'select2': [Select2Controller]
        }
    }
   
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