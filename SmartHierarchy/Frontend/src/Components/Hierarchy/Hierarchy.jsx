import React from "react";
import "./TreeDiagram.css"; // For custom styles

const TreeNode = ({ node }) => {
    return (
        <li className="tree-node">
            <div className="node">
                <img src={node.profilePic} alt="Profile" className="profile-pic" />
                <p className="username">{node.username}</p>
            </div>
            {node.children && node.children.length > 0 && (
                <ul className="children">
                    {node.children.map((child) => (
                        <TreeNode key={child.id} node={child} />
                    ))}
                </ul>
            )}
        </li>
    );
};

const Hierarchy = ({ data }) => {
    return (
        <div className="tree">
            <ul className="tree-root">
                {data.map((node) => (
                    <TreeNode key={node.id} node={node} />
                ))}
            </ul>
        </div>
    );
};

export default Hierarchy;
