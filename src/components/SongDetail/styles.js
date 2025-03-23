import styled from "styled-components";
import { Link } from "react-router-dom";

const SongDetailContainer = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  color: #333;
  text-align: center;
`;

const SongDetailTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #2c3e50;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SongDetailInfo = styled.div`
  p {
    font-size: 18px;
    margin: 10px 0;
    line-height: 1.5;
    color: #34495e;
  }
`;

const SongDetailLabel = styled.span`
  font-weight: bold;
  color: #2c3e50;
`;

const SongDetailLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  font-size: 16px;

  &:hover {
    background-color: #2980b9;
  }
`;

const SongDetailMessage = styled.h2`
  font-size: 18px;
  margin: 20px 0;
  color: #e74c3c;
  font-weight: bold;
`;

export {
  SongDetailContainer,
  SongDetailTitle,
  SongDetailInfo,
  SongDetailLabel,
  SongDetailLink,
  SongDetailMessage,
};
