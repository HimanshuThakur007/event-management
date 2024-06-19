import React, { useState } from 'react';
import './styles.css';

const TreeNode = ({ node, onCheck }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleCheck = (e) => {
    onCheck(node.value, e.target.checked);

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        onCheck(child.value, e.target.checked);
      });
    }
  };

  return (
    <div className="node">
      <div className="node-content">
        {node && node.children != null && node.children.length > 0 && (
          <span className="toggle" onClick={handleToggle}>
            {expanded ? '-' : '+'}
          </span>
        )}
        <label>
          <input
            type="checkbox"
            checked={node.checked}
            onChange={handleCheck}
          />
          {node.label}
        </label>
      </div>
      {node && node.children != null && node.children.length > 0 && expanded && (
        <div className="children">
          {node.children.map((child) => (
            <TreeNode key={child.value} node={child} onCheck={onCheck} />
          ))}
        </div>
      )}
    </div>
  );
};

const CheckboxTree = ({ data }) => {
  const [treeData, setTreeData] = useState([]);

  React.useEffect(() => {
    setTreeData([...data]);
  }, [data]);

  const handleCheck = (nodeValue, checked) => {
    const updatedTree = updateTree(treeData, nodeValue, checked);
    setTreeData(updatedTree);
  };

  const updateTree = (nodes, value, checked) => {
    return nodes.map((node) => {
      if (node.value === value) {
        node.checked = checked;
      } else if (node.children != null && node.children.length > 0) {
        node.children = updateTree(node.children, value, checked);
      }
      return node;
    });
  };

  return (
    <div className="checkbox-tree">
      {treeData.map((node) => (
        <TreeNode key={node.value} node={node} onCheck={handleCheck} />
      ))}
    </div>
  );
};

export default CheckboxTree;
