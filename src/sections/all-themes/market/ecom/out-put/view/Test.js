const home = {
    websiteLogo: {
        status: "true, false",
        position: "center , left , right",
        text: {
            value: "",
            color: "",
            backgroundColor: "",
        },
        logo: {
            url: "",
            borderColor: "",
            borderWidth: "",
            width: "",
            height: "",
            borderRaduis: "",
        }
    },
    generalIcons: { // updated
        color: "",
        border: "",
        borderRaduis: 0,
        backgroundColor: '',
    },
    fontStyle: "", // updated
    appBar: {  // updated
        app_bar: [],
        container: {
            show: true,
            boxShadow: "none, 1,2,3,4",
            backgroundColor: 'empty value',
            width: "empty value",
            height: "",
            borderBottomWidth: "",
            borderBottomColor: "",
        },
        menu: {
            menuItems: [
                {
                    name: "",
                    link: "",
                },
                {
                    name: "",
                    link: "",
                },
            ],
            style: {
                size: '18',
                color: '#2b2bd0',
                backgroundColor: "",
                hoverColor: "",
                fontStyle: "",
            }
        },

        search: {
            status: "true, false",
            icon: "image",
            position: "left , rigt, center",
            input: "true, false",
            textBg: "",
            textColor: "",
            borderColor: "",
            borderWidth: "",
            mobileView: {
                status: "true, false",
                position: "left, center",
                width: "",
                height: "",
            },
        },

        adAppBar: {
            width: "",
            height: "",
            bakgroundColor: "",
            AdText: "",
            href: "",
            textPosition: "",
            Slider: [
                {
                    text: "",
                    imageURL: "",
                    href: ""
                },
                {
                    text: "",
                    imageURL: "",
                    href: ""
                },
                {
                    text: "",
                    imageURL: "",
                    href: ""
                },
            ]
        },
        shoppingCart: "1,2,3,4",  // updated
    },
    banner: {
        paymentBox: {  // updated
            status: true,
            logo: websiteLogo,  // use website logo here
            heading: "",
            paymentMethod: ['visa', 'stripe', '...'],
            button: {
                text: "",
                raduis: "",
            }
        },

        bannerBackground: {
            status: true,
            backgroundType: "slider, image",

            image: {
                src: "https://graphicsfamily.com/wp-content/uploads/edd/2021/10/Business-Website-Banner-Design-1180x664.jpg",
                text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,",
                textStatus: true,
                style: {
                    top: "10px",
                    left: "10px",
                    fontWeight: 900,
                    color: "red",
                },
                adjustPicturePosition: "10%",
            },
            slider: [
                {
                    src: "https://graphicsfamily.com/wp-content/uploads/edd/2021/10/Business-Website-Banner-Design-1180x664.jpg",
                    text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,",
                    textStatus: true,
                    style: {
                        top: "10px",
                        left: "10px",
                        fontWeight: 900,
                        color: "red",
                    },
                },
                {
                    src: "https://graphicsfamily.com/wp-content/uploads/edd/2021/10/Business-Website-Banner-Design-1180x664.jpg",
                    text: "007",
                    textStatus: true,
                    style: {
                        top: "10px",
                        left: "10px",
                        fontWeight: 900,
                        color: "red",
                    },
                },
                {
                    src: "https://graphicsfamily.com/wp-content/uploads/edd/2021/10/Business-Website-Banner-Design-1180x664.jpg",
                    text: "Hassaan 82 007",
                    textStatus: true,
                    style: {
                        top: "10px",
                        left: "10px",
                        fontWeight: 900,
                        color: "red",
                    },
                },
            ],
        },
    },
    categories: {
        categoriesBar: {
            status: "true,false",
            backgroundColor: "",
            borderRaduis: "",
            shadow: "none,1,2,3,4"
        },
        categoriesList: {
            color: "",
            backgroundColor: "",
            hoverColor: "",
            position: "left, right, center",
            name: "",
            imgURL: "",
            imageStyle: {
                borderColor: "",
                borderWidth: "",
                width: "",
                height: "",
                borderRaduis: "",
            }
        },
        categoryView: "1,2,3,4",
    },
    videoSection: {
        src: "",
        borderRaduis: "",
        heading: "",
        description: "",
        layout: "1,2"
    },
    products: {
        gridView: "1,2,3",
        cardStyle: "1,2,3",
        imageShape: "square,circle",
        search: {
            status: "true,false",
            position: "left, right, center",
        },
        filter: {
            sortBy: "true,false",
            priceFilter: "true,false",
            sortByCategories: "true,false"
        },
        productCard: {
            addWishList: "true,false",
            showDescription: "true,false",
            showCategory: "true,false",
            showAddToCart: "true,false",
            showOffPrice: "true,false",
            showTotalPrice: "true,false",
            addWishListIconPosition: "1,2,3,4"
        }
    },
    footer: {
        backgroundColor: "",
        color: "",
        design: '1,2',
        logo: "true,false",
        showMenu: 'true,false',
        menu: [
            {
                name: "",
                link: ""
            },
            {
                name: "",
                link: ""
            },
            {
                name: "",
                link: ""
            }
        ],
        menuStyle: {
            color: "",
            backgroundColor: "",
            hoverColor: ""
        }
    },
    signup: {
        cardOpenPosition: "left,right,center",
        fullName: "true,false",
        mobileNumber: "true,false",
        birthDate: "true,false",
        gender: "true,false",
        allowSocialMediaLogins: "true,false",
        facebookLogin: "true,false",
        googleLogin: "true,false",
    }
}

