import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar Component", () => {
  it("El input de búsqueda se renderiza correctamente", () => {
    render(<SearchBar onSearch={jest.fn()} onReset={jest.fn()} />);
    const inputElement = screen.getByLabelText(/Nombre del artista:/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("El usuario puede escribir en el input y el valor cambia", () => {
    render(<SearchBar onSearch={jest.fn()} onReset={jest.fn()} />);
    const inputElement = screen.getByLabelText(/Nombre del artista:/i);
    fireEvent.change(inputElement, { target: { value: "coldplay" } });
    expect(inputElement.value).toBe("coldplay");
  });

  it("La función de búsqueda se ejecuta al hacer clic en el botón 'Buscar'", () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} onReset={jest.fn()} />);
    const inputElement = screen.getByLabelText(/Nombre del artista:/i);
    const searchButton = screen.getByText(/Buscar/i);
    fireEvent.change(inputElement, { target: { value: "coldplay" } });
    fireEvent.click(searchButton);
    expect(mockSearch).toHaveBeenCalledWith("coldplay");
  });

  it("La función de búsqueda se ejecuta al presionar 'Enter'", () => {
    const mockSearch = jest.fn();
    render(<SearchBar onSearch={mockSearch} onReset={jest.fn()} />);
    const inputElement = screen.getByLabelText(/Nombre del artista:/i);
    fireEvent.change(inputElement, { target: { value: "coldplay" } });
    fireEvent.submit(inputElement);
    expect(mockSearch).toHaveBeenCalledWith("coldplay");
  });

  it("La función de reinicio se ejecuta al hacer clic en el botón 'Reiniciar'", () => {
    const mockReset = jest.fn();
    render(<SearchBar onSearch={jest.fn()} onReset={mockReset} />);
    const resetButton = screen.getByText(/Reiniciar/i);
    fireEvent.click(resetButton);
    expect(mockReset).toHaveBeenCalled();
  });
});