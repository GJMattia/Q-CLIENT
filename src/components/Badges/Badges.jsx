import React from 'react';
import './Badges.css';
import Categories from '../../assets/data/categories.json';

export default function Badges({ account }) {
    const categoryData = Categories.categories;

    function parseCategory2(string) {
        const newString = string.replace(/\s/g, '').toLowerCase();
        return newString;
    };

    return (
        <div className='Badges'>
            {Object.keys(categoryData).map(categoryKey => {
                const lower = parseCategory2(categoryKey);
                const percent = account.categories[lower].right;
                return (
                    <div className='Badge' key={categoryKey}>
                        <img
                            className='Icon'
                            src={categoryData[categoryKey].badge}
                            alt={`Badge for ${categoryKey}`}
                            title={categoryKey}
                            style={{ filter: `saturate(${percent}%)` }}
                        />
                        <p>{account.categories[lower].right}/100</p>
                    </div>
                );
            })}
        </div>
    );
}

