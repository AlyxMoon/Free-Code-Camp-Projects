const {
  Modal,
  Button,
  ButtonToolbar,
  PageHeader,
  Row,
  Col,
  Checkbox,
  Radio,
  FormControl,
  ControlLabel,
  Table
} = require('react-bootstrap')
const React = require('react')
const ReactDOM = require('react-dom')

const defaultRecipes = require('./data.json')

let recipes = localStorage.getItem('alyxdelunar_recipes');
if(recipes === null) {
	recipes = defaultRecipes;
}
else recipes = JSON.parse(recipes);

class RecipeBox extends React.Component {
  constructor(props) {
    super(props);
  	this.state = {
  		showAll: true,
  		showAddModal: false,
  		showEditModal: false,
  		recipes: this.props.recipes,
  		activeRecipe: this.props.recipes[0],
  		activeRecipeIndex: 0
  	};

    this.showRecipe = this.showRecipe.bind(this)
    this.openAdd = this.openAdd.bind(this)
    this.openEdit = this.openEdit.bind(this)
    this.close = this.close.bind(this)
    this.add = this.add.bind(this)
    this.edit = this.edit.bind(this)
    this.changeMadeRecipe = this.changeMadeRecipe.bind(this)
    this.changeShowFilter = this.changeShowFilter.bind(this)
    this.delete = this.delete.bind(this)
  }

	showRecipe(index) {
		this.setState({
			activeRecipeIndex: index
		});
	}

	openAdd() {
		this.setState({
			showAddModal: true
		});
	}

	openEdit(index) {
		this.setState({
			showEditModal: true,
			activeRecipe: this.state.recipes[index],
			activeRecipeIndex: index
		});
	}

	close() {
		this.setState({
			showAddModal: false,
			showEditModal: false
		});
	}

	add(name, ingredients) {
		let newRecipes = this.state.recipes;
		newRecipes.push({
			name: name.toLowerCase(),
			ingredients: normalizeRecipe(ingredients)
		});
		newRecipes.sort(function(a, b) {
			if (a.name < b.name) return -1;
			else if (a.name > b.name) return 1;
			else return 0;
		});

		this.setState({
			recipes: newRecipes
		});
		localStorage.setItem('alyxdelunar_recipes', JSON.stringify(newRecipes));
		this.close();
	}

	edit(name, ingredients) {
		let newRecipes = this.state.recipes;
		newRecipes[this.state.activeRecipeIndex] = {
			name: name.toLowerCase(),
			ingredients: normalizeRecipe(ingredients)
		};

		newRecipes.sort(function(a, b) {
			if (a.name < b.name) return -1;
			else if (a.name > b.name) return 1;
			else return 0;
		});

		this.setState({
			recipes: newRecipes
		});
		localStorage.setItem('alyxdelunar_recipes', JSON.stringify(newRecipes));
		this.close();
	}

	changeMadeRecipe(event) {
		let recipes = this.state.recipes;
		recipes[this.state.activeRecipeIndex].made = event.target.checked;

		this.setState({
			recipes: recipes
		});
		localStorage.setItem('alyxdelunar_recipes', JSON.stringify(recipes));
	}

	changeShowFilter(event) {
		this.setState({ showAll: event.target.value === "true" ? true : false });
	}

	delete(index) {
		let recipes = this.state.recipes;
		recipes.splice(index, 1);
		this.setState({
			recipes: recipes
		});

		localStorage.setItem('alyxdelunar_recipes', JSON.stringify(recipes));
		if (index === recipes.length) {
			this.setState({
				activeRecipeIndex: recipes.length - 1,
				activeRecipe: recipes[recipes.length - 1]
			});
		}
	}

	render() {
		let self = this;
		let titles = this.state.recipes.map(function(recipe) {
			return recipe.name;
		});
		let recipes = this.state.recipes.map(function(recipe) {
			return recipe.ingredients;
		});

		return (
			<div>
				<Header />

				<Row className='bottom-border'>
					<Col sm={4} xs={6} className="right-border">
						<h4>Recipe</h4>
						<Button onClick={this.openAdd} bsStyle='primary' className='right'>Add</Button>
					</Col>
					<Col sm={8} xs={6}>
						<h4>Ingredients</h4>
					</Col>
				</Row>

				<Row>
					<Col sm={4} xs={6} className="right-border">
						<Radio onChange={this.changeShowFilter} name="show" value={true} defaultChecked inline>Show All</Radio>
						<Radio onChange={this.changeShowFilter} name="show" value={false} inline>Show Not Made</Radio>
						<div className="limit-height">
							<RecipeTitles showAll={this.state.showAll} recipes={this.state.recipes} activeIndex={this.state.activeRecipeIndex} handleClick={this.showRecipe} />
						</div>
					</Col>
					<Col sm={8} xs={6}>
						<RecipeDetails recipe={this.state.recipes[this.state.activeRecipeIndex]} index={this.state.activeRecipeIndex} delete={this.delete} openEdit={this.openEdit} changeMadeRecipe={this.changeMadeRecipe} />
					</Col>

				</Row>

				<RecipePrompt type="add" show={this.state.showAddModal} save={this.add} close={this.close} />
				<RecipePrompt type="edit" activeRecipe={this.state.activeRecipe} show={this.state.showEditModal} save={this.edit} close={this.close} />
			</div>
		)
	}
}

