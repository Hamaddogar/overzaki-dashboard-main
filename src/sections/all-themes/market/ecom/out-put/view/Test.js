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