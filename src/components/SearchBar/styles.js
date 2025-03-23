import styled from "styled-components";

const SearchBarContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 10px 20px;
  background: #f7f9fc;
  border: 1px solid #0000001a;
  border-radius: 8px;
  box-shadow: 0 2px 6px #0000001a;
  font-family: "Arial", sans-serif;
`;

const SearchBarForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
`;

const SearchBarLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #2c3e50;
  margin-right: 10px;
`;

const SearchBarInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #00000033;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  max-width: 450px;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 6px #3498db66;
  }
`;

const SearchBarButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: bold;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #2980b9;
    transform: scale(1.05);
  }
`;

export { 
  SearchBarContainer, 
  SearchBarForm, 
  SearchBarLabel, 
  SearchBarInput, 
  SearchBarButton 
};
