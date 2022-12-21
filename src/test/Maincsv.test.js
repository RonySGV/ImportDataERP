import Maincsv from '../components/maincsv';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import toBeVisible from '@testing-library/jest-dom';

describe('Maincsv', () => {
    it('should render without crashing', () => {
        render(<Maincsv />);
    });

    it('should render a button with text "Descargar"', () => {
        render(<Maincsv />);
        const button = screen.getByRole('button' , { name : "Descargar" });
        expect(button).toBeDefined()
    });

    it('should render a button with text "Guardar"', () => {
        render(<Maincsv />);
        const button = screen.getByRole('button' , { name : "Guardar" });
        expect(button).toBeDefined()
    });

    it('should render a button with text "Cargar"', () => {
        render(<Maincsv />);
        const button = screen.getByRole('button', { name : "Cargar" });
        expect(button).toBeDefined()
    });

    it('should render a combo box', () => {
        render(<Maincsv />);
        const comboBox = screen.getByRole('combobox' , { name : "Tipo" });
        
        expect(comboBox).toBeDefined()
    });

    it('should render a table', () => {
        render(<Maincsv />);
        const table = screen.getByRole('table');
        expect(table).toBeDefined()
    });

    it("should render a title", () => {
        render(<Maincsv />);
        const title = screen.getByText("CSV");
        expect(title).toBeVisible();
    });

    it("should render a click button with text Cargar", () => {
        render(<Maincsv />);
        const button = screen.getByRole('button', { name : "Cargar" });
        userEvent.click(button);
        expect(button).toBeDefined()
    });

});





