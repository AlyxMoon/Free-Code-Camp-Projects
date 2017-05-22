window.onload = function() {
	ReactDOM.render(<Leaderboard />, document.getElementById("leaderboard"));
};

class Leaderboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			topAllTime: [],
			topRecent: [],
			mode: "topAllTime"
		};

		this.getUserData();
	}

	changeSortMode(newSortMode) {
		this.setState({ mode: newSortMode });
		console.log(newSortMode);
	}

	getUserData() {
		let linkTopAllTimeUsers =
			"https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
		let linkTopRecentUsers =
			"https://fcctop100.herokuapp.com/api/fccusers/top/recent";

		getAPI(linkTopAllTimeUsers, (error, data) => {
			if (error) console.log(error);
			else this.setState({ topAllTime: data });
		});

		getAPI(linkTopRecentUsers, (error, data) => {
			if (error) console.log(error);
			else this.setState({ topRecent: data });
		});
	}

	render() {
		return (
			<div>
				<div className="header">
					<h3>
						<a href="https://www.freecodecamp.com">FreeCodeCamp</a> Leaderboard
					</h3>
				</div>
				<table className="table table-bordered table-striped">
					<thead>
						<tr>
							<th>Rank</th>
							<th>Camper</th>
							<th>
								<a
									className={this.state.mode == "topAllTime" && "active"}
									href="#"
									onClick={this.changeSortMode.bind(this, "topAllTime")}
								>
									Score - All Time
								</a>
							</th>
							<th>
								<a
									className={this.state.mode == "topRecent" && "active"}
									href="#"
									onClick={this.changeSortMode.bind(this, "topRecent")}
								>
									Score - Recent
								</a>
							</th>
						</tr>
					</thead>
					<tbody>
						{this.state[this.state.mode].map(function(user, i) {
							return (
								<tr>
									<td>{i + 1}</td>
									<td>
										<img src={user.img} />
										<span className="username">
											<a
                        href={"https://www.freecodecamp.com/" + user.username}
                        target='_blank'>
												{user.username}
											</a>
										</span>
									</td>
									<td>{user.alltime}</td>
									<td>{user.recent}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

function getAPI(url, callback) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", url, true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				return callback(null, JSON.parse(xmlhttp.responseText));
			} else return callback(xmlhttp, null);
		}
	};
	xmlhttp.send(null);
}
