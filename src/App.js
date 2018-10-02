import React, { Component } from 'react';
import './App.css';
import './assets/images/bg.png';
import searchImg from './assets/images/pokesearch.png'

class App extends Component {
  constructor() {
    super();
    this.state = {
      visible: true,
      value: '',
      filtered: [],
      selected: null,
      index: 0,
      options: [
        { text: "Dragon Ball" },
        { text: "Pokemon" },
        { text: "Rick and Morty" },
        { text: "Fate" },
        { text: "Fullmetal Alchemist" },
        { text: "Shiki" },
      ]
    };

    this.filterOptions = this.filterOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.select = this.select.bind(this);
    this.showSuggestions= this.showSuggestions.bind(this);
    this.hideSuggestions= this.hideSuggestions.bind(this);
  }

  componentDidMount() {
    this.filterOptions();
  }

  showSuggestions() {
    this.setState({
      visible: true
    });
  }

  hideSuggestions() {
    this.setState({
      visible: false
    });
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
      index: 0
    }, this.filterOptions);
  }

  select(obj) {
    const selected = obj;
    this.setState({
      selected: selected,
      value: selected.text,
      index: 0
    }, this.filterOptions)

  }

  handleMouseDown(obj) {
    this.select(obj);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13 && this.state.filtered.length > 0) {
      this.select(this.state.filtered[this.state.index]);
    } else if (e.keyCode === 38 && this.state.index > 0) {
      e.preventDefault();
      this.setState({
        index: this.state.index - 1
      });
    } else if (e.keyCode == 40 && this.state.index < this.state.filtered.length - 1) {
      e.preventDefault();
      this.setState({
        index: this.state.index + 1
      });
    }
  }

  handleHover(index) {
    this.setState({
      index: index
    });
  }

  filterOptions() {
    if (this.state.value.length <= 0) {
      this.setState({
        filtered: []
      })
      return
    }

    const filtered = this.state.options.filter(
      obj => obj.text
      .toLowerCase()
      .indexOf(this.state.value.toLowerCase()) >= 0
    );

    this.setState({
      filtered: filtered
    });
  }

  render() {
    return (

      <div className="App">
        <div className="header">
          <img src={searchImg}/>
        </div>
        <div className="AutoComplete">
          <input type="text"
            placeholder="type to search..."
            value={this.state.value}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.hideSuggestions}
            onFocus={this.showSuggestions} />
          {this.state.visible &&
            <div>
              <ul className="Suggestions">
                {this.state.filtered.map((obj, index) =>
                  <li className={index === this.state.index ? 'active' : ''}
                    key={obj.text}
                    onMouseOver={() => this.handleHover(index)}
                    onMouseDown={() => this.handleMouseDown(obj)}>
                    {obj.text}
                  </li>
                )}
              </ul>
            </div>
          }
        </div>
        {this.state.selected &&
          <h2>You Selected: {this.state.selected.text}</h2>
        }
      </div>
    );
  }
}

export default App;
