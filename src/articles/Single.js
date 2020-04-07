import React, { Component } from 'react';
import {
  Link,
} from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';
import Select from 'react-select';
const countries = [
  { value: 'France', label: 'France' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Spain', label: 'Spain' },
];

class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      title: '',
      content: '',
      territories: [],
      error: null,
      errors: {},
    };
  }

  updateTitle(ev) {
    if (this.state.loading) return;
    this.setState({
      title: ev.target.value,
    });
  }

  updateContent(ev) {
    if (this.state.loading) return;
    this.setState({
      content: ev.target.value,
    });
  }
  updateTerritories = territories => {
    if (this.state.loading) return;
    this.setState({ territories });
  }

  async fetch(id) {
    if (!id) {
      id = this.props.match.params.articleId;
    }
    try {
      await new Promise(res => this.setState({
        loading: true,
      }, res));
      let result = await fetch(`/api/articles/${id}/`);
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
        id: json.article._id,
        title: json.article.title,
        content: json.article.content,
        territories: json.article.territories,

      });
    } catch (e) {
      this.setState({
        loading: false,
        error: e,
      });
    }
  }

  submit() {
    this.setState({
      loading: true,
    }, async () => {
      let result = await fetch(`/api/articles/${this.state.id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: this.state.title,
          content: this.state.content,
          territories: this.state.territories,
        }),
      });
      if (result.status !== 200) {
        this.setState({
          loading: false,
          error: await result.text(),
        });
        return;
      }
      let json = await result.json();
      if (json.success) {
        this.props.history.push('/');
      } else {
        this.setState({
          loading: false,
          errors: json.errors,
        });
      }
    });
  }


  componentWillMount() {
    this.fetch();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.articleId !== newProps.match.params.articleId) {
      this.fetch(newProps.match.params.articleId);
    }
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error.toString()}</div>;
    }
    return (
      <div>
        <h1>All fields are required</h1>
        <Form>
          <FormGroup row>
            <Label for="title" sm={2}>Title</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                sm={10}
                onChange={e => this.updateTitle(e)}
                value={this.state.title}
                disabled={this.state.loading}
                invalid={this.state.errors.title} />
              {
                this.state.errors.title ?
                  <FormFeedback>{this.state.errors.title.message}</FormFeedback>
                  : ''}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="content" sm={2}>Content</Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="content"
                id="content"
                placeholder="Article Content"
                onChange={e => this.updateContent(e)}
                value={this.state.content}
                disabled={this.state.loading} 
                invalid={this.state.errors.content} />
                {
                  this.state.errors.content ?
                    <FormFeedback>{this.state.errors.content.message}</FormFeedback>
                    : ''}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="territories" sm={2}>Territories</Label>
            <Col sm={10}>
              <Select
                name="territories"
                id="territories"
                placeholder="territories"
                sm={10}
                options={countries}
                isMulti={true}
                onChange={this.updateTerritories}
                value={this.state.territories}
                disabled={this.state.loading}
                />

            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button onClick={() => this.submit()} disabled={this.state.loading}>Submit</Button>
              <Button tag={Link} to='/' disabled={this.state.loading}>Cancel</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Single;
