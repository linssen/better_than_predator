'use strict';

import React from 'react';
import { Link } from 'react-router';

class Search extends React.Component {
    render() {
        return (
            <div className="search">
                <h1>Search</h1>
                <Link to="/versus">Versus</Link>
            </div>
        );
    }
}

export default Search
