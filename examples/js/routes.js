/**
 *
 * THIS IS AN EXAMPLE ROUTES EXPORT THAT COULD BE GIVEN TO THE ROUTER ONLY!
 *
 */


/**
 * When you pass this object to the router, the router will start a new instance of the indexPageController when the url in the browser is <domain>/
 * It will not call the contactusController unless the url is <domain>/contact-us
 *
 * Example key:
 * '/some-route/(controller-a|controller-b|controller-b/param_a)'
 *
 * The above controller will call the array of controller classes provided if the incoming url pathname is any of the following list, but nothing more:
 * '/some-route/'
 * '/some-route/controller-a'
 * '/some-route/controller-b'
 * '/some-route/controller-b/param_a'
 *
 * There is also the option to use a wildcard:
 * '/places/*'
 *
 * This will match to all routes under places but only 1 level deep.
 * eg:
 * '/places/place-a'  =  match
 * '/places/place-a/detail-b'  =  not matched
 *
 * Coming later.. deeper wildcard routing.
 *
 * Currently you cannot mix params with wildcards
 */

import indexPageController from './controllers/indexPageController';
import contactusController from './controllers/contactusController';

export default {
    '/':   [ indexPageController ],
    '/contact-us':  [ contactusController ]
};