import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary'
import './App.css'
import { setSearchField, requestRobots } from '../actions'


const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error,
	}
}

const mapDispatchToProps = (dispatch) => {
	return { 
		onSearchChange: (event) =>  dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots()) 
	}
} 

class App extends Component { 
	constructor() {
		super()
		const today = new Date();
		const hour = today.getHours();
		this.state = {
			hour: hour
		}
	}

	componentDidMount() {
		this.props.onRequestRobots();
		}

	render() {
		document.title = 'RoboFriends'
 		const { searchField, onSearchChange, robots, isPending } = this.props;
		//const { searchField, onSearchChange} = this.props
		const filteredRobots = robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase())
		})
		return isPending ?
			(<h1 className="tc">Loading...</h1>)
			:			
				(!filteredRobots.length ? 
					(
						<div className='tc'>
						<h1 className='f1'>RoboFriends</h1>
						<h1 className='f1'>{this.state.time}</h1>
						<SearchBox searchChange={onSearchChange}/>
							<h1 className='tc f3'>No robots found.</h1>
						</div>
					) :
					(
						<div className='tc'>
							<h1 className='f1'>RoboFriends</h1>
							<p className='f2'>{this.state.hour > 15 ? 'Good evening!' : 'Good day!'} </p>
							<SearchBox searchChange={onSearchChange}/>
							<Scroll>
								<ErrorBoundary>
									<CardList robots={filteredRobots}/>
								</ErrorBoundary>
							</Scroll>
						</div>
					)
				)
	}


}
export default connect(mapStateToProps, mapDispatchToProps)(App);