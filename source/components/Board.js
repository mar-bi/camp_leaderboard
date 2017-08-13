import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { api } from './Api';

class RowHeader extends React.Component {
	constructor(props) {
		super(props);
		this.handleClickTop30 = this.handleClickTop30.bind(this);
		this.handleClickTopAll = this.handleClickTopAll.bind(this);
	}

	handleClickTop30(event) {
		event.preventDefault();
		this.props.onClickTop30(true);
	}

	handleClickTopAll(event) {
		event.preventDefault();
		this.props.onClickTopAll(false);
	}


	render() {
		let first = null, 
				second = null;
		if (this.props.buildTop30) {
			first = <span className='active'>Points in past 30 days ***</span>;
			second = <span>All-time points</span>;
		} else {
			first = <span>Points in past 30 days</span>;
			second = <span className='active'>All-time points ***</span>;
		}

		return (
			<thead>
				<tr className="table-header">
					<th id="record">#</th>
					<th id="camper-name">Camper Name</th>
					<th><a href='#' onClick={this.handleClickTop30}>{first}</a></th>
					<th><a href='#' onClick={this.handleClickTopAll}>{second}</a></th>
				</tr>
			</thead>
		)
	}	
}


RowHeader.propTypes = {
	buildTop30: PropTypes.bool.isRequired,
	onClickTop30: PropTypes.func.isRequired,
	onClickTopAll: PropTypes.func.isRequired
}


function CampersTable(props) {
	const link = 'https://www.freecodecamp.com/';
	const buildTable = (arr) => 
		arr.map(function(camper, index) {
			return (
				<tr key={camper.username}>
					<td>{index + 1}</td>
					<td className='userinfo'>
						<img src={camper.img} alt='avatar' className='avatar'/>
						<a 
						  href={link + camper.username + '/'} 
						  target='_blank' 
						  className="username">
						  {camper.username}
						</a>
					</td>
					<td>{camper.recent}</td>
					<td>{camper.alltime}</td>
				</tr>
			)
		});

	return (
		<tbody>
			{props.buildTop30
				? buildTable(props.monthlycampers) 
				: buildTable(props.allcampers)}
		</tbody>		
	)
}

CampersTable.propTypes = {
	buildTop30: PropTypes.bool.isRequired,
	monthlycampers: PropTypes.array.isRequired,
	allcampers:PropTypes.array.isRequired
}

function Caption(props) {
	return (
		<caption>
			FreeCodeCamp Leaderboard <a href="http://mar-bi.github.io" target="_blank">(by mar-bi)</a>
		</caption>
	)
}

function Loading(props) {
	return (
		<tbody>
			<tr>
				<td colSpan="4" className='loading'>Loading...</td>
			</tr>
		</tbody>
	)
}


export class Board extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			monthlyTop: true,
			top30: null,
			topAll: null 
		};
		this.updateCampers = this.updateCampers.bind(this);
		this.showTop30 = this.showTop30.bind(this);
	}

	componentDidMount() {
		this.updateCampers();
	}

	componentWillUnmount() {
		this.setState({
			monthlyTop: true,
			top30: null,
			topAll: null
		});
	}

	
	updateCampers() {
		api().then(function(obj) {
			this.setState(function() {
				return {
					top30: obj.top30,
					topAll: obj.topAll
				}
			});
		}.bind(this));
	}

	showTop30(bool) {
		this.setState({
			monthlyTop: bool 
		});
	}


	render() {
		return (
			<table>
				<Caption />
				<RowHeader
					buildTop30={this.state.monthlyTop} 
					onClickTop30={this.showTop30} 
					onClickTopAll={this.showTop30} />
				{!this.state.top30
					? <Loading />
					: <CampersTable
							buildTop30={this.state.monthlyTop} 
							monthlycampers={this.state.top30} 
							allcampers={this.state.topAll} />}
			</table>
		)
	}
}

