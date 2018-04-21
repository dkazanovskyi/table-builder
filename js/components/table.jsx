import React, { Component } from 'react';

var jsonData = [
	{ id: 'Идентификатор', name: 'Название', price: 'Стоимость', quantity: 'Количество' },
	[ 1, 'продукт 1', '900', 5 ],
	[ 3, 'продукт 3', '700', 1 ],
	[ 2, 'продукт 5', '100', 7 ],
	[ 3, 'продукт 1', '300', 2 ],
	[ 2, 'продукт 8', '500', 5 ],
	[ 3, 'продукт 2', '300', 7 ],
	[ 2, 'продукт 9', '600', 4 ],
	[ 3, 'продукт 7', '400', 9 ],
	[ 2, 'продукт 6', '200', 7 ],
	[ 7, 'продукт 9', '600', 5 ],
	[ 5, 'продукт 7', '400', 2 ],
	[ 6, 'продукт 6', '200', 7 ],
	[ 9, 'продукт 9', '600', 1 ],
	[ 7, 'продукт 7', '400', 7 ],
	[ 6, 'продукт 6', '200', 6 ],
	
]


class Table extends Component {
	constructor(props) {
		super(props);
		var headers = jsonData[0];
		var data = jsonData.slice(1);
	
		this.state = {
			headers: headers,
			content: data,
			sortby: null,
			descending: false,
			selectedRow: undefined,
			currentPage: 1,
			rowsPerPage: 7,
		}
		console.log(this.state)
	}

	componentWillMount() {
		/* fetch('./data.json')
		.then(res => (res.json()))
		.then((result) => {
			console.log(result)
		}) */

		const indexOfLast = this.state.currentPage * this.state.rowsPerPage;
		const indexOfFirst = indexOfLast - this.state.rowsPerPage;
		const currentList = this.state.content.slice(indexOfFirst, indexOfLast);
		const pageNumbers = [];

		for (let i = 1; i <= Math.ceil(this.state.content.length / this.state.rowsPerPage); i++) {
			pageNumbers.push(i);
		}
		this.setState({
			contentFiltered: currentList,
			pageNumbers: pageNumbers
		})
	}
	_sort = (e) => {
		var column = e.target.cellIndex;
		var data = Array.from(this.state.content);
		var descending = this.state.sortby === column && !this.state.descending;

		data.sort((a, b) => {
			return descending ? (a[column] < b[column] ? 1 : -1) : (a[column] > b[column] ? 1 : -1);
		});
		this.setState({
			content: data,
			sortby: column,
			descending: descending,
		});
	}

	_search = (e) => {
		var inputContent = e.target.value;
		var data = Array.from(this.state.content);
		var filtered = data;

		if (inputContent) {
			 filtered = data.filter((item) => {
				var isTrue = false;
				for (let i = 0; i < item.length; i++) {
					if (item[i].toString().indexOf(inputContent) > -1) {
						isTrue = true;
						break;
					}
				}
				return isTrue ? true : false;
			});
		}
		this.setState({
			contentFiltered: filtered,
			searchString: inputContent
		});
		return;
	}

	_selectRow(id) {
		var rowId = id;
		var data = this.state.contentFiltered[rowId].join(' | ');

		this.setState({
			selectedRow: data
		});

	}

	_selectPage(id) {
		const indexOfLast = ++id * this.state.rowsPerPage;
		const indexOfFirst = indexOfLast - this.state.rowsPerPage;
		console.log('First:' + indexOfFirst + '  Last:' + indexOfLast)
		const currentList = this.state.content.slice(indexOfFirst, indexOfLast);

		if (!this.state.searchString){
			this.setState({
				currentPage: ++id,
				contentFiltered: currentList
			});
		}
		else return;
		
	}

	_addTableRow = () => {
		var row = [
			Math.floor(Math.random() * 10),
			'Новый продукт',
			Math.floor(Math.random() * 1000),
			Math.floor(Math.random() * 10)
		]

		this.state.content.push(row);
		this.setState({
			content: this.state.content
		});
	}

	render() {
		
		return ( 
			<div className="container">
				<div className="form-group">
					<label htmlFor="searchField">Поиск</label>
					<input onChange={this._search} value={this.state.searchString} type="text" className="form-control" id="searchField" placeholder="Поиск" />
				</div>
				<button onClick={this._addTableRow} className="btn btn-primary">Добавить строку</button>
				<table className="table">
					<thead onClick={this._sort}>
						<tr>
							{Object.keys(this.state.headers).map((item, idx) => {
								var title = this.state.headers[item];
								return <th key={idx}>
									{this.state.sortby === idx ? (title += this.state.descending ? ' \u2191' : ' \u2193') : (title)}
									</th>
							})}
							
						</tr>
					</thead>
					<tbody>
						{this.state.contentFiltered.map((item, idx) => {
							return <tr onClick={() => this._selectRow(idx)} key={idx}>{item.map((child, idx) => {
								return <td key={idx}>{child}</td>
							})}</tr>
						})}
					</tbody>
				</table>
				<ul className="pagination">
					{this.state.pageNumbers.map((item, idx) => {
						return <li className="page-item" key={idx} onClick={() => this._selectPage(idx)}><a className="page-link">{item}</a></li>
					})}
				</ul>
				<h2>{this.state.selectedRow}</h2>
			</div>
		 )
	}
}
 
export default Table;