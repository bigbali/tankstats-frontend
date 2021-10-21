import React from 'react';

export const isDev = () => {
    // Detect if in development mode
    return '_self' in React.createElement('div');
}