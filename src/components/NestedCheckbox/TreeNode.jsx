import React, { useState } from 'react';

export const TreeNode = ({ node, onCheck }) => {
  const { label, value, children, checked } = node;

  const handleCheck = () => {
    onCheck(value);
  };

  return (
    <div style={{ marginLeft: '20px' }}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
        />
        {label}
      </label>
      {children && (
        <ul>
          {children.map(child => (
            <li key={child.value}>
              <TreeNode node={child} onCheck={onCheck} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const TreeView = ({ data }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheck = value => {
    const updatedCheckedItems = {
      ...checkedItems,
      [value]: !checkedItems[value]
    };

    // Check or uncheck all children based on the current node's state
    const checkChildren = (node, checked) => {
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          updatedCheckedItems[child.value] = checked;
          checkChildren(child, checked);
        });
      }
    };

    const currentNode = data.find(item => item.value === value);
    checkChildren(currentNode, updatedCheckedItems[value]);

    setCheckedItems(updatedCheckedItems);
  };

  const renderTreeNodes = nodes =>
    nodes.map(node => (
      <TreeNode
        key={node.value}
        node={{
          ...node,
          checked: !!checkedItems[node.value]
        }}
        onCheck={handleCheck}
      />
    ));

  return (
    <div>
      {renderTreeNodes(data)}
    </div>
  );
};


