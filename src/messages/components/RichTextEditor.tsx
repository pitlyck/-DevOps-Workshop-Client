import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as Immutable from 'immutable';
import {
  convertToRaw,
  EditorState,
  RawDraftContentState,
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { AnnotateUserOptionContainer } from '../containers/AnnotateUserOptionContainer';
import * as Mousetrap from 'mousetrap';

export interface IRichTextEditorCallbackProps {
  readonly onSendMessage: (text: RawDraftContentState, annotatedUserIds?: Immutable.Set<Uuid>) => void;
}

export interface IRichTextEditorDataProps {
}

type RichTextEditorProps = IRichTextEditorCallbackProps & IRichTextEditorDataProps;

interface IRichTextEditorStateProps {
  readonly editorState: EditorState;
  readonly annotatedUserIds: Immutable.Set<Uuid>;
}

export class RichTextEditor extends React.PureComponent<RichTextEditorProps, IRichTextEditorStateProps> {
  static displayName = 'RichTextEditor';
  static propTypes = {
    onSendMessage: PropTypes.func.isRequired,
  };

  constructor(props: RichTextEditorProps) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      annotatedUserIds: Immutable.Set<Uuid>(),
    };
  }

  _onEditorStateChange = (editorState: EditorState) => (this.setState(() => ({ editorState })));


  _handleAnnotationChange = (userIds: Immutable.Set<Uuid>) => {
    this.setState(() => ({ annotatedUserIds: userIds }));
  };

  _handleSendText = () => {
    const contentState = this.state.editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const hasTextOrData = !!rawContent.blocks[0].text || !!rawContent.entityMap[0];
    if (hasTextOrData) {
      this.props.onSendMessage(rawContent, this.state.annotatedUserIds);
      this.setState(() => ({
        editorState: EditorState.createEmpty(),
        annotatedUserIds: Immutable.Set<Uuid>(),
      }));
    }
  };

  componentDidMount() {
    Mousetrap.bind(['ctrl+enter'], (e) => {
      e.preventDefault();
      this._handleSendText();
    });
    Mousetrap.prototype.stopCallback = () => false;
  }
  componentWillUnmount() {
    Mousetrap.unbind(['ctrl+enter']);
  }

  render() {
    const { editorState, annotatedUserIds } = this.state;
    return (
      <div className="writing-view-cont">
        <Editor
          editorState={editorState}
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'list', 'colorPicker', 'link', 'emoji', 'image'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough'],
            },
            list: {
              options: ['unordered', 'ordered'],
            }
          }}
          toolbarClassName="editor-toolbar"
          wrapperClassName="editor-wrapper"
          editorClassName="editor-input"
          onEditorStateChange={this._onEditorStateChange}
          toolbarCustomButtons={[
            <AnnotateUserOptionContainer
              onAnnotationChange={this._handleAnnotationChange}
              annotatedUserIds={annotatedUserIds}
              key="annotateUsers"
            />]}
        />
        <div className="send-btn-wrapper">
          <div
            className="send-btn-holder"
            onClick={this._handleSendText}
          >
            <div className="inside glyphicon glyphicon-send" />
          </div>
        </div>
      </div>);
  }
}
