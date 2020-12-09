
import React from 'react';
import PanelHeader from './PanelHeader';

/*
 * The Editor panel with the input textarea.
 *
 * Props:
 *   value: the value to render in the text area
 *   onChange: callback for a change in text area input
 *   isMaximised: is the Editor panel maximised
 *   onMaximise: callback for the maximise button
 */

export default function Editor(props) {
  let sectionStyle = {};
  let editorStyle = {};

  if (props.isMaximised) {
    sectionStyle = {
      width: "96%"
    };
    editorStyle = {
      height: "70vh"
    };
  }

  return (
    <section id="editor-section"
      style={sectionStyle}>
      <PanelHeader titleText="Editor"
        isMaximised={props.isMaximised}
        onMaximise={props.onMaximise} />
      <textarea id="editor"
        style={editorStyle}
        value={props.value}
        onChange={props.onChange} />
    </section>
  );
}
