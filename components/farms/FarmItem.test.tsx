import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { FarmItem } from './FarmItem';
import { useDeleteFarm } from './useDeleteFarm';
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the useDeleteFarm hook
jest.mock('./useDeleteFarm', () => ({
  useDeleteFarm: jest.fn(),
}));

const mockUseRouter = jest.mocked(useRouter);
const mockUseDeleteFarm = jest.mocked(useDeleteFarm);

describe('FarmItem', () => {
  const mockFarm = {
    id: 1,
    name: 'Test Farm',
    description: 'A test farm',
    createdAt: new Date('2024-01-15T10:30:00Z'),
  };

  const mockRouter = {
    refresh: jest.fn(),
  };

  const mockHandleDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue(
      mockRouter as unknown as ReturnType<typeof useRouter>,
    );
    mockUseDeleteFarm.mockReturnValue({
      isDeleting: false,
      handleDelete: mockHandleDelete,
    });
  });

  it('renders farm information and delete button correctly', () => {
    render(<FarmItem farm={mockFarm} />);

    // Check farm name
    expect(screen.getByText('Test Farm')).toBeInTheDocument();

    // Check creation date
    expect(screen.getByText(/Created:/)).toBeInTheDocument();
    expect(screen.getByText(/1\/15\/2024/)).toBeInTheDocument();

    // Check delete button
    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveClass('ml-2');
    expect(deleteButton.querySelector('svg')).toBeInTheDocument();
  });

  it('calls handleDelete when delete button is clicked', () => {
    render(<FarmItem farm={mockFarm} />);
    const deleteButton = screen.getByRole('button');

    fireEvent.click(deleteButton);
    expect(mockHandleDelete).toHaveBeenCalledTimes(1);
  });

  it('disables delete button when isDeleting is true', () => {
    mockUseDeleteFarm.mockReturnValue({
      isDeleting: true,
      handleDelete: mockHandleDelete,
    });

    render(<FarmItem farm={mockFarm} />);
    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeDisabled();
  });

  it('passes correct props to useDeleteFarm hook', () => {
    render(<FarmItem farm={mockFarm} />);
    expect(mockUseDeleteFarm).toHaveBeenCalledWith({
      farmId: mockFarm.id,
    });
  });
});