class Header extends React.Component {
	render() {
		return (
			<div>
				<PageHeader>Little Alchemy Recipes</PageHeader>
				<p>Ever play <a href="https://littlealchemy.com/">Little Alchemy</a>? It's an addicting little game where you mash different elements together to create everything in the world! Well actually, 560(ish) things.</p>
				<p>Some of them are pretty weird so here are all the combinations to help you out. Warning, spoilers!</p>
				<p>Recipes were built using data from the GitHub Repo <a href="https://github.com/redfast00/element-alchemy-cheater">Element-Alchemy-Cheater</a>.</p>
			</div>
		)
	}
}

class RecipeTitles extends React.Component {
	render() {
		var activeIndex = this.props.activeIndex;
		var handleClick = this.props.handleClick;
		var showAll = this.props.showAll;
		var titles = this.props.recipes.map(function(element, index) {
			var currentClass = "";
			if(index == activeIndex) currentClass = 'info';
			else if(element.made) currentClass = 'success';

			if(showAll || !element.made) {
				return <tr key={index} className={currentClass} onClick={ () => { handleClick(index) } }><td>{element.name}</td></tr>
			}
		})

		return (
			<Table hover>
				<tbody>
					{titles}
				</tbody>
			</Table>
		)
	}
}

class RecipeDetails extends React.Component {
	render() {
		return (
			<div>
        <h2>{this.props.recipe.name}</h2>
        <Checkbox onChange={this.props.changeMadeRecipe} checked={this.props.recipe.made}>Made Recipe</Checkbox>
				<ButtonToolbar>
					<Button onClick={() => {this.props.delete(this.props.index)} } bsStyle='danger'>Delete</Button>
					<Button onClick={() => {this.props.openEdit(this.props.index)} }>Edit</Button>
				</ButtonToolbar>
				<hr />
				{this.props.recipe.ingredients.map(function(recipe, index) {
					return (
						<div key={index}>
							<h4> Variation {index + 1} </h4>
							<ul>
								{recipe.map(function(ingredient, index2) {
									return <li key={index2}>{ingredient}</li>
								})}
							</ul>
						</div>

					)
				})}
			</div>
		)
	}
}

class RecipePrompt extends React.Component {
	constructor(props) {
    super(props)
		if (this.props.type === "add") {
			this.state = {
				title: "New Recipe",
				name: "New Recipe",
				ingredients: ""
			};
		} else {
			this.state = {
				title: "Edit Recipe",
				name: this.props.activeRecipe.name,
				ingredients: this.props.activeRecipe.ingredients
			};
		}

    this.trackNameChange = this.trackNameChange.bind(this)
    this.trackIngredientsChange = this.trackIngredientsChange.bind(this)
	}

	componentWillReceiveProps(newProps) {
		if (newProps.hasOwnProperty('activeRecipe')) {
			var tempIngredients = newProps.activeRecipe.ingredients.join('\n');

			this.setState({
				name: newProps.activeRecipe.name,
				ingredients: tempIngredients
			});
		}
	}

	trackNameChange(event) {
		this.setState({
			name: event.target.value
		});
	}

	trackIngredientsChange(event) {
		this.setState({
			ingredients: event.target.value
		});
	}

	render() {
		return (
			<div>
				<Modal show={this.props.show} onHide={this.props.close}>

					<Modal.Header>
						<Modal.Title>{this.state.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ControlLabel>Recipe Name</ControlLabel>
						<FormControl componentClass="textarea" onChange={this.trackNameChange} value={this.state.name} />

						<ControlLabel>Ingredients</ControlLabel>
						<FormControl componentClass="textarea" onChange={this.trackIngredientsChange} placeholder="Enter ingredients here, separated by commas (different variations with newlines)" value={this.state.ingredients} />
					</Modal.Body>
					<Modal.Footer>
						<ButtonToolbar>
							<Button bsStyle='primary' onClick={ () => {this.props.save(this.state.name, this.state.ingredients)} }>Save</Button>
							<Button bsStyle='danger' onClick={this.props.close}>Cancel</Button>
						</ButtonToolbar>
					</Modal.Footer>

				</Modal>
			</div>
		)
	}
};

function normalizeRecipe(recipe) {
	recipe = recipe.toLowerCase().split('\n').map(function(elem) {
		return elem.split(',');
	});

	return recipe;
};

ReactDOM.render(<RecipeBox recipes={recipes} />, document.getElementById('recipe-box'));
