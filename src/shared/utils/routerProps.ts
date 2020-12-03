import { RouteComponentProps } from 'react-router';
import * as PropTypes from 'prop-types';

export const withRouterPropTypes: PropTypesShape<RouteComponentProps<{}>> = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  staticContext: PropTypes.object,
};
