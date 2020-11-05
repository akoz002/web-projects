
import React from 'react';
import Editor from './Editor';
import Preview from './Preview';

 /*
  * The top-level component which holds the state and
  * renders the other components.
  *
  * Props:
  *  initialMarkdown: the initial markdown text to display
  */

 export default class App extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       input: this.props.initialMarkdown,
       editorMaximised: false,
       previewMaximised: false
     };
     this.handleChange = this.handleChange.bind(this);
     this.handleMaximiseEditor = this.handleMaximiseEditor.bind(this);
     this.handleMaximisePreview = this.handleMaximisePreview.bind(this);
   }

   handleChange(event) {
     this.setState({
       input: event.target.value
     });
   }

   handleMaximiseEditor() {
     this.setState(state => ({
       editorMaximised: !state.editorMaximised
     }));
   }

   handleMaximisePreview() {
     this.setState(state => ({
       previewMaximised: !state.previewMaximised
     }));
   }

   render() {
     const editor = (
       <Editor value={this.state.input}
         onChange={this.handleChange}
         isMaximised={this.state.editorMaximised}
         onMaximise={this.handleMaximiseEditor} />
     );

     const preview = (
       <Preview input={this.state.input}
         isMaximised={this.state.previewMaximised}
         onMaximise={this.handleMaximisePreview} />
     );

     return (
       <div id="background">
         <main id="main">
           <header id="title">
             <h1>Markdown Previewer</h1>
             <p>Type markdown text in the editor, and it will appear in the preview panel.</p>
           </header>
           {this.state.previewMaximised ? null : editor}
           {this.state.editorMaximised ? null : preview}
         </main>
       </div>
     );
   }
 }
