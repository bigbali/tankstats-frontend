import React, { useState } from 'react';
import StrategicMapJoin from '../StrategicMapIndexPage/StrategicMapJoin';
import StrategicMapCreate from '../StrategicMapIndexPage/StrategicMapCreate';
import Button from '../../../components/Button';
import './StrategicMapIndexPage.style.scss';

const StrategicMapIndexPage = () => {
    const [isJoinExpanded, setIsJoinExpanded] = useState(false);
    const [isCreateExpanded, setIsCreateExpanded] = useState(false);

    return (
        <main className="strategic-map-index-page">
            <h1>
                Strategic Maps
            </h1>
            <h2>
                Plan your road to victory!
            </h2>
            <h3>About Strategic Maps</h3>
            <p>
                Create and realize strategies using our advanced strategic maps:
                <ul>
                    <li>Maps are updated in real time</li>
                    <li>Built on decentralized (peer-to-peer) technology,
                        which allows fast and efficient sharing of information</li>
                    <li>Keep your strategies secret with high security encryption</li>
                </ul>
            </p>
            <div className="buttons">
                <Button
                    size="medium"
                    onClick={() => {
                        setIsJoinExpanded(previous => !previous)
                    }}
                >
                    Join Strategic Map
                </Button>
                <Button
                    size="medium"
                    isPrimary={true}
                    onClick={() => {
                        setIsCreateExpanded(previous => !previous)
                    }}
                >
                    Create Strategic Map
                </Button>
            </div>
            <StrategicMapJoin
                isExpanded={isJoinExpanded}
            />
            <StrategicMapCreate
                isExpanded={isCreateExpanded}
            />
        </main>
    )
}

export default StrategicMapIndexPage
