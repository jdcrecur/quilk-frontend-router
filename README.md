# quilk-frontend-router 

A simple es6 router for JS code to run on a predominately server side driven application.

For example, if you were developing a PHP CMS (eg eZ Platform) you could use this router to trigger only the js code needed based on either what the URL is or what HTML elements are on screen.

This prevents excessive build up of events being initialised, using this router means only the controllers needed or the page will be initialised.



## Example how to use it
(NB a class will never be called more than once on a page. Once the runner has initialised a class it keeps an internal record to ensure it doesn't duplicated class calls.)


##### Example app.js
This is your front door into you whole app, `app.js`: Include the routing module and pass in your routes/attributes.
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


##### Example routes.js file
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

// Now map each controller to 1 or more url paths or html attributes (see below for a fuller explanation of what it is possible.
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
        'select2': {
           '*': [Select2Controller]
        }
        'class': {
          'mega-navi': [MainNaviController],
        }
    }
};
```


### URL PATH MATCHING

##### Example straight match:
`/this-route-only/`

The above will only match if the pathname is the same as the key, ie:
`/this-route-only`
`/this-route-only/`


##### Example key with params:
`/some-route/(controller-a|controller-b|controller-b/param_a)`

The above will call the array of controller classes provided if the incoming url pathname is any of the following list, but nothing more:
`/some-route/`
`/some-route/controller-a`
`/some-route/controller-b`
`/some-route/controller-b/param_a`

##### Exmaple wildcard key:
`/somepath/*`

The above will call the array of controller classes provided if the incoming url pathname is any of the following list, but nothing more:
`/some-route/`
`/some-route/*` basically it matches everything after the key `/somepath`


### HTML ATTRIBUTE MATCHING
The router, as can be seen from the example above, be used to initialise es6 classes based on what is on screen in the form of html attributes.

From the example, html attr `class` will match when a class is found of `mega-navi`... eg   `<div class="col-md-4 mega-navi"></div>`

There is also wildcard attribute matching, ie trigger simply when the attribute is found regardless of the value.. see the wildcard in the main example above for attr `select2`.



### Example class to be called

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

### Example directory structure

```
controlllers/ <your controller classes here>
lib/ <your general lib classes here>
services/ <your service files here (ie class to call ajax requests etc)>
app.js
routes.js
```