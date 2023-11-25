import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash"; // Assuming you're using lodash for cloning

export const NestedCheckbox = ({ data }) => {
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        setNodes([...data]);
    }, [data]);

    const handleBoxChecked = (e, ancestors) => {
        const checked = e.currentTarget.checked;
        const nodeId = e.currentTarget.value;
        const updatedNodes = updateNodes(cloneDeep(nodes), nodeId, ancestors, checked);
        setNodes(updatedNodes);
    };

    const updateNodes = (nodesCopy, nodeId, ancestors, checked) => {
        return nodesCopy.map((node) => {
            if (node.label === nodeId) {
                node.checked = checked;
                if (node.children && node.children.length > 0) {
                    node.children = node.children.map((child) => ({
                        ...child,
                        checked: checked,
                    }));
                }
            } else if (node.children && node.children.length > 0) {
                const updatedChildren = updateNodes(cloneDeep(node.children), nodeId, ancestors, checked);
                node.children = updatedChildren;
                const allChildrenChecked = updatedChildren.every((child) => child.checked);
                const someChildrenChecked = updatedChildren.some((child) => child.checked);

                if (checked && allChildrenChecked) {
                    node.checked = true;
                } else if (!checked && !someChildrenChecked) {
                    node.checked = false;
                } else {
                    node.checked = checked;
                }
            }
            return node;
        });
    };

    return (
        <NestedCheckboxHelper nodes={nodes} ancestors={[]} onBoxChecked={handleBoxChecked} />
    );
};

export const NestedCheckboxHelper = ({ nodes, ancestors, onBoxChecked }) => {
    const prefix = ancestors.join(".");
    return (
        <ul>
            {nodes.map(({ label, checked, children }) => {
                const id = `${prefix}.${label}`;
                let nestedChildren = null;
                if (children && children.length > 0) {
                    nestedChildren = (
                        <NestedCheckboxHelper
                            key={id}
                            nodes={children}
                            ancestors={[...ancestors, label]}
                            onBoxChecked={onBoxChecked}
                        />
                    );
                }
                return (
                    <li key={id}>
                        <input
                            type="checkbox"
                            name={id}
                            value={label}
                            checked={checked}
                            onChange={(e) => onBoxChecked(e, [...ancestors, label])}
                        />
                        <label htmlFor={id}>{label}</label>
                        {nestedChildren}
                    </li>
                );
            })}
        </ul>
    );
};
