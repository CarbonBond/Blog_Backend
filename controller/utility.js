const buildSearchObject = (queryObj) => {
    
    let searchQuery = {}

    if( queryObj !== {} ) { 

      if(typeof queryObj.search !== 'undefined') {
        searchQuery.where = {};
        for (const property in queryObj.search) {
          
          switch (typeof queryObj.search[property]) {

            case 'string':
                searchQuery.where[property] = {
                    contains: queryObj.search[property]
                }
            break;
    
            case 'boolean':
            case 'number':

                if(property === "id") {
                    searchQuery.where['post_id'] = parseInt(queryObj.search[property])  
                } else {
                    searchQuery.where[property] = {
                        equals: queryObj.search[property]
                    }
                }
            break;
          }
        }
      } 

      if(typeof queryObj.limit !== 'undefined') {
        searchQuery.select = {};
        if(typeof queryObj.limit === 'object') {
          for (const item of queryObj.limit) {
            searchQuery.select[item] = true
          }
        } else {
          searchQuery.select[queryObj.limit] = true
        }
      }
    }


    return searchQuery
}

module.exports = { buildSearchObject }