import React, { useState } from 'react';
import InputDropdown from '../InputDropdown';
import './BattleTypeSelector.style.scss';
import BATTLE_TYPES, { getReadableBattleType } from '../../globals/battleTypes';

const BattleTypeSelector = ({ value, onChange }) => {
    // TODO: show battle type icon

    return (
        <div className="battle-type-selector">
            <img src="" alt="" />
            <div className="border-top border-bottom">
                <InputDropdown
                    options={BATTLE_TYPES}
                    value={getReadableBattleType(value)}
                    displayTransform={getReadableBattleType}
                    letterCasing={"capitalize-first-letter"}
                    onSelect={(value) => {
                        onChange(value);
                    }}
                />
            </div>
        </div>
    )
}

export default BattleTypeSelector
