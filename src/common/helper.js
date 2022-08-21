'use strict';

const listDomainAccess = ['https://1989smedia.com'];
const checkDomain = (req) => {
    let origin = req.get('origin')
    return listDomainAccess.includes(origin)
}

export { checkDomain }