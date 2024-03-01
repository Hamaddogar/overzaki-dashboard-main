export const sections = [
  {
    websiteLogo: {
      status: false,
      position: 'left',
      text: '',
      backgroundColor: 'transparent',
      textColor: 'black',
      textBg: 'transparent',
      logo: 'https://overzaki.fra1.cdn.digitaloceanspaces.com/robustidiot5576.overzaki.info/image/design/1707763191248-desktop-wallpaper-cobra-logo-computer-cobra-commander-computer.jpg',
      borderColor: '',
      borderWidth: '',
      width: '40px',
      height: '40px',
      borderRadius: '10%',
    },
    generalIcons: {
      color: 'black',
      border: '1px solid',
      padding: '6px', //updated
      borderRadius: '8px',
      backgroundColor: 'transparent',
      backgroundColorDark: '#000000',
      width: '40px',
      height: '40px',
      isShadow: true,
      borderColor: 'black',
      borderColorDark: '#000000',
      hasBackground: true,
    },
    fontStyle: '',
    appBar: {
      app_bar: [],
      container: {
        show: true,

        backgroundColor: 'white',
        width: '100%',
        height: '80px',
        isShadow: true,
        borderBottomWidth: 0,
        borderBottomColor: '#F5F5F8',
        borderBottomColorDark: '#F5F5F8',
        isCenterTitle: false,
        containerViewStyle: {
          marginBottom: 20,
        },
      },
      menu: {
        status: false,
        menuItems: [
          {
            name: 'Hassaan',
            link: '',
          },
          {
            name: 'AHmed',
            link: '',
          },
        ],
        style: {
          size: '18',
          color: '#2b2bd0',
          backgroundColor: 'red',
          hoverColor: 'black',
          fontStyle: '',
        },
      },
      search: {
        status: false,
        icon: 'image',
        position: 'left',
        input: false,
        textBg: '',
        textColor: 'black',
        borderColor: 'black',
        borderWidth: 2,
        mobileView: {
          status: 'true',
          position: 'left',
          width: '',
          height: '',
        },
      },
      adAppBar: {
        status: true,
        width: '100%',
        height: '50px',
        backgroundColor: 'white',
        textPosition: 'center',
        Slider: [],
      },
    },

    banner: {
      paymentBox: {
        // updated
        status: true,
        logo: 'websiteLogo', // use website logo here
        heading: 'Fatayer Ala Al Tayer',
        paymentMethod: [
          '/knet.png',
          '/visa.png',
          '/spay.png',
          '/apple-pay.png',
          '/google-pay.png',
          '/cash-on-delivery.png',
        ],
        button: {
          text: 'Pickup',
          radius: '0px',
        },
        container: {
          borderRadius: '',
          borderColor: '#DBDBDB',
          borderWidth: 0,
          backgroundColor: '#FFFFFF',
          backgroundColorDark: '#000000',
          isShadow: true,
          startColor: '#00000020',
          finalColor: '#00000000',
          colorShadow: '#000000',
          paddingY: '10px',
          paddingX: '70px',
          marginTop: '80px',
          marginBottom: '90px',
        },
      },

      //New Hassaan
      bannerBackground: {
        status: true,
        backgroundType: 'slider',
        image: {
          src: 'https://graphicsfamily.com/wp-content/uploads/edd/2021/10/Business-Website-Banner-Design-1180x664.jpg',
          text: '',
          textStatus: true,
          zIndex: 2,
          width: '200',
          height: 100,
          style: {
            top: '10px',
            left: '10px',
            fontWeight: '900',
            color: 'red',
          },
          adjustPicturePosition: '10%',
        },
        sliderType: '',
        slider: [
          // {
          //   src: 'https://graphicsfamily.com/wp-content/uploads/edd/2021/10/Business-Website-Banner-Design-1180x664.jpg',
          //   text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,',
          //   textStatus: true,
          //   style: {
          //     top: '20px',
          //     left: '20px',
          //     fontWeight: '900',
          //     color: 'blue',
          //   },
          // },
          // {
          //   src: 'https://graphicsfamily.com/wp-content/uploads/edd/2021/10/Business-Website-Banner-Design-1180x664.jpg',
          //   text: 'HassaanA',
          //   textStatus: true,
          //   style: {
          //     top: '20px',
          //     left: '20px',
          //     fontWeight: '900',
          //     color: 'blue',
          //   },
          // },
          // {
          //   src: 'https://graphicsfamily.com/wp-content/uploads/edd/2021/10/Business-Website-Banner-Design-1180x664.jpg',
          //   text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,',
          //   textStatus: true,
          //   style: {
          //     top: '20px',
          //     left: '20px',
          //     fontWeight: '900',
          //     color: 'blue',
          //   },
          // },
        ],
      },
    },
    categories: {
      categoriesBar: {
        status: 'true,false',
        backgroundColor: '',
        borderRadius: '',
        shadow: 'none,1,2,3,4',
        isShadow: false,
        borderColor: null,
        startColor: '#00000020',
        finalColor: '#00000000',
        colorShadow: '#000000',
        paddingHorizontal: 20,
        paddingVertical: 0,
        marginHorizontal: 0,
        marginVertical: 0,
        paddingBottom: 0,
        marginBottom: 0,
      },
      categoriesList: {
        isList: true,
        type_list: {
          type: 'horizontal',
          number_column: 4,
          number_row: 1,
          gapVertical: 10,
          gapHorizontal: 40,
          rowGap: 15,
          columnGap: 15,
        },
        list: [
          {
            name: '',
            isName: 'true',
            isImgShow: 'true',
            imgURL: '',
            imageStyle: {
              borderColor: '',
              borderWidth: '',
              width: '',
              height: '',
              borderRadius: '',
            },
          },
        ],
        color: '',
        backgroundColor: '',
        hoverColor: '',
        position: 'left,right,center',
      },
      categoryView: '1,2,3,4',
    },
    productCard: {
      cardStyle: '1,2,3',
      gridView: '1,2,3',

      search: {
        status: 'true,false',
        position: 'left, right, center',
      },
      filter: {
        sortBy: 'true,false',
        priceFilter: 'true,false',
        sortByCategories: 'true,false',
        sortByTopTrending: 'true ,false',
        sortByProductDiscount: 'true,false',
        sortBybrand: 'true,false',
      },
      wishlist: {
        show: true,
        container: {
          show: true,
          position: 'absolute',
          zIndex: 100,
          top: 10,
          bottom: null,
          left: null,
          right: 10,
          width: 33,
          height: 33,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: '#FFFFFF',
          backgroundColorDark: '#000000',
          paddingHorizontal: 5,
          paddingVertical: 5,
        },
        image: {
          imageShape: 'square,circle',
          width: '100%',
          height: '100%',
          imageActive: {
            uri: 'https://cdn-icons-png.flaticon.com/128/9146/9146846.png',
          },
          imageInactive: {
            uri: 'https://cdn-icons-png.flaticon.com/128/9146/9146846.png',
          },
          colorActive: '#FF0000',
          colorInactive: '#000000',
          resizeMode: 'contain',
        },
      },
      price: {
        show: true,
        size: 12,
        isBold: true,
        color: '#000000',
        colorDark: '#FFFFFF',
        style: [],
      },
      price_discount: {
        show: true,
        size: 12,
        isBold: false,
        color: '#A2A2A2',
        colorDark: '#FFFFFF',
        textDecorationLine: 'line-through',
        style: [],
      },
      currency: {
        currencyName: '$,Pkr...',
        show: true,
        size: 10,
        isBold: false,
        color: '#000000',
        colorDark: '#FFFFFF',
        style: [],
      },
      currency_discount: {
        show: true,
        size: 12,
        isBold: false,
        color: '#A2A2A2',
        colorDark: '#FFFFFF',
        textDecorationLine: 'line-through',
        style: [],
      },
      in_stock: {
        show: true,
        container: {
          show: false,
          isCenter: false,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: '#0D6EFD',
          backgroundColorDark: '#FFFFFF',
          paddingHorizontal: 10,
          paddingVertical: 2,
        },
        text: {
          show: true,
          size: 10,
          isBold: true,
          isTextCenter: false,
          color: '#FFFFFF',
          colorDark: '#FFFFFF',
          numberOfLines: 1,
        },
      },
      out_of_stock: {
        show: true,
        container: {
          show: false,
          isCenter: false,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: '#000000',
          backgroundColorDark: '#FFFFFF',
          paddingHorizontal: 10,
          paddingVertical: 2,
        },
        text: {
          show: true,
          size: 10,
          isBold: true,
          isTextCenter: false,
          color: '#FFFFFF',
          colorDark: '#FFFFFF',
          numberOfLines: 1,
        },
      },
      rating: {
        show: false,
        container: {
          show: true,
          isWrap: true,
          isRowCenter: true,
        },
        rating: {
          show: true,
          imageSize: 12,
          ratingColor: '#0D6EFD',
          ratingColorDark: '#0D6EFD',
          ratingBackgroundColor: '#A2A2A2',
          ratingBackgroundColorDark: '#FFFFFF',
        },
        text: {
          show: true,
          size: 10,
          isBold: true,
          isTextCenter: false,
          color: '#0D6EFD',
          colorDark: '#0D6EFD',
          numberOfLines: 1,
          ellipsizeMode: 'tail',
        },
      },
      button_cart: {
        id: 12,
        type: 'quantity',
        position: 'center',
        section_theme: {
          show: false,
          content: {
            marginTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
        item_theme: {
          container: {
            isRow: true,
            isSpaceBetween: true,
          },
          containerTitle: {
            show: false,
            isFlex: true,
          },
          title: {
            show: false,
            size: 14,
            isBold: true,
            isTextCenter: false,
            color: '#212226',
            colorDark: '#FFFFFF',
            numberOfLines: 1,
            ellipsizeMode: 'tail',
            translation: 'product',
            value: 'Quantity',
          },
          subTitle: {
            show: false,
            size: 14,
            isBold: false,
            isTextCenter: false,
            color: '#212226',
            colorDark: '#FFFFFF',
            numberOfLines: 1,
            ellipsizeMode: 'tail',
            translation: 'product',
            value: 'Items in the stock',
          },
          button_cart: {
            show: true,
            container: {
              isFlex: true,
              isRow: true,
              isSpaceBetween: true,
              show: true,
              isCenter: true,
              isShadow: false,
              distance: 8,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomRightRadius: 12,
              borderBottomLeftRadius: 12,
              backgroundColor: null,
              backgroundColorDark: null,
              paddingHorizontal: 4,
              paddingVertical: 2,
              borderRadius: null,
              borderWidth: 0,
              borderColor: '#0D6EFD',
              borderColorDark: '#0D6EFD',
            },
            button: {
              isCenter: true,
              height: 36,
              backgroundColor: '#0D6EFD',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#0D6EFD',
              borderColorDark: '#000000',
            },
            text: {
              show: true,
              size: 18,
              isBold: true,
              isTextCenter: true,
              color: '#000000',
              colorDark: '#FFFFFF',
              ellipsizeMode: 'tail',
              numberOfLines: 1,
            },
            icon_minus: {
              show: true,
              resizeMode: 'contain',
              source: {
                uri: 'https://i.imgur.com/IXmlSVV.png',
              },
              width: '50%',
              height: '50%',
              tintColor: '#FFFFFF',
              tintColorDark: '#FFFFFF',
            },
            icon_plus: {
              show: true,
              resizeMode: 'contain',
              source: {
                uri: 'https://i.imgur.com/r5zxAXa.png',
              },
              width: '50%',
              height: '50%',
              tintColor: '#FFFFFF',
              tintColorDark: '#FFFFFF',
            },
          },
          button_add_to_cart: {
            container: {
              isShadow: false,
              distance: 8,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomRightRadius: 12,
              borderBottomLeftRadius: 12,
              backgroundColor: null,
              backgroundColorDark: null,
              paddingHorizontal: 4,
              paddingVertical: 2,
              borderRadius: null,
            },
            button: {
              width: '100%',
              height: 36,
              backgroundColor: '#0D6EFD',
              backgroundColorDark: '#0D6EFD',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#0D6EFD',
              borderColorDark: '#000000',
            },
            text: {
              show: true,
              size: 12,
              isBold: true,
              color: '#FFFFFF',
              colorDark: '#FFFFFF',
              translation: 'product',
              value: 'Add to cart',
            },
            icon: {
              show: false,
              resizeMode: 'contain',
              source: {
                uri: 'https://i.imgur.com/r5zxAXa.png',
              },
              width: 12,
              height: 12,
              tintColor: '#FFFFFF',
              tintColorDark: '#FFFFFF',
              marginHorizontal: 5,
            },
          },
          button_out_of_stock: {
            container: {
              isShadow: false,
              distance: 8,
              borderTopRightRadius: 12,
              borderTopLeftRadius: 12,
              borderBottomRightRadius: 12,
              borderBottomLeftRadius: 12,
              backgroundColor: null,
              backgroundColorDark: null,
              paddingHorizontal: 4,
              paddingVertical: 2,
              borderRadius: null,
            },
            button: {
              width: '100%',
              height: 36,
              backgroundColor: '#000000',
              backgroundColorDark: '#000000',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#000000',
              borderColorDark: '#000000',
            },
            text: {
              show: true,
              size: 12,
              isBold: true,
              color: '#FFFFFF',
              colorDark: '#FFFFFF',
              translation: 'product',
              value: 'Out Of Stock',
            },
            icon: {
              show: false,
              resizeMode: 'contain',
              source: {
                uri: 'https://i.imgur.com/r5zxAXa.png',
              },
              width: 12,
              height: 12,
              tintColor: '#FFFFFF',
              tintColorDark: '#FFFFFF',
              marginHorizontal: 5,
            },
          },
        },
      },
    },
    footer: {
      backgroundColor: '',
      color: '',
      design: '1,2',
      logo: 'true,false',
      showMenu: 'true,false',
      menu: [
        {
          name: '',
          link: '',
        },
        {
          name: '',
          link: '',
        },
        {
          name: '',
          link: '',
        },
      ],
      menuStyle: {
        color: '',
        backgroundColor: '',
        hoverColor: '',
      },
    },
    signup: {
      cardOpenPosition: 'left,right,center',
      fullName: 'true,false',
      mobileNumber: 'true,false',
      birthDate: 'true,false',
      gender: 'true,false',
      allowSocialMediaLogins: 'true,false',
      facebookLogin: 'true,false',
      googleLogin: 'true,false',
    },
  },
];
