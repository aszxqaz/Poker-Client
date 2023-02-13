export const mobileDrawerMenyOverlay = {
  '@media screen and (max-width: 768px)': {
    position: 'fixed',
    inset: 0,
    zIndex: 1,
    bgColor: 'rgb(0 0 0 / 30%)',
    transition: '0.2s opacity ease-out',
  },
}

export const mobileDrawerContainer = {
  '@media screen and (max-width: 768px)': {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '1rem',
  },
}

export const openMenuMobile = {
  '@media screen and (max-width: 768px)': {
    display: 'flex',
    borderRadius: '1rem',

    fontSize: '1.5rem',
    p: '1.2rem',
  },
}

export const mainScreenMobile = {
  '@media screen and (max-width: 768px)': {
    display: 'block',
    fontSize: '1.5rem',
    p: '1.2rem',
  },
}

export const mobileDrawerMenu = (isOpen: boolean) => ({
  '@media screen and (max-width: 768px)': {
    position: 'fixed',
    zIndex: 1,
    display: 'block',
    inset: 0,
    width: '80%',
    height: '100%',
    // flexDirection: 'column',
    // justifyItems: 'center',
    pt: '2rem',
    backgroundColor: 'var(--chakra-colors-chakra-body-bg)',
    transition: '0.2s ease-out',
    transform: `translateX(${isOpen ? '0' : '-100%'})`
  },
})

export const avatarBalanceMobile = {
  '@media screen and (max-width: 768px)': {
    justifyContent: 'center',
    mb: '2rem',
  },
}

export const menulistMobile = {
  '@media screen and (max-width: 768px)': {
    gridTemplateColumns: '1fr',
    alignItems: 'center',
    fontSize: '1.25em',
    gap: '2.5em',
    w: '15em',
    margin: 'auto'
  },
}

export const menuTabMobile = {
}
