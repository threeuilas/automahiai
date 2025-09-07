import { render, screen } from '@testing-library/react';
import { FarmList } from './FarmList';
import '@testing-library/jest-dom';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock the FarmItem component
jest.mock('./FarmItem', () => ({
  FarmItem: jest.fn(({ farm }) => (
    <div data-testid={`farm-item-${farm.id}`}>{farm.name}</div>
  )),
}));

describe('FarmList', () => {
  const mockFarms = [
    {
      id: 1,
      name: 'Test Farm 1',
      description: 'A test farm',
      createdAt: new Date('2024-01-15T10:30:00Z'),
    },
    {
      id: 2,
      name: 'Test Farm 2',
      description: 'Another test farm',
      createdAt: new Date('2024-01-20T14:45:00Z'),
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state when no farms provided', () => {
    render(<FarmList farms={[]} />);

    expect(screen.getByText('No farms yet')).toBeInTheDocument();
    expect(
      screen.getByText(/You haven't created any farms yet/),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Create Your First Farm' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/farms/new');
  });

  it('renders farm items when farms are provided', () => {
    render(<FarmList farms={mockFarms} />);

    expect(screen.getByTestId('farm-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('farm-item-2')).toBeInTheDocument();
    expect(screen.getByText('Test Farm 1')).toBeInTheDocument();
    expect(screen.getByText('Test Farm 2')).toBeInTheDocument();
  });
});
