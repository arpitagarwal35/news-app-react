import React from "react";
import { Input } from "semantic-ui-react";
import _ from "lodash";

const SearchBar = (props) => {
    const { searchForTopic, setLoading, loader } = props;

    const debouncedSearch = _.debounce(searchForTopic, 3000)

    const handleChange = (event) => {
        setLoading(true);
        debouncedSearch(event.target.value)
    }

    return (
        <Input fluid loading={loader} placeholder='Search topic' onChange={handleChange} />
    );
}

export default SearchBar;