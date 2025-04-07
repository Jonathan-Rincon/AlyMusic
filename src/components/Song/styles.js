import styled from "styled-components";
import { Link } from "react-router-dom";

const SongCard = styled.div`
  background: #ffffff;
  border: 1px solid #0000001a;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px #0000001a;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  font-family: "Arial", sans-serif;
  color: #2c3e50;
  text-align: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const SongCardTitle = styled.h2`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #34495e;
`;

const SongCardInfo = styled.div`
  font-size: 16px;
  margin: 5px 0;
  line-height: 1.6;

  p {
    margin: 5px 0;
  }
`;

const SongCardLabel = styled.span`
  font-weight: bold;
  color: #2c3e50;
`;

const SongCardActions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SongCardButton = styled.button`
  padding: 10px 15px;
  background: #3498db;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #2980b9;
    transform: scale(1.05);
  }
`;

const SongCardLink = styled(Link)`
  color: #2c3e50;
  font-size: 14px;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
  }
`;
const SongDuration = styled.span`
  color: ${(props) => (props.$isLong ? "red" : "inherit")};
  font-weight: ${(props) => (props.$isLong ? "bold" : "normal")};
`;

export { 
  SongCard, 
  SongCardTitle, 
  SongCardInfo, 
  SongCardLabel, 
  SongCardActions, 
  SongCardButton, 
  SongCardLink,
  SongDuration 
};
