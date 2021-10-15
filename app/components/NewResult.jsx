import React from 'react';
import { useSelect } from 'downshift';

// eslint-disable-next-line react/prop-types
const NewResult = ({ teams, setTeam }) => {
  // eslint-disable-next-line react/prop-types
  const teamsNames = teams.map(team => team.name);

  const handleChange = ({ selectedItem }) => {
    setTeam(selectedItem);
  };

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: teamsNames,
    onSelectedItemChange: handleChange,
  });

  return (
    <>
      <div className="result__select">
        <button
          className="result__button"
          type="button"
          {...getToggleButtonProps()}
        >
          {selectedItem || 'Wybierz drużynę'}
        </button>
        {
          <div {...getMenuProps()} className="result__dropdown">
            {isOpen &&
              teamsNames.map((item, index) => (
                <div
                  className="quick-add-to-comparison__select-menu-item"
                  key={`${item.tag}${index}`}
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: '#bde4ff' }
                      : {}
                  }
                  {...getItemProps({ item, index })}
                >
                  {item}
                </div>
              ))}
          </div>
        }
      </div>
    </>
  );
};

export default NewResult;
