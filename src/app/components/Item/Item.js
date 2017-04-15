import React from 'react';

import theme from './Item.css';

const ItemComponent = (value) => (
    <span className={theme.stats}>{value}</span>
);

export default ItemComponent;
