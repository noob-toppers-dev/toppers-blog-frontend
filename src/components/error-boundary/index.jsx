import React from 'react';
import styled from 'styled-components';

const ErrorText = styled.div`
  color: ${({ isactive }) => (isactive === 'true' ? 'crimson' : 'black')};
  font-size: 14px;
  margin: -10px 0px 10px;
`;


function ErrorBoundary({ error, status, children }) {


    if (status) {
        return (
            <ErrorText isactive={status.toString()}>
                {error}
            </ErrorText>
        );
    }

    return children;
}

export default ErrorBoundary;
