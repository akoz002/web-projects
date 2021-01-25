
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
  let screenReaderText = <div className="screen-reader-only">maximize</div>;

  if (props.isMaximised) {
    buttonIcon = <i className="fas fa-window-minimize"></i>;
    screenReaderText = <div className="screen-reader-only">minimize</div>;
  }

  return (
    <header className="section-header">
      <h2>{props.titleText}</h2>
      <button className="max-button"
        onClick={props.onMaximise}>
        {buttonIcon}
        {screenReaderText}
      </button>
    </header>
  );
}
