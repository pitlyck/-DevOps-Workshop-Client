import styled from 'styled-components';

export const ButtonRow = styled.div`
    display: flex;
    
    button + button {
        margin-left: 4px;
    }
`;

export const FormPane = styled.div`
    padding: 8px;
`;