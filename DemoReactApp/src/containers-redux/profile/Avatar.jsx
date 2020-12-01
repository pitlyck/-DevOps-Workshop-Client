import { connect } from 'react-redux';
import { Avatar as AvatarComponent } from '../../components/profile/Avatar.jsx';
import { AvatarLoader } from '../../components/profile/AvatarLoader.jsx';
import { withOverlay } from '../../components/shared/withOverlay.jsx';
import { uploadUserAvatar } from '../../actions/profile/uploadUserAvatar';

const mapStateToProps = (state) => ({
    uri: state.profile.avatarUri,
    isUploading: state.profile.isUploadingAvatar,
});

const mapDispatchToProps = (dispatch) => ({
    onUpload: (files) => dispatch(uploadUserAvatar(files[0]))
});

const AvatarWithOverlay = withOverlay(AvatarComponent, AvatarLoader);
const enhancer = connect(mapStateToProps, mapDispatchToProps);
const connectedComponent = enhancer(AvatarWithOverlay);

export { connectedComponent as Avatar };