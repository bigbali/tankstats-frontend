import React, { useState } from 'react';
import InputDropdown from '../InputDropdown';
import './BattleTypeSelector.style.scss';
import BATTLE_TYPES, { getReadableBattleType } from '../../globals/battleTypes';
import RandomBattleIcon from '../../media/png/battle-type-icons/battle-type-random-144.png';
import RankedBattleIcon from '../../media/png/battle-type-icons/battle-type-ranked-136.png';

const BattleTypeSelector = ({ value, onChange }) => {
    // TODO: show battle type icon

    const Icon = ({ battleType }) => {
        let src;

        switch (battleType) {
            case "random":
                src = RandomBattleIcon
                break;
            case "ranked":
                src = RankedBattleIcon
                break;
            default:
                src = null
                break;
        }

        if (src) {
            return (
                <img
                    className="battle-type-icon"
                    src={src}
                    alt=""
                />
            )
        }
        else {
            return null
        }
    }

    return (
        <div className="battle-type-selector">
            <Icon battleType={value} />
            <div className="border-top border-bottom input-wrapper">
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
