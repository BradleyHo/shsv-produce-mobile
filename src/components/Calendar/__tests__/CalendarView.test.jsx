import { render, screen } from '@testing-library/react';
import CalendarView from '../CalendarView';

describe('CalendarView', () => {
  it('renders without crashing', () => {
    render(<CalendarView language="en" />);
    expect(screen.getByText(/January/i)).toBeInTheDocument();
  });

  it('switches language correctly', () => {
    render(<CalendarView language="es" />);
    expect(screen.getByText(/Enero/i)).toBeInTheDocument();
  });
});