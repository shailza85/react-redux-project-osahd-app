/**
 * Redux Actions
 * Actions are "labels" for what type of functionality/manipulation
 * we will be performing/allowing on our global state data.
 * The action "names" ('type' property values), by convention, are
 * uppercase as they are representing a "constant" value.
 */

import React from 'react';

const addNewsFeed = (newsFeed) => {
    return( 
        {
    type: "ADD_NEWS_FEED" ,  // Our action "label."
    value: newsFeed
}

);
}

export default addNewsFeed;