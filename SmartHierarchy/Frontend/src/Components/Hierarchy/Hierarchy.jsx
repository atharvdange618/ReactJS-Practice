import React from "react";
import PropTypes from "prop-types";
import "./TreeDiagram.css"; // For custom styles

const TreeNode = ({ node }) => {
    return (
        <li className="tree-node">
            <div className="node">
                <img src={node.profilePic} alt="Profile" className="profile-pic" onError={(e) => { e.target.src = 'defaultProfilePic.png'; }} />
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

TreeNode.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        profilePic: PropTypes.string,
        children: PropTypes.arrayOf(PropTypes.object)
    }).isRequired
};

const Hierarchy = ({ data }) => {
    return (
        <div className="tree" role="tree">
            <ul className="tree-root">
                {data.map((node) => (
                    <TreeNode key={node.id} node={node} />
                ))}
            </ul>
        </div>
    );
};

Hierarchy.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            profilePic: PropTypes.string,
            children: PropTypes.arrayOf(PropTypes.object)
        })
    ).isRequired
};

export default React.memo(Hierarchy);
