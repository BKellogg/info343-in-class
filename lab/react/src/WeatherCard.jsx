import React from 'react';

export default class extends React.Component {
	constructor(props) {
		super(props);
	
		this.state = {};
	}

	render() {
		return <p className="center-text">{this.state.name}</p>;
	}
}
		