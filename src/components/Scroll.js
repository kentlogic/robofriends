import React from 'react'

const Scroll = (props) => {
	return (
		<div style={{ 
				overflowY: 'scroll',
				border: '0px solid green',
				height: '700px',
				padding: '11px'
				}}>
			{props.children}
		</div>
	);
};

export default Scroll;