import { render, screen } from '@testing-library/react';

import { CropList } from './CropList';

describe('CropList', () => {
  const mockCrops = [
    {
      id: 1,
      name: 'Tomatoes',
      attributes: {
        type: 'continuous_harvest' as const,
        daysToMaturity: 75,
        quantityPerHarvest: 10,
        seedVendor: 'Seed Co',
        seedsPerLinearFeet: 5,
        plantsPerLinearFeet: 3,
        daysBetweenHarvests: 7,
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: null,
      deletedAt: null,
    },
    {
      id: 2,
      name: 'Carrots',
      attributes: {
        type: 'harvest_once' as const,
        daysToMaturity: 60,
        quantityPerHarvest: 20,
        seedVendor: 'Garden Seeds',
        seedsPerLinearFeet: 8,
        plantsPerLinearFeet: 6,
      },
      createdAt: '2024-01-02T00:00:00Z',
      updatedAt: null,
      deletedAt: null,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state when no crops provided', () => {
    render(<CropList crops={[]} />);

    expect(
      screen.getByText(
        'No crops found. Create your first crop to get started!',
      ),
    ).toBeInTheDocument();
  });

  it('renders crops table when crops are provided', () => {
    render(<CropList crops={mockCrops} />);

    // Check table headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Days to Maturity')).toBeInTheDocument();
    expect(screen.getByText('Quantity per Harvest')).toBeInTheDocument();
    expect(screen.getByText('Seed Vendor')).toBeInTheDocument();
    expect(screen.getByText('Seeds per Linear Feet')).toBeInTheDocument();
    expect(screen.getByText('Plants per Linear Feet')).toBeInTheDocument();
    expect(screen.getByText('Days Between Harvests')).toBeInTheDocument();

    // Check crop data
    expect(screen.getByText('Tomatoes')).toBeInTheDocument();
    expect(screen.getByText('Carrots')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('60')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('Seed Co')).toBeInTheDocument();
    expect(screen.getByText('Garden Seeds')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
  });

  it('shows correct badge for continuous harvest crops', () => {
    render(<CropList crops={mockCrops} />);

    const continuousBadge = screen.getByText('Continuous');
    expect(continuousBadge).toBeInTheDocument();
    expect(continuousBadge).toHaveClass('bg-primary');
  });

  it('shows correct badge for harvest once crops', () => {
    render(<CropList crops={mockCrops} />);

    const harvestOnceBadge = screen.getByText('Harvest Once');
    expect(harvestOnceBadge).toBeInTheDocument();
    expect(harvestOnceBadge).toHaveClass('bg-secondary');
  });

  it('shows days between harvests for continuous harvest crops', () => {
    render(<CropList crops={mockCrops} />);

    // Should show the days between harvests value for continuous harvest crops
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  it('shows dash for days between harvests for harvest once crops', () => {
    render(<CropList crops={mockCrops} />);

    // Should show dash for harvest once crops
    const dashElements = screen.getAllByText('-');
    expect(dashElements.length).toBeGreaterThan(0);
  });

  it('renders table with correct structure', () => {
    render(<CropList crops={mockCrops} />);

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Check table has header and body
    const tableRowGroups = screen.getAllByRole('rowgroup');
    expect(tableRowGroups).toHaveLength(2); // thead and tbody
  });
});
