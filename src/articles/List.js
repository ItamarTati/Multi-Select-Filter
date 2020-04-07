import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import './List.css';
import Select from 'react-select';

const countries = [
  { value: 'France', label: 'France' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Spain', label: 'Spain' },
];

let multiValueContainer = ({ selectProps, data }) => {
  const label = data.label;
  const allSelected = selectProps.value;
  const index = allSelected.findIndex(selected => selected.label === label);
  const isLastSelected = index === allSelected.length - 1;
  const labelSuffix = isLastSelected ? ` (${allSelected.length})` : ", ";
  const val = `${label}${labelSuffix}`;
  return val;
};

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: false,
      error: null,
      territories: [],

    };
  }

  async fetch() {
    try {
      await new Promise(res => this.setState({
        loading: true,
      }, res));
      let result = await fetch(`/api/articles/`);
      if (result.status !== 200) {
        this.setState({
          loading: false,
          error: await result.text(),
        });
        return;
      }
      let json = await result.json();
      this.setState({
        loading: false,
        error: null,
        data: json.articles,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: e,
      });
    }
  }

  componentWillMount() {
    this.fetch();
  }
  updateTerritories = territories => {
    if (this.state.loading) return;
    this.setState({ territories });
  }


  render() {


    if (this.state.error) {
      return <div>{this.state.error.toString()}</div>;
    }
    if (this.state.loading) {
      return <div>Loading</div>;
    }
    return (


      <React.Fragment>
        <div>

          <Select
            name="territories"
            id="territories"
            placeholder="Select Countries"
            onChange={this.updateTerritories}
            value={this.state.territories}
            disabled={this.state.loading}
            options={countries}
            isMulti={true}
            components={{
              MultiValueContainer: multiValueContainer
            }}


          />

        </div>

        <div>
          <Button tag={Link} to='/articles/create'>Create a new Article</Button>
        </div>

        <ul className='ArticleList'>
          {(this.state.data
            .filter(article => article.territories
              .join(' ')
              .match(new RegExp("\\b(" + this.state.territories
                .map(countries => countries.value)
                .join('|') + ")\\b", "ig")))
            .map(article =>
              <li key={article._id}>
                <div>{new Date(article.created).toLocaleDateString()}</div>
                <Link to={`/articles/${article._id}/`}>
                  <h4>{article.title}</h4>
                </Link>
                <div>{article.content}</div>
                <div>Territories: {article.territories
                  .map(countries => countries.value).join(', ')}</div>
              </li>
            ))

          }
        </ul>
      </React.Fragment>
    );
  }
}


export default List;