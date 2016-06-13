import React from 'react';

export default class App extends React.Component {
	render() {
		console.log("components")
		console.log("this.props.fuga:",this.props.fuga)
		return (
			<div>
				<span>{this.props.fuga}</span><br/>
				<button onClick={ () => this.props.handleClick() }>＊増加＊</button>
			</div>
		);
	}
}