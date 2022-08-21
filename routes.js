'use strict';

import { videoDetailTiktokByUrl, oauth, redirect } from './src/controllers/tiktok.js';
const routes = (app) => {
    // Tiktok Routes
    app.route('/api/v1/tiktok/video/info').get(videoDetailTiktokByUrl);
    app.route('/tiktok/oauth').get(oauth);
    app.route('/tiktok/redirect').get(redirect);
}

export default routes;