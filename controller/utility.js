const buildSearchObject = (queryObj) => {
    
    let searchQuery = {}

    if( queryObj !== {} ) { 

        if(typeof queryObj.search !== 'undefined') searchQuery.where = buildSearch(queryObj.search);

        if(typeof queryObj.limit !== 'undefined') searchQuery.select = buildLimit(queryObj.limit);

    }

    return searchQuery
}

const buildLimit = (limitObj) => {

    limit = {};

    if(typeof limitObj === 'object') {
        for (const item of limitObj) {
            limit[item] = true
        }
    } else {
        limit[limitObj] = true
    }
    return limit
}

const buildSearch = (searchObj) => {
    let search = {};
    for (const property in searchObj) {
      
        if(!Number.isNaN(parseInt(searchObj[property])) ) {
            searchObj[property] = parseInt(searchObj[property])
        }

      switch (typeof searchObj[property]) {

        case 'string':
            search[property] = {
                contains: searchObj[property]
            }
        break;

        case 'boolean':
        case 'number':

            if(property === "id") {
                search['post_id'] = parseInt(searchObj[property])  
            } else {
                search[property] = {
                    equals: searchObj[property]
                }
            }
        break;
      }
    }
    return search
}

module.exports = { buildSearchObject }