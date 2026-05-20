import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ImageCard from './ImageCard';

// Small test-data builders make tests easier to read. Each test can use the
// default image, or override only the fields it cares about.
const buildImage = (overrides = {}) => ({
  id: 'image-1',
  title: 'forest',
  description: 'Green forest',
  alt_description: 'Trees',
  saved: false,
  urls: {
    small: 'https://example.com/forest.jpg',
  },
  user: {
    name: 'Jane Photographer',
    portfolio_url: 'https://example.com/jane',
  },
  ...overrides,
});

describe('ImageCard', () => {
  test('renders image details and author link', () => {
    // jest.fn() creates a fake function. The callbacks are required props, but
    // this test only cares about rendered content, not whether callbacks run.
    render(
      <ImageCard image={buildImage()} deleteImage={jest.fn()} saveImage={jest.fn()} />
    );

    // Prefer queries by visible text or accessibility role. They match how a
    // user experiences the component and are less brittle than CSS selectors.
    expect(screen.getByText('FOREST')).toBeInTheDocument();
    expect(screen.getByText('Green forest')).toBeInTheDocument();

    // getByRole('img') finds the rendered card image. This checks that the
    // component passes the API image URL into the browser image element.
    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://example.com/forest.jpg'
    );

    // The author name should be a link when the image includes a portfolio URL.
    expect(screen.getByRole('link', { name: 'Jane Photographer' })).toHaveAttribute(
      'href',
      'https://example.com/jane'
    );
  });

  test('calls handlers with the image id', () => {
    const deleteImage = jest.fn();
    const saveImage = jest.fn();

    // This test focuses on behavior: clicking Save/Delete should tell the
    // parent page which image id was selected.
    render(
      <ImageCard
        image={buildImage()}
        deleteImage={deleteImage}
        saveImage={saveImage}
      />
    );

    // userEvent simulates real user actions more closely than calling props
    // directly. The user sees buttons, so the test clicks buttons.
    userEvent.click(screen.getByRole('button', { name: 'Save' }));
    userEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(saveImage).toHaveBeenCalledWith('image-1');
    expect(deleteImage).toHaveBeenCalledWith('image-1');
  });

  test('hides save button for saved images', () => {
    // This covers conditional rendering: saved images should not show Save
    // again, but Delete should still be available.
    render(
      <ImageCard
        image={buildImage({ saved: true })}
        deleteImage={jest.fn()}
        saveImage={jest.fn()}
      />
    );

    // queryByRole returns null when nothing is found, which is ideal when
    // asserting that something should not exist.
    expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });
});
