import styled from 'styled-components';

export const ItemPane = styled.div`
    border-radius: 2px;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.2);
    margin-left: 1px;
    overflow: hidden;
    
    & + & {
        margin-top: 8px;
    }
    
    &:first-of-type.bar-item-enter + & {
        margin-top: 0;
    }
    
    &.bar-item-enter {
        display: none;
    }
    
    &.edited-item-enter {
        height: 40px;
    }
    
    &.edited-item-enter.edited-item-enter-active {
       height: 234px;
       transition: height 250ms ease-in;
    }
    
    &.edited-item-exit {
        height: 234px;
    }
    
    &.edited-item-exit.edited-item-exit-active {
        height: 40px;
        transition: height 150ms ease-in;
    }
    
    &.new-item-enter {
        opacity: 0.1;
    }
    
    &.new-item-enter.new-item-enter-active {
       opacity: 1;
       transition: opacity 350ms ease-in;
    }
    
    &.new-item-exit {
        height: 234px;
    }
    
    &.new-item-exit.new-item-exit-active {
        height: 40px;
        transition: height 150ms ease-in;
    }
`;