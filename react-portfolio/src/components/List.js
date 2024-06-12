import React from 'react'

const List = ({ items }) => {
    return (
        <ul>
            {items.map((item) => (
                <li style={{ listStyleType: 'none',textAlign:'left' }} key={item.field}>
                    <span>{item.field}: </span>
                    {item.value}
                </li>
            ))}
        </ul>
    )
}

export default List