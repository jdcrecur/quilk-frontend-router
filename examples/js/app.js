
import routes from './routes'
import quilkFrontendRouter from '../../lib/quilk-frontend-router'; /* replace this */

let app = {
    init:() => {
        new quilkFrontendRouter( routes );
    }
};
app.init();