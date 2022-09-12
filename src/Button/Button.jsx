import React from 'react';

const Button = ({onClick, id, texte}) => {
    return (
        <button id={id} type="button" class="btn btn-primary" onClick={onClick} >{texte}</button>
    );
};

export default Button;