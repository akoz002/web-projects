
import React from 'react';
import PanelHeader from './PanelHeader';
import marked from 'marked';

/*
 * The Preview panel which displays the parsed markdown.
 *
 * Props:
 *   input: the markdown input to parse
 *   isMaximised: is the Preview panel maximised
 *   onMaximise: callback for the maximise button
 */

export default function Preview(props) {
  let sectionStyle = {};

  if (props.isMaximised) {
    sectionStyle = {
      marginTop: '1.5em'
    };
  }

  return (
    <section id="preview-section"
      style={sectionStyle}>
      <PanelHeader titleText="Preview"
        isMaximised={props.isMaximised}
        onMaximise={props.onMaximise} />
      <div id="preview"
        dangerouslySetInnerHTML={{
          __html: marked(props.input, {
            gfm: true, breaks: true
          })
        }} />
    </section>
  );
}
