import ImportDataERP from '../components/ImportDataERP';
import { render, screen ,toBeVisible } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//import toBeVisible from '@testing-library/jest-dom';
import axios from "axios";

describe('ImportDataERP', () => {
    it('should render without crashing', () => {
        render(<ImportDataERP />);
    });

    it('should render a button with text "Continuar"', () => {
        render(<ImportDataERP />);
        const button = screen.getByRole('button' , { name : "Continuar" });
        expect(button).toBeDefined()
    });

    it('should render a combo box', () => {
        render(<ImportDataERP />);
        const comboBox = screen.getByRole('combobox' , { name : "Categoria" });
        expect(comboBox).toBeDefined()
    });

    it("should render a title", () => {
        render(<ImportDataERP />);
        const title = screen.getByText("Importar Data ERP");
        expect(title).toBeVisible();
    });

    it("should render a click button with text Cargar", () => {
        render(<ImportDataERP />);
        const button = screen.getByRole('button', { name : "Cargar" });
        userEvent.click(button);
        expect(button).toBeDefined()
    });

});





