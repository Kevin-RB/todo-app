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
const setFilters = ({filterByTitle, hideCompleted, sortBy}) =>{
    if(typeof filterByTitle === 'string'){
        filters.filterByTitle = filterByTitle
    }
    if(typeof hideCompleted === 'boolean'){
        filters.hideCompleted = hideCompleted
    }
    if(typeof sortBy === 'string'){
        filters.sortBy = sortBy
    }
}

// Make sure to set up the exports

export {getFilters, setFilters}