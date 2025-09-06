import { render, screen } from '@testing-library/react';
import { FarmList } from './FarmList';
import { FarmItem } from './FarmItem';
import '@testing-library/jest-dom';

// Mock the FarmItem component
jest.mock('./FarmItem', () => ({
  FarmItem: jest.fn(({ farm }) => (
    <div data-testid={`farm-item-${farm.id}`}>{farm.name}</div>
  )),
}));

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

const mockFarmItem = jest.mocked(FarmItem);

describe('FarmList', () => {
  const mockFarms = [
    {
      id: 1,
      name: 'Test Farm 1',
      createdAt: new Date('2024-01-15T10:30:00Z'),
    },
    {
      id: 2,
      name: 'Test Farm 2',
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
    expect(screen.getByRole('link')).toHaveAttribute('href', '/farm/new');
  });

  it('renders farm items when farms are provided', () => {
    render(<FarmList farms={mockFarms} />);

    expect(screen.getByTestId('farm-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('farm-item-2')).toBeInTheDocument();
    expect(screen.getByText('Test Farm 1')).toBeInTheDocument();
    expect(screen.getByText('Test Farm 2')).toBeInTheDocument();
  });

  it('passes correct props to FarmItem components', () => {
    render(<FarmList farms={mockFarms} />);

    expect(mockFarmItem).toHaveBeenCalledTimes(2);
    expect(mockFarmItem).toHaveBeenNthCalledWith(1, { farm: mockFarms[0] }, {});
    expect(mockFarmItem).toHaveBeenNthCalledWith(2, { farm: mockFarms[1] }, {});
  });
});
