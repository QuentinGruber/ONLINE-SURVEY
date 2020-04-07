import React from 'react';
import { Button } from 'reactstrap'

class SaveTodoList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Button onClick={this.props.save}>Save</Button>
    )
  }
}

export default SaveTodoList;