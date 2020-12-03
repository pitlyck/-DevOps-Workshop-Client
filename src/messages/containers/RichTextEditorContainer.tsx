import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as Immutable from 'immutable';
import {
  IRichTextEditorCallbackProps,
  RichTextEditor
} from '../components/RichTextEditor';
import { postMessageRequest } from '../actionCreators/requests/postMessage';
import { RawDraftContentState } from 'draft-js';

const mapDispatchToProps = (dispatch: Dispatch): IRichTextEditorCallbackProps => ({
  onSendMessage: (text: RawDraftContentState, annotatedUsers?: Immutable.Set<Uuid>) => dispatch(postMessageRequest(text, annotatedUsers)),
});

export const RichTextEditorContainer = connect(null, mapDispatchToProps)(RichTextEditor);
