// Set up filters default object
const filters = {
    filterByTitle: '',
    hideCompleted: false,
    sortBy: 'byEdited'
}

// getFilters
// Arguments: none
// Return value: filters object
const getFilters = () => filters

// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none
const setFilters = (updates) =>{
    if(typeof updates.filterByTitle === 'string'){
        filters.filterByTitle = updates.filterByTitle
    }
    if(typeof updates.hideCompleted === 'boolean'){
        filters.hideCompleted = updates.hideCompleted
    }
    if(typeof updates.sortBy === 'string'){
        filters.sortBy = updates.sortBy
    }
}

// Make sure to set up the exports

export {getFilters, setFilters}