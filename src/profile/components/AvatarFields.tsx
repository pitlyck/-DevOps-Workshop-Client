import * as React from 'react';
import * as PropTypes from 'prop-types';
import { IUser } from '../models/User';
import { Spinner } from '../../shared/components/Spinner';

export interface IAvatarFieldsDataProps {
  readonly user: IUser;
  readonly isUploadingFile: boolean;
}

export interface IAvatarFieldsCallbackProps {
  readonly onUploadFile: (data: FormData) => void;
}

type AvatarFieldsProps = IAvatarFieldsDataProps & IAvatarFieldsCallbackProps;

interface IAvatarFieldsState {
  readonly avatarFile: File | null;
  readonly temporaryFileURL: string;
}

export class AvatarFields extends React.Component<AvatarFieldsProps, IAvatarFieldsState> {
  static displayName = 'AvatarFields';

  static propTypes = {
    user: PropTypes.object.isRequired,
    onUploadFile: PropTypes.func.isRequired,
  };

  constructor(props: AvatarFieldsProps) {
    super(props);
    this.state = {
      avatarFile: null,
      temporaryFileURL: '',
     };
  }

  _handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const avatarFile = event.target.files.length > 0 ? event.target.files[0] : null;
      URL.revokeObjectURL(this.state.temporaryFileURL);
      const temporaryFileURL = avatarFile ? URL.createObjectURL(avatarFile) : '';
      this.setState(() => ({ avatarFile, temporaryFileURL }));
    }
  };

  _handleUplaod = () => {
    if (this.state.avatarFile) {
      const data = new FormData();
      data.append('Files', this.state.avatarFile);
      this.props.onUploadFile(data);
    }
  };

  render() {
    return (
      <form className="account-details user-profile-block">
        <div className="form-group">
          <input
            onChange={this._handleChange}
            name="profileView-file"
            id="profileView-file"
            type="file"
            accept="image/*"
            className="form-control"
          />
        </div>
        {this.state.avatarFile ? <img src={this.state.temporaryFileURL} width="100" className="mini-avatar"/> : null}
        <button
          disabled={this.state.avatarFile === null}
          className="btn btn-primary btn-block"
          type="button"
          onClick={this._handleUplaod}
          > Submit
        </button>
        {this.props.isUploadingFile ? <Spinner/> : null}
      </form>
    );
  }
}
