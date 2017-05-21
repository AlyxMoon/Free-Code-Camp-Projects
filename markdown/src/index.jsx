var startText = "\
# Heading 1\n\
## Heading 2\n\
### Heading 3\n\
#### Heading 4\n\
##### Heading 5\n\
###### Heading 6\n\
\n\
Alt-Heading 1\n\
====================\n\
Alt-Heading 2\n\
--------------------\n\
\n\
1. First ordered list item\n\
2. Another ordered list item\n\
  * An unordered sub-list\n\
1. Any number will do for the list item!\n\
  1. Ordered sub-list\n\
20173831. Seriously, any number! Even if it's over 9000!\n\
\n\
  An indented paragraph in a list item (spaces before this line are needed)\n\
\n\
  To have a line break without a paragraph, you will need to use two trailing spaces.  \n\
  This is a new line, but still grouped with the paragraph.\n\
\n\
\n\
* Unordered list can use asterisks\n\
- Or minuses\n\
+ Or pluses\n"

window.onload = function() {
	ReactDOM.render(<Form text={startText}/>, document.getElementById('container'));
}


class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = { text: props.text };

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({text: event.target.value});
	}

	getMarkdown() {
		return {__html: marked(this.state.text)};
	}

	render() {
		return (
			<div className="row">
				<div className="col-md-6">
					<h3 className="center">Markdown Text</h3>
					<textarea rows="20" className="form-control" onChange={this.handleChange} value={this.state.text}></textarea>
				</div>
				<div className="col-md-6">
					<h3 className="center">Preview</h3>
					<div className="display" dangerouslySetInnerHTML={this.getMarkdown()}></div>
				</div>
			</div>

		)
	}

};