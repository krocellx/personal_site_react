import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

import ImageSearch from './ImageSearch';

// Page tests often need to isolate the component from real network calls.
// jest.mock('axios') replaces axios.get/post/delete with fake functions that
// each test can control.
jest.mock('axios');

// Toasts are useful in the real app, but they are not the behavior under test
// here. This mock keeps tests focused on page behavior and avoids rendering
// notification UI.
jest.mock('react-toastify', () => ({
  ToastContainer: () => null,
  toast: {
    success: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  },
}));

// Reusable API-shaped data. Tests can override one or two fields without
// repeating the whole Unsplash/Mongo image object every time.
const buildImage = (overrides = {}) => ({
  id: 'image-1',
  title: 'sunset',
  description: 'Orange sky',
  alt_description: 'Sunset over hills',
  saved: false,
  urls: {
    small: 'https://example.com/sunset.jpg',
  },
  user: {
    name: 'Jane Photographer',
    portfolio_url: 'https://example.com/jane',
  },
  ...overrides,
});

describe('ImageSearch page', () => {
  beforeEach(() => {
    // Each test should start with clean mock call history and mock responses.
    // Without this, one test can accidentally affect the next test.
    jest.clearAllMocks();
  });

  test('loads and renders saved images', async () => {
    // The first axios.get call happens inside useEffect when the page loads.
    // mockResolvedValueOnce makes that call behave like a successful API result.
    axios.get.mockResolvedValueOnce({ data: [buildImage()] });

    render(<ImageSearch />);

    // findBy... waits for async UI changes. Use it when the component updates
    // after a promise resolves, such as data loading from an API.
    expect(await screen.findByText('SUNSET')).toBeInTheDocument();
    expect(screen.getByText('Orange sky')).toBeInTheDocument();

    // This confirms the page requested the expected endpoint.
    expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5050/api/images');
  });

  test('searches for a new image and renders it', async () => {
    // This test has two GET calls:
    // 1. load existing saved images on mount, returning empty data
    // 2. search for a new image after the user submits the form
    axios.get
      .mockResolvedValueOnce({ data: [] })
      .mockResolvedValueOnce({
        data: buildImage({
          id: 'image-2',
          title: undefined,
          description: 'Forest path',
        }),
      });

    render(<ImageSearch />);

    // Wait until initial loading is done and the search input is available.
    await screen.findByPlaceholderText('Search for new image...');

    // Simulate the real workflow: type a search word, then click Search.
    userEvent.type(screen.getByPlaceholderText('Search for new image...'), 'forest');
    userEvent.click(screen.getByRole('button', { name: 'Search' }));

    // The returned image has no title, so the page adds the typed word as title.
    // Seeing FOREST proves the user action changed the rendered list.
    expect(await screen.findByText('FOREST')).toBeInTheDocument();
    expect(screen.getByText('Forest path')).toBeInTheDocument();

    // The last GET should be the search request, not the initial load request.
    expect(axios.get).toHaveBeenLastCalledWith(
      'http://127.0.0.1:5050/api/new-image?query=forest'
    );
  });

  test('deletes an image after the API confirms deletion', async () => {
    // Start with one saved image, then make the delete endpoint confirm that
    // the same image id was deleted.
    axios.get.mockResolvedValueOnce({ data: [buildImage()] });
    axios.delete.mockResolvedValueOnce({ data: { deleted_id: 'image-1' } });

    render(<ImageSearch />);

    expect(await screen.findByText('SUNSET')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: 'Delete' }));

    // waitFor retries the assertion until it passes or times out. Use it when
    // a click triggers async state updates.
    await waitFor(() => {
      expect(screen.queryByText('SUNSET')).not.toBeInTheDocument();
    });

    expect(axios.delete).toHaveBeenCalledWith(
      'http://127.0.0.1:5050/api/images/image-1'
    );
  });
});
