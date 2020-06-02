import React, { Component } from 'react';
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import { robots } from '../robots'
import ErrorBoundary from '../components/ErrorBoundary'
import './App.css'
class App extends Component { 
	constructor() {
		super()
		const today = new Date();
		const time = today.getHours() + ":" + today.getMinutes() ;
		this.state = {
			robots: [],
			searchfield: '',
			time: time

		}
	}

	componentDidMount() {
		console.log("mount success.")
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
			.then(users => this.setState({ robots: users}));
			console.log("Users loaded.")
		}

	onSearchChange = (event) => { 
		this.setState({ searchfield: event.target.value })
	}

	render() {
		const filteredRobots = this.state.robots.filter(robot =>{
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
		})
		if(!this.state.robots.length){
			return <h1 className="tc">Loading...</h1>
		} else {
				return !filteredRobots.length ? 
					(
						<div className='tc'>
						<h1 className='f1'>RoboFriends</h1>
						<h1 className='f1'>{this.state.time}</h1>
						<SearchBox searchChange={this.onSearchChange}/>
							<h1 className='tc f3'>No robots found.</h1>
						</div>
					) :
					(
						<div className='tc'>
							<h1 className='f1'>RoboFriends</h1>
							<h1 className='f1'>{this.state.time}</h1>
							<SearchBox searchChange={this.onSearchChange}/>
							<Scroll>
								<ErrorBoundary>
									<CardList robots={filteredRobots}/>
								</ErrorBoundary>
							</Scroll>
						</div>
					);
				}
	}


}
export default App;