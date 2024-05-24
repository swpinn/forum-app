import React from 'react';
import PropTypes from 'prop-types';

function CategoryItem({ category }) {
  return (
    <div className="category-item">
      <h3>{category}</h3>
    </div>
  );
}

const threadItemShape = {
  category: PropTypes.string.isRequired,
};

CategoryItem.propTypes = {
  ...threadItemShape,
};

export { threadItemShape };

export default CategoryItem;
