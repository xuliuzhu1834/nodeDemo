import React from 'react';
import { render } from 'react-dom';

class List extends React.Component {
  componentWillMount() {

  }
  render() {
    return (
      <form action="http://127.0.0.1:9000/begin" method="GET">
        <input type="submit" value="爬一下" />
      </form>
    )
  }
}
render(<List/>, document.getElementById('container'));
