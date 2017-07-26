import React from 'react';
import { Link } from 'react-router-dom';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: ""
    };
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  hits() {
    let results = [];

    const { questions } = this.props;
    if (this.state.searchParams) {
      questions.forEach( question => {
        if (question.title.toLowerCase().includes(this.state.searchParams.toLowerCase())) {
          results.push(question);
        }
      });
    }

    if (results) {
      let mappedResults = results.map((question, idx) => {
        return ( <li className="search-results" key={idx}>
        <Link to={`/api/questions/${question.id}`}> { question.title }</Link>
      </li>);
    });
    return mappedResults;
  } else {
    return false;
  }
  }

  // formatResults(){
  //   let results = this.hits()
  //   if (results) {
  //     let formatted = results.map((question, index) => {
  //       return (
  //         <li key={index} className="search-object"><Link  to={`/question/${question.id}`}  >{question.question}</Link></li>
  //       );
  //     });
  //     return formatted;
  //   } else {
  //     return (false);
  //   }
  // }

  parseResults(){
    if (this.hits().length === 0) {
      return (
        <div></div>
      );
    } else {
      return (
        <div className="results">
          <ul>{this.hits()}</ul>
        </div>
      );
    }
  }



  render(){
      return (
        <div className="search-container">
          <div className="outer">
            <div className="search-bar">
              <input type="text" placeholder="Search All Questions" className="search-form"
                onChange={this.update('searchParams')} value={this.searchParams}></input>
              <input type="submit" value="Search" className="submit"></input>
            </div>
          </div>
          <div>
            {this.parseResults()}
          </div>
        </div>
      );
  }
}
export default SearchForm;
