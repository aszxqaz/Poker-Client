export const Button = {
  baseStyle: {
    minWidth: '10rem',
    _focus: {
      outline: 'none',
    },
    // '-webkit-tap-highlight-color': 'transparent',
    webkitTapHighlightColor: 'transparent',
  },
  defaultProps: {
    size: 'lg',
  },
  sizes: {
    lg: {
      minWidth: '100rem !important',
      fontSize: '1.25rem',
      px: '3rem',
      py: '1.7rem',
    },
  },
}

export const Input = {
  defaultProps: {
    size: 'lg',
  },
}

export const FormErrorMessage = {
  baseStyle: {
    marginTop: '0',
  },
}

export const Link = {
  baseStyle: {
    color: 'green.400',
  },
}

export const Tab = {
  baseStyle: {
    color: 'gray.100 !important',
  },
}

export const Text = {
  baseStyle: {
    fontSize: '2vh',
  },
}
