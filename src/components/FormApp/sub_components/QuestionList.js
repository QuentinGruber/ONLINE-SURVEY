import React from "react";
import FormItem from "./FormItem";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
class QuestionList extends React.Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    this.props.ReorderQuestion(result);
  }

  render() {
    let items;
    // display all items
    if (this.props.IsNew === "new") {
      items = this.props.items.map((item, index) => {
        return {
          id: JSON.stringify(index),
          idx: index,
          value: (
            <div key={index} className="no-transition" id="question">
              <FormItem
                key={index}
                item={item}
                index={index}
                removeOption={this.props.removeOption}
                removeItem={this.props.removeItem}
                ToogleRequireStateChange={this.props.ToogleRequireStateChange}
                handleChangeQuestionTitle={this.props.handleChangeQuestionTitle}
                HandleQuestionTypeChange={this.props.HandleQuestionTypeChange}
                HandlePremadeAnswerChange={this.props.HandlePremadeAnswerChange}
              />
            </div>
          ),
        };
      });
      return (
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={item.idx}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.value}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    } else {
      items = this.props.items.map((item, index) => {
        return (
          <div key={index} className="no-transition" id="question">
            <FormItem
              key={index}
              item={item}
              index={index}
              removeOption={this.props.removeOption}
              removeItem={this.props.removeItem}
              ToogleRequireStateChange={this.props.ToogleRequireStateChange}
              handleChangeQuestionTitle={this.props.handleChangeQuestionTitle}
              HandleQuestionTypeChange={this.props.HandleQuestionTypeChange}
              HandlePremadeAnswerChange={this.props.HandlePremadeAnswerChange}
            />
          </div>
        );
      });
      return <>{items}</>;
    }
  }
}

export default QuestionList;
