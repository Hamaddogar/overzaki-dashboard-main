//Category

const category = {
  numberOfColumns: 2,
  header: true,
  title: true,
  viewAll: true,
  scrollType: 'flex | grid',
  typeItem: 'flex | block | absolute ',
  layoutStyling: {
    boxShadow: 'none',
    borderRadius: '0%',
    borderWidth: '0px',
    border: '',
    backgroundColor: 'transparent',
    image: {
      display: 'block',
      minWidth: '70px',
      height: '70px',
      margin: '0px',
    },
    content: {
      display: '',
    },
    contentTitle: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 800,
      color: 'black',
    },
    contentSubtitle: {
      display: 'none',
      fontSize: '10px',
      fontWeight: 300,
      color: 'black',
    },
    contentItemsNumber: {
      display: 'none',
      fontSize: '10px',
      fontWeight: 300,
      color: 'black',
    },
  },
};

// Brand

const brand = {
  numberOfColumns: 2,
  header: true,
  title: true,
  viewAll: true,
  scrollType: 'flex | grid',
  typeItem: 'flex | block | absolute ',
  brandCardStyling: {
    boxShadow: 'none',
    borderRadius: '0%',
    borderWidth: '0px',
    border: '',
    backgroundColor: 'transparent',
    image: {
      display: 'block',
      minWidth: '130px',
      height: '',
      margin: '0px',
    },
    content: {
      display: '',
    },
    contentTitle: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 800,
      color: 'black',
    },
    contentSubtitle: {
      display: 'none',
      fontSize: '10px',
      fontWeight: 300,
      color: 'black',
    },
    contentItemsNumber: {
      display: 'none',
      fontSize: '10px',
      fontWeight: 300,
      color: 'black',
    },
  },
};

// Video

const video = {
  display: 'none',
  title: {
    display: 'none',
  },
  videoStyling: {
    boxShadow: 'none',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    borderRadius: '0%',
    borderWidth: '0px',
    border: '',
    width: '100%',
    height: '100%',
  },
};

// Product
const product = {
  header: true,
  title: true,
  viewAll: true,
  scrollType: 'flex | grid',
  numberOfColumns: 2,
  styleStyling: {
    display: 'block',
    boxShadow: 'none',
    borderRadius: '0%',
    borderWidth: '0px',
    borderColor: 'transparent',
  },
  styleImageStyling: {
    display: 'block',
    borderRadius: '0%',
    borderWidth: '0px',
    borderColor: 'transparent',
    margin: '0px',
  },
  styleWishlistStyling: {
    display: 'block',
    position: 'absolute',
    top: '5px',
    right: '5px',
    backgroundColor: 'white',
  },
  layoutContentStyling: {
    isContent: true,
    title: {
      display: 'block',
      fontSize: '15px',
      fontWeight: 800,
      lineClamp: 1,
      color: 'black',
    },
    category: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 800,
      color: 'gray',
    },
    brand: {
      display: 'none',
      fontSize: '12px',
      fontWeight: 800,
      color: 'black',
    },
    stock: {
      display: 'none',
      color: 'white',
      backgroundColor: 'black',
    },
    outOfStock: {
      display: 'none',
      color: 'white',
      backgroundColor: 'black',
    },
    rating: {
      display: 'flex',
      backgroundColorFilled: 'black',
      backgroundColorEmpty: '#a2a2a2',
      fiveStar: true,
      textValue: {
        display: 'block',
        fontSize: '10px',
        fontWeight: 800,
        color: 'black',
      },
    },
    typeItem: {
      display: 'block',
    },
  },
};
