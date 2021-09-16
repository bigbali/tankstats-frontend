import React from 'react';
import { useState } from 'react';

const InputDropdown = (props) => {
    const [selectedOption, setSelectedOption] = useState(0);
    //TODO: use redux

    return (
        props.options.map(option => {
            return (
                null
            )
        })
    )
}

export default InputDropdown
