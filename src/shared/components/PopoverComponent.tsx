import * as React from 'react';
import * as PropTypes from 'prop-types';
import {Popover} from 'react-bootstrap';

export interface PopoverClickRootCloseProps {
  readonly title: string;
  readonly id: Uuid;
  readonly children?: JSX.Element;
}

export const PopoverComponent: React.SFC<PopoverClickRootCloseProps> = ({
  title,
  id,
  children,
 }) => (
  <Popover
    id={id}
    title={title}
  > {children}
  </Popover>
);

PopoverComponent.displayName = 'PopoverComponent';
PopoverComponent.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
  children: PropTypes.any,
};
