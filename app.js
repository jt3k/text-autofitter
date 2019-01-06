import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
	state = {
		text: `JAVASCRIPT\nIS\nAWESOME`,
	};

	handleChange = ({ target }) => {
		this.setState({ text: target.value });
	};

	render() {
		const { text } = this.state;
		const lines = text.split(/\n/);
		return (
			<div
				style={{
					width: '30%',
					margin: 'auto',
				}}
			>
				<textarea
					onChange={this.handleChange}
					value={text}
					rows="8"
					style={{ position: 'absolute', left: '10px' }}
				/>
				<div style={{ border: '4px solid', padding: '1.5em 2em' }}>
					{lines.map(line => (
						<div key={Math.random()}>
							<TextAutofitter
								style={{
									fontFamily: 'sans-serif',
									lineHeight: 0.8,
								}}
							>
								{line}
							</TextAutofitter>
						</div>
					))}
				</div>
			</div>
		);
	}
}

class TextAutofitter extends Component {
	state = {
		fontSize: 100,
	};

	setElementRef = ref => {
		this.elementRef = ref;
	};

	calcFontSize = () => {
		const { elementRef } = this;
		const rect = elementRef.getBoundingClientRect();
		const parentRect = elementRef.parentElement.getBoundingClientRect();
		const wishfulWidth = parentRect.width;
		const k = rect.width / this.state.fontSize;
		const fontSize = wishfulWidth / k;
		return fontSize;
	};

	componentDidMount() {
		this.setState({
			fontSize: this.calcFontSize(),
		});
	}

	render() {
		const { children, style } = this.props;
		if (typeof children !== 'string') {
			console.warn('TextAutofitter: expected text in children');
			return null;
		}

		const { fontSize } = this.state;
		return (
			<span
				style={{ ...style, fontSize, whiteSpace: 'pre' }}
				ref={this.setElementRef}
			>
				{children}
			</span>
		);
	}
}

render(<App />, document.getElementById('app'));
