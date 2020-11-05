
import React from 'react';

/*
 * The Panel Header at the top of each section.
 *
 * Props:
 *   titleText: the text in the title of the panel
 *   isMaximised: is the panel maximised
 *   onMaximise: callback for the maximise button
 */

export default function PanelHeader(props) {
  let buttonIcon = <i className="fas fa-window-maximize"></i>;
  if (props.isMaximised) {
    buttonIcon = <i className="fas fa-window-minimize"></i>;
  }

  return (
    <header className="section-header">
      <h2>{props.titleText}</h2>
      <button className="max-button"
        onClick={props.onMaximise}>
        {buttonIcon}
      </button>
    </header>
  );
}
