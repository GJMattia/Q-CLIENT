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
                const right = account.categories[lower].right;

                let badgeSrc;
                let badgeTitle;
                if (right <= 19) {
                    badgeSrc = categoryData[categoryKey].zero;
                    badgeTitle = 'None';
                } else if (right >= 20 && right <= 49) {
                    badgeSrc = categoryData[categoryKey].bronze;
                    badgeTitle = 'Bronze';
                } else if (right >= 50 && right <= 99) {
                    badgeSrc = categoryData[categoryKey].silver;
                    badgeTitle = 'Silver';
                } else {
                    badgeSrc = categoryData[categoryKey].gold;
                    badgeTitle = 'Gold';
                }

                return (
                    <div className='Badge' key={categoryKey}>
                        <h5>{categoryKey}</h5>
                        <img
                            className='Icon'
                            src={badgeSrc}
                            alt={`Badge for ${categoryKey}`}
                            title={categoryKey}
                        />
                        <p>{badgeTitle}</p>
                        <p>{right}/100</p>
                    </div>
                );
            })}
        </div>
    );
}