// socket Response:
const socketResponse = {
    "design": {
        "_id": "65cf65b07a34677f78d0eef7",
        "type": "temporary",
        "builderId": "65cf65b07a34677f78d0eef6",
        "previewDomain": "paddeddinosaur6959-preview.overzaki.info",
        "logo": "https://overzaki.fra1.cdn.digitaloceanspaces.com/frailtwick4345.overzaki.info/image/design/1708186476541-1707227710973-1704359590310-logo-removebg (1).png",
        "cart": "empty value",
        "css": {
            "fontStyle": "empty value",
            "primaryColor": "empty value",
            "secondaryColor": "empty value",
            "buttonRadius": "empty value",
            "categoryShow": "empty value"
        },
        "layout": {
            "homePage": {
                "navbar": {
                    "sort": 1,
                    "logoPosition": "empty value"
                },
                "banner": {
                    "sort": 2,
                    "image": "empty value"
                },
                "header": {
                    "showInApp": true,
                    "sort": 3,
                    "image": "empty value",
                    "slogan": "empty value"
                },
                "category": {
                    "showInApp": true,
                    "sort": 4,
                    "rowType": "empty value"
                },
                "product": {
                    "showInApp": true,
                    "sort": 5,
                    "rowType": "empty value"
                }
            },
            "categoryPage": {
                "listView": "empty value",
                "cardStyle": "empty value",
                "cardShape": "empty value"
            },
            "productPage": {
                "imagesView": "empty value",
                "showProductDescriptionSection": true,
                "showSimilerProductSection": true,
                "showSaveToFavoriteOption": true
            },
            "productDetailsPage": {
                "productListView": "empty value",
                "showSearchBarSection": true,
                "showFilterCategorySection": true,
                "filterCategoryType": "empty value",
                "productCardShowWishList": true,
                "productCardShowDiscription": true,
                "productCardShowCategoryName": true,
                "productCardShowAddToCart": true
            },
            "signupPage": {
                "showFullName": true,
                "showMobileNumber": true,
                "showBirthDate": true,
                "showGender": true,
                "showGoogleAccountLogin": true,
                "showFacebookLogin": true,
                "showTwitterLogin": true
            }
        },
        "appBar": {
            "fontStyle": "sans",
            "_id": "65cf65b07a34677f78d0eef8",
            "appBar": {
                "position": "top",
                "_id": "65cf65b07a34677f78d0eef9",
                "container": {
                    "show": false,
                    "isShadow": false,
                    "startColor": "empty value",
                    "finalColor": "empty value",
                    "width": "empty value",
                    "height": 0,
                    "backgroundColor": "#ff33ff",
                    "backgroundColorDark": "empty value",
                    "borderBottomWidth": 12,
                    "borderBottomColor": "#78a7d4",
                    "borderBottomColorDark": "empty value",
                    "isCenterTitle": true,
                    "_id": "65cf65b07a34677f78d0eefa",
                    "containerViewStyle": {
                        "marginBottom": 0,
                        "_id": "65cf65b07a34677f78d0eefb"
                    }
                },
                "search": {
                    "status": true,
                    "input": false,
                    "icon": "empty value",
                    "position": "empty value",
                    "textBg": "empty value",
                    "textColor": "empty value",
                    "borderColor": "empty value",
                    "borderWidth": "empty value",
                    "_id": "65cf65b07a34677f78d0eefc",
                    "mobileView": {
                        "status": true,
                        "width": "empty value",
                        "height": "empty value",
                        "_id": "65cf65b07a34677f78d0eefd"
                    }
                },
                "adAppBar": {
                    "width": "empty value",
                    "height": "empty value",
                    "bakgroundColor": "empty value",
                    "AdText": "empty value",
                    "href": "empty value",
                    "textPosition": "empty value",
                    "_id": "65cf65b07a34677f78d0eefe",
                    "Slider": {
                        "text1": "empty value",
                        "text2": "empty value",
                        "text3": "empty value",
                        "_id": "65cf65b07a34677f78d0eeff"
                    }
                },
                "menu": {
                    "_id": "65cf65b07a34677f78d0ef00",
                    "menuItems": [],
                    "style": {
                        "size": "22",
                        "color": "#3e8cd6",
                        "backgroundColor": "#66ff33",
                        "hoverColor": "#9966ff",
                        "fontStyle": "empty value",
                        "_id": "65cf65b07a34677f78d0ef01"
                    }
                },
                "app_bar": []
            },
            "generalIcons": {
                "hasBackground": true,
                "isShadow": true,
                "color": "empty value",
                "backgroundColor": "empty value",
                "backgroundColorDark": "empty value",
                "borderColor": "empty value",
                "borderColorDark": "empty value",
                "tintColor": "empty value",
                "tintColorDark": "empty value",
                "startColor": "empty value",
                "finalColor": "empty value",
                "border": 1,
                "borderRaduis": 1,
                "width": 1,
                "height": 1,
                "_id": "65cf65b07a34677f78d0ef02"
            },
            "websiteLogo": {
                "status": true,
                "position": "right",
                "_id": "65cf65b07a34677f78d0ef03",
                "text": {
                    "size": "empty value",
                    "isBold": true,
                    "color": "#122a40",
                    "colorDark": "empty value",
                    "backgroundColor": "empty value",
                    "numberOfLines": 0,
                    "style": [],
                    "_id": "65cf65b07a34677f78d0ef04"
                },
                "logoObj": {
                    "status": true,
                    "text": "empty value",
                    "logo": "empty value",
                    "position": "empty value",
                    "textBg": "empty value",
                    "textColor": "empty value",
                    "borderColor": "empty value",
                    "borderWidth": "1",
                    "width": "-5",
                    "height": "empty value",
                    "_id": "65cf65b07a34677f78d0ef05"
                }
            }
        },
        "__v": 0,
        "home": {
            "slug": "home",
            "mode": "add-section",
            "sections": {
                "general": {
                    "websiteLogo": {
                        "status": true,
                        "position": "empty value",
                        "text": {
                            "size": "empty value",
                            "isBold": true,
                            "color": "empty value",
                            "colorDark": "empty value",
                            "backgroundColor": "empty value",
                            "numberOfLines": 0,
                            "style": []
                        },
                        "logoObj": {
                            "status": true,
                            "text": "empty value",
                            "logo": "empty value",
                            "position": "empty value",
                            "textBg": "empty value",
                            "textColor": "empty value",
                            "borderColor": "empty value",
                            "borderWidth": "empty value",
                            "width": "empty value",
                            "height": "empty value"
                        }
                    },
                    "generalIcons": {
                        "hasBackground": true,
                        "isShadow": true,
                        "color": "empty value",
                        "backgroundColor": "empty value",
                        "backgroundColorDark": "empty value",
                        "borderColor": "empty value",
                        "borderColorDark": "empty value",
                        "tintColor": "empty value",
                        "tintColorDark": "empty value",
                        "startColor": "empty value",
                        "finalColor": "empty value",
                        "border": 1,
                        "borderRaduis": 1,
                        "width": 1,
                        "height": 1
                    }
                },
                "appBar": {
                    "_id": "65d1d9ac8dc92afdee39a588",
                    "container": {
                        "show": true,
                        "isShadow": true,
                        "startColor": "empty value",
                        "finalColor": "empty value",
                        "width": "empty value",
                        "height": 0,
                        "backgroundColor": "0",
                        "backgroundColorDark": "empty value",
                        "borderBottomWidth": 0,
                        "borderBottomColor": "empty value",
                        "borderBottomColorDark": "empty value",
                        "isCenterTitle": true,
                        "_id": "65d1d9ac8dc92afdee39a589",
                        "containerViewStyle": {
                            "marginBottom": 0,
                            "_id": "65d1d9ac8dc92afdee39a58a"
                        }
                    },
                    "search": {
                        "status": true,
                        "input": true,
                        "icon": "empty value",
                        "position": "empty value",
                        "textBg": "empty value",
                        "textColor": "empty value",
                        "borderColor": "empty value",
                        "borderWidth": "empty value",
                        "_id": "65d1d9ac8dc92afdee39a58b",
                        "mobileView": {
                            "status": true,
                            "width": "empty value",
                            "height": "empty value",
                            "_id": "65d1d9ac8dc92afdee39a58c"
                        }
                    },
                    "adAppBar": {
                        "width": "empty value",
                        "height": "empty value",
                        "bakgroundColor": "empty value",
                        "AdText": "empty value",
                        "href": "empty value",
                        "textPosition": "empty value",
                        "_id": "65d1d9ac8dc92afdee39a58d",
                        "Slider": {
                            "text1": "empty value",
                            "text2": "empty value",
                            "text3": "empty value",
                            "_id": "65d1d9ac8dc92afdee39a58e"
                        }
                    },
                    "menu": {
                        "_id": "65d1d9ac8dc92afdee39a58f",
                        "menuItems": [],
                        "style": {
                            "size": "empty value",
                            "color": "empty value",
                            "backgroundColor": "empty value",
                            "hoverColor": "empty value",
                            "fontStyle": "empty value",
                            "_id": "65d1d9ac8dc92afdee39a590"
                        }
                    },
                    "app_bar": []
                },
                "banner": {
                    "position": "empty value",
                    "paymentBox": {
                        "status": true,
                        "logo": "empty value",
                        "heading": "empty value",
                        "paymentMethodStatus": "empty value",
                        "PaymentMethoed": "empty value",
                        "paymentMethod": [],
                        "button": {
                            "raduis": "empty valye",
                            "text": "empty valye"
                        }
                    },
                    "container": {
                        "show": true,
                        "isShadow": true,
                        "startColor": "empty value",
                        "finalColor": "empty value",
                        "width": "empty value",
                        "height": 0,
                        "backgroundColor": "0",
                        "backgroundColorDark": "empty value",
                        "borderBottomWidth": 0,
                        "borderBottomColor": "empty value",
                        "borderBottomColorDark": "empty value",
                        "isCenterTitle": true,
                        "_id": "65d1d9ac8dc92afdee39a591",
                        "containerViewStyle": {
                            "marginBottom": 0,
                            "_id": "65d1d9ac8dc92afdee39a592"
                        }
                    },
                    "bannerTitle": {
                        "show": true,
                        "isBold": true,
                        "colorDark": "empty valye",
                        "color": "empty valye",
                        "text": "empty valye",
                        "size": 0
                    },
                    "bannerBackground": {
                        "status": true,
                        "backgroundType": "empty valye",
                        "image": {
                            "src": "empty valye",
                            "text": "empty valye",
                            "adjustPicturePosition": "empty valye",
                            "textStatus": true,
                            "zIndex": 0,
                            "width": 0,
                            "height": 0,
                            "style": {
                                "top": "empty valye",
                                "color": "empty valye",
                                "left": "empty valye",
                                "textposition": "empty valye",
                                "fontWeight": 0,
                                "size": 0
                            }
                        }
                    },
                    "slider": [
                        {
                            "type": "empty valye",
                            "src": "empty valye",
                            "text": "empty valye",
                            "textStatus": true,
                            "style": {
                                "top": "empty valye",
                                "color": "empty valye",
                                "left": "empty valye",
                                "textposition": "empty valye",
                                "fontWeight": 0,
                                "size": 0
                            }
                        }
                    ]
                }
            }
        }
    }

}