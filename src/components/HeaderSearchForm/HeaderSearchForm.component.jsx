import React from 'react'
import InputDropdown from '../InputDropdown/InputDropdown.component'

const HeaderSearchForm = () => {
    return <form action="" method="GET">
        <InputDropdown
            placeholder=""
            options={[
                "player",
                "clan"
            ]} />
    </form>
}

export default HeaderSearchForm

