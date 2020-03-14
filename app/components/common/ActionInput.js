import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'semantic-ui-react';

import LabelDescription from './LabelDescription';

export default class ActionInput extends Component {
  static propTypes = {
    showLabelDescription: PropTypes.bool,
    name: PropTypes.string,
    label: PropTypes.string,
    description: PropTypes.node,
    error: PropTypes.bool,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    useFormInput: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    handlerParams: PropTypes.arrayOf(PropTypes.any),
    showButton: PropTypes.bool,
    inputType: PropTypes.string,
    readOnly: PropTypes.bool,
    minMax: PropTypes.object,
  };

  static defaultProps = {
    name: undefined,
    value: undefined,
    handlerParams: [],
    label: null,
    error: false,
    useFormInput: false,
    defaultValue: undefined,
    description: "Description",
    showLabelDescription: true,
    showButton: true,
    inputType: "text",
    readOnly: true,
    minMax: undefined,
    onChange: () => {},
    onClick: () => {},
  };

  clickHandler = () => {
    // This will take the handlerParams params and pass them to the onClick function
    this.props.onClick(...this.props.handlerParams);
  };

  changeHandler = (event, data) => {
    this.props.onChange(event, data, this.props.handlerParams);
  };

  render() {
    const actionButton = (
      <Button icon="upload" color="blue" onClick={this.clickHandler} />
    );

    const innerInput = (
      <input type={this.props.inputType} value={this.props.value} readOnly={this.props.readOnly} />
    );

    const inputProps = {
      name: this.props.name,
      label: this.props.showLabelDescription ? undefined : this.props.label,
      fluid: true,
      error: this.props.error,
      action: this.props.showButton ? actionButton : undefined,
      input: innerInput,
      defaultValue: this.props.defaultValue,
      min: this.props.minMax && this.props.minMax.min !== undefined ? this.props.minMax.min : undefined,
      max: this.props.minMax && this.props.minMax.max !== undefined ? this.props.minMax.max : undefined,
      onChange: this.changeHandler,
    };

    let result = this.props.useFormInput ? <Form.Input {...inputProps} /> : <Input {...inputProps} />;

    if (this.props.showLabelDescription) {
      result = (
        <div>
          <LabelDescription
            label={this.props.label}
            description={this.props.description}
          />
          {result}
        </div>
      );
    }

    return result;
  }
}
