export const scrollbarSx = {
  '::-webkit-scrollbar': {
    width: '0.7em',
    cursor: 'pointer',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: 'hsl(220, 26%, 20%)',
    cursor: 'pointer',
  },
  '::-webkit-scrollbar-thumb': {
    cursor: 'pointer',
    backgroundColor: 'gray.600',
  },
  '::-webkit-scrollbar-thumb:hover': {
    transform: 'scale(2)',
    scale: 2,
  },
}
