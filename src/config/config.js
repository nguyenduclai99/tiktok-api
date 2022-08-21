'use strict'

import dotenv from "dotenv";
dotenv.config();

const scraper = {
    proxy_switch: false,
    use_different_protocols: false,
    all: "45.167.124.5:9992",
    http_proxy: "http://45.167.124.5:9992",
    https_proxy: "https://45.167.124.5:9992"
};

const webApi = {
    video_download: true,
    music_download: true,
    allow_logs: true
}

const headers = {
    headers: {
        'user-agent': 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36 Edg/87.0.664.66'
    },
    tiktok_headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "authority": "www.tiktok.com",
        "Accept-Encoding": "gzip, deflate",
        "Connection": "keep-alive",
        "Host": "www.tiktok.com",
        "User-Agent": "Mozilla/5.0  (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) coc_coc_browser/86.0.170 Chrome/80.0.3987.170 Safari/537.36",
    }
}

const configAxiosTiktok = {
    baseURL: process.env.TIKTOK_DOWNLOAD_API
}

export { scraper, webApi, headers, configAxiosTiktok }