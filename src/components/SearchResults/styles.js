import styled from "styled-components";

const SearchResultsContainer = styled.div`
  margin: 20px;
  padding: 10px;
  background: linear-gradient(135deg, #e6f7ffe6, #c6ffe5e6);
  border-radius: 12px;
  box-shadow: 0 4px 10px #0000001a;
  font-family: "Arial", sans-serif;
  color: #2c3e50;
`;

const SearchResultsTitle = styled.h2`
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  color: #34495e;
  letter-spacing: 1px;
`;

const SearchResultsChildren = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const SearchResultsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
  padding: 10px;
`;
const SongDuration = styled.span`
  color: ${(props) => (props.isLong ? "red" : "inherit")};
  font-weight: ${(props) => (props.isLong ? "bold" : "normal")};
`;

export {
  SearchResultsContainer,
  SearchResultsTitle,
  SearchResultsChildren,
  SearchResultsList,
  SongDuration
};
