const _ = require('lodash');

const buildSearchObject = (queryObjSrc, idName ) => {
    
    let queryObj = _.cloneDeep(queryObjSrc)

    let searchQuery = {}

    updateIdFeild(queryObj, idName)

    if(typeof queryObj.search !== 'undefined') searchQuery.where = buildSearch(queryObj.search);

    if(typeof queryObj.limit !== 'undefined') searchQuery.select = buildLimit(queryObj.limit);

    return searchQuery
}

const updateIdFeild = (queryObj, idName) => {
    if( queryObj.search && typeof queryObj.search.id !== undefined) {
        queryObj.search[`${idName}_id`] =  queryObj.search.id;
        delete  queryObj.search.id;
      }
  
      if(queryObj.limit && typeof queryObj.limit.id !== undefined) {
        queryObj.limit[`${idName}_id`]=  queryObj.limit.id;
        delete  queryObj.limit.id;
      }
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