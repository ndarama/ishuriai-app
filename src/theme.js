import { extendTheme } from '@chakra-ui/react';

// Custom theme for the Ishuri clone.  The original Ishuri site uses a
// combination of deep blues and emerald greens.  Here we define a custom
// colour palette under the `brand` key that can be referenced
// throughout the application.  Feel free to adjust these values to suit
// your own branding.
const colors = {
  brand: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a'
  },
  // Additional complementary blue tones used in the gradient backgrounds
  blueGradient: {
    500: '#1e3a8a',
    600: '#1e40af',
    700: '#1e429f'
  }
};

const theme = extendTheme({
  colors,
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif'
  }
});

export default theme;