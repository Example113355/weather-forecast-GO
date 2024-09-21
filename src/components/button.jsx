const Button = ({ onClick, content, isActive }) => {
    return (
        <button onClick={onClick} className={`button ${isActive? '' : 'disable'}`}>
            {content}
        </button>
    )
}

export default Button
