/*
 * freeCodeCamp Front End Libraries Certification
 * Project 2: Markdown Previewer
 * Alex Kozlov, 2020
 *
 * A simple React app that previews markdown text as it is typed 
 * into the editor. Consists of a single stateful component and a 
 * couple of stateless functional child components.
 */

/* 
     * The Panel Header at the top of each section.
     *
     * Props:
     *   titleText: the text in the title of the panel
     *   isMaximised: is the panel maximised
     *   onMaximise: callback for the maximise button   
     */

function PanelHeader(props) {
  let buttonIcon = React.createElement("i", { className: "fas fa-window-maximize" });
  if (props.isMaximised) {
    buttonIcon = React.createElement("i", { className: "fas fa-window-minimize" });
  }

  return (
    React.createElement("header", { className: "section-header" },
    React.createElement("h2", null, props.titleText),
    React.createElement("button", { className: "max-button",
      onClick: props.onMaximise },
    buttonIcon)));



}

/*
   * The Editor panel with the input textarea.
   *
   * Props:
   *   value: the value to render in the text area
   *   onChange: callback for a change in text area input
   *   isMaximised: is the Editor panel maximised
   *   onMaximise: callback for the maximise button
   */

function Editor(props) {
  let sectionStyle = {};
  let editorStyle = {};

  if (props.isMaximised) {
    sectionStyle = {
      width: "80vw" };

    editorStyle = {
      height: "75vh" };

  }

  return (
    React.createElement("section", { id: "editor-section",
      style: sectionStyle },
    React.createElement(PanelHeader, { titleText: "Editor",
      isMaximised: props.isMaximised,
      onMaximise: props.onMaximise }),
    React.createElement("textarea", { id: "editor",
      style: editorStyle,
      value: props.value,
      onChange: props.onChange })));


}

/*
   * The Preview panel which displays the parsed markdown.
   *
   * Props:
   *   input: the markdown input to parse
   *   isMaximised: is the Preview panel maximised
   *   onMaximise: callback for the maximise button
   */

function Preview(props) {
  let sectionStyle = {};

  if (props.isMaximised) {
    sectionStyle = {
      width: "80vw",
      marginTop: 0 };

  }

  return (
    React.createElement("section", { id: "preview-section",
      style: sectionStyle },
    React.createElement(PanelHeader, { titleText: "Preview",
      isMaximised: props.isMaximised,
      onMaximise: props.onMaximise }),
    React.createElement("div", { id: "preview",
      dangerouslySetInnerHTML: {
        __html: marked(props.input, {
          gfm: true, breaks: true }) } })));




}

/* 
   * The top-level component which holds the state and 
   * renders the other components.
   * 
   * Props:
   *  initialMarkdown: the initial markdown text to display
   */

class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.initialMarkdown,
      editorMaximised: false,
      previewMaximised: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleMaximiseEditor = this.handleMaximiseEditor.bind(this);
    this.handleMaximisePreview = this.handleMaximisePreview.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value });

  }

  handleMaximiseEditor() {
    this.setState(state => ({
      editorMaximised: !state.editorMaximised }));

  }

  handleMaximisePreview() {
    this.setState(state => ({
      previewMaximised: !state.previewMaximised }));

  }

  render() {
    const editor =
    React.createElement(Editor, { value: this.state.input,
      onChange: this.handleChange,
      isMaximised: this.state.editorMaximised,
      onMaximise: this.handleMaximiseEditor });


    const preview =
    React.createElement(Preview, { input: this.state.input,
      isMaximised: this.state.previewMaximised,
      onMaximise: this.handleMaximisePreview });


    return (
      React.createElement("div", { id: "background" },
      React.createElement("main", { id: "main" },
      React.createElement("header", { id: "title" },
      React.createElement("h1", null, "Markdown Previewer"),
      React.createElement("p", null, "Type markdown text in the editor, and it will appear in the preview panel.")),

      this.state.previewMaximised ? null : editor,
      this.state.editorMaximised ? null : preview)));



  }}


/*
      * Create some initial markdown and render the MarkdownPreviewer.
      */

const initialMarkdown = `
# Level 1 Heading
## Level 2 Heading
### Level 3 Heading
  
Inline code: \`<section></section>\`

Multi-line code:

\`\`\`
 // this is multi-line code:

 function anotherExample(firstLine, lastLine) {
   if (firstLine == '...' && lastLine == '...') {
     return multiLineCode;
   }
 }
\`\`\`
  
Text formatting: **bold**, _italic_, **_both_**, ~~crossed out~~

This is a [Link](https://www.freecodecamp.com).

> This is a Block Quote.

Table Header | Second Header | Third Header
------------ | ------------- | ------------- 
Data (1,1)   | Data (1,2)    | Data (1,3)
Data (2,1)   | Data (2,2)    | Data (2,3)

- Bulleted list.
  - Indent level 1.
    - Indent level 2.
      - Indent level 3.

1. Numbered list.
2. Numbered item 2. 
3. Numbered item 3.

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

ReactDOM.render(
React.createElement(MarkdownPreviewer, {
  initialMarkdown: initialMarkdown }),
document.getElementById('root'));