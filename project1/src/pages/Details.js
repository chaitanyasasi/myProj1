import React from "react";
import queryString from "query-string";
import Axios from "axios";
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '../Style/Details.css'
const BASE_URL = process.env.REACT_APP_BASE_URL;


const customStyles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.8)"
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class DetailsPage extends React.Component {

    constructor() {
        super();
        this.state = {
            restaurant: [],
            restId: undefined,
            galleryModal: false,
            menuModal: false,
            menuItems: [],
            formModal: false
        }
    }

    componentDidMount() {
        const q = queryString.parse(window.location.search);
        console.log(q)
        const { restaurant } = q;


        Axios({
            url: `${BASE_URL}/restaurant/${restaurant}`,
            method: 'get',
            headers: { 'Content-Type': 'application/JSON' }
        }).then(res => {
            this.setState({ restaurant: res.data.RestaurantById, restId: restaurant })
            
        }).catch((err => console.log(err)));


    }

    handleModal = (state, value) => {
        const { restId } = this.state;
        // const {restaurant}=this.state
        // console.log(state)
        // console.log(restaurant)

        if (state === "menuModal" && value === true) {

            Axios({
                url: `${BASE_URL}/menu/${restId}`,
                method: 'get',
                headers: { 'Content-Type': 'application/JSON' }
            }).then(res => {
                this.setState({ menuItems: res.data.menu })
            }).catch((err => console.log(err)));

        }


        this.setState({ [state]: value });
        // console.log(state)
        // console.log(value)

    }

    // Adding number of elements
    addItems = (index, operationType) => {
        var total = 0;
        const items = [...this.state.menuItems];
        const item = items[index];
        console.log(item)

        if (operationType === 'add') {
            item.qty += 1;
        } else {
            item.qty -= 1;
        }

        items[index] = item;

        items.map((x) => {
            return total += x.qty * x.price;
        })
        this.setState({ menuItems: items, subtotal: total })
    }

    // Payment -Razorpay
    initPayment = (data) => {
        const options = {
            key: "rzp_test_aHrtX1Yu7uUzk1",
            amount: data.amount,
            currency: data.currency,
            description: "Test Transaction",
            order_id: data.id,

            handler: async (response) => {
                try {

                    const verifyLink = `${BASE_URL}/api/payment/verify`;
                    const { data } = await Axios.post(verifyLink, response);

                } catch (error) {
                    console.log(error);
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    razorpayPayment = async () => {
        const { subtotal } = this.state;
        console.log(subtotal)

        try {
            const orderLink = `${BASE_URL}/api/payment/orders`;
            const { data } = await Axios.post(orderLink, { amount: subtotal });
            console.log(data)

            this.initPayment(data.data);

        } catch (error) {
            console.log(error);
        }
    }



    render() {
        const { restaurant, galleryModal, menuModal, menuItems, subtotal, formModal } = this.state
        return (

            <div>
                <nav className="navbar bg-danger" data-bs-theme="">
                    <div className="container">
                        <div className="navbar-brand text-danger circle">
                            <h2 className="logo">e!</h2>
                        </div>

                        {/* <form class="d-flex nav-form">
                            <button type="button" class="btn btn-danger">Login</button>
                            <button type="button" class="btn btn-outline-light">Create an account</button>
                        </form> */}

                    </div>
                </nav>
                <div className="container">
                    <div className="restaurantImageBox">
                        <img src={restaurant.thumb} alt="rest-Img" className="restaurantImage" />

                        <input type="button" value="click to see image Gallery" className="galleryButton" onClick={() => this.handleModal('galleryModal', true)} />
                    </div>
                    <h2 className="restaurantTitle">{restaurant.name}</h2>
                    <div>
                        <input type="button" className="orderButton btn btn-danger" value="place Order" onClick={() => this.handleModal('menuModal', true)} />
                    </div>
                    <div className="tabs">
                        <div className="tab">
                            <input type="radio" className="" id="tab-1" name="tab-group" checked />
                            <label htmlFor="tab-1">Overview</label>

                            <div className="content">
                                <div className="about">About this place</div>

                                <div className="head">Cuisine</div>
                                <div className="value">
                                    {restaurant && restaurant.Cuisine && restaurant.Cuisine.map(cu => `${cu.name}, `)}
                                </div>

                                <div className="head">Average Cost</div>
                                <div className="value">₹{restaurant.cost} for two people (approx.)</div>
                            </div>
                        </div>

                        <div className="tab ms-4">
                            <input type="radio" className="" id="tab-2" name="tab-group" />
                            <label htmlFor="tab-2">Contact</label>

                            <div className="content">

                                <div className="value">Phone Number</div>
                                <div className="value-red">+91 {restaurant.contact_number}</div>

                                <div className="head">{restaurant.name}</div>
                                <div className="value">{restaurant.address}</div>
                            </div>
                        </div>

                    </div>
                </div>

                <Modal
                    isOpen={galleryModal}
                    style={customStyles}
                >
                    <div onClick={() => this.handleModal('galleryModal', false)} className="close"><i className="bi bi-x-lg"></i></div>
                    <div>
                        <Carousel showIndicators={false} showThumbs={false} showStatus={false}>
                            <div>
                                <img src={restaurant.thumb} className="gallery_img" alt=" " />
                            </div>
                        </Carousel>
                    </div>
                </Modal>

                <Modal
                    isOpen={menuModal}
                    style={customStyles}
                >
                    <div onClick={() => this.handleModal('menuModal', false)} className="close"><i className="bi bi-x-lg"></i></div>
                    <div>
                        <h3 className="menu_restaurant_name">{restaurant.name}</h3>

                        {/* Menu Item */}
                        {menuItems?.map((item, index) => {

                            return (

                                <div className="menu">
                                    <div className="menu_body">
                                        <h5 className="font_weight">{item.name}</h5>
                                        <h5 className="font_weight">₹ {item.price}</h5>
                                        <p className="item_details">{item.description}</p>
                                    </div>

                                    <div className="menu_image">
                                        <img className="item_image" src={`./images/${item.image}`} alt="food" />

                                        {
                                            item.qty === 0 ? <div className="item_quantity_button" onClick={() => this.addItems(index, 'add')}>
                                                ADD
                                            </div> :
                                                <div className="item_quantity_button">
                                                    <button onClick={() => this.addItems(index, 'sub')}> - </button>
                                                    <span className="qty"> {item.qty} </span>
                                                    <button onClick={() => this.addItems(index, 'add')} style={{ color: '#61B246' }}> + </button>
                                                </div>
                                        }

                                    </div>
                                </div>
                            )
                        })}


                        {/* Payment Details */}
                        <div className="payment">
                            {
                                subtotal === undefined ?
                                    <h4 className="total font_weight">Subtotal: ₹ 0 </h4>
                                    : <h4 className="total font_weight">Subtotal: ₹ {subtotal}</h4>

                            }

                            <button className="btn btn-danger payment_button" onClick={() => { this.handleModal('menuModal', false); this.handleModal('formModal', true); }}>
                                Pay Now
                            </button>
                        </div>

                    </div>
                </Modal>

                <Modal
                    isOpen={formModal}
                    style={customStyles}
                >
                    <div onClick={() => this.handleModal('formModal', false)} className="close"><i className
                    ="bi bi-x-lg"></i></div>
                    <div style={{ width: '20em' }}>
                        <h3 className="menu_restaurant_name">{restaurant.name}</h3>

                        <label htmlFor="name" style={{ marginTop: '10px' }}>Name</label>
                        <input type="text" placeholder="Enter your name" style={{ width: '100%' }} className="form-control" id="name" />

                        <label htmlFor="mobile" style={{ marginTop: '10px' }}>Mobile Number</label>
                        <input type="text" placeholder="Enter mobile number" style={{ width: '100%' }} className="form-control" id="mobile" />

                        <label htmlFor="address" style={{ marginTop: '10px' }}>Address</label>
                        <textarea type="text" rows="4" placeholder="Enter your address" style={{ width: '100%' }} className="form-control" id="address">
                        </textarea>

                        <button className="btn btn-outline-primary" style={{ float: "right", marginTop: "18px" }} onClick={this.razorpayPayment}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="razorpay" style={{ height: '25px' }} />
                        </button>

                        <button className="btn btn-primary px-4" style={{ marginTop: "18px" }} onClick={this.paypalPayment}>
                            <img src="https://www.edigitalagency.com.au/wp-content/uploads/PayPal-logo-white-png-horizontal.png" alt="razorpay" style={{ height: '25px' }} />
                        </button>
                    </div>
                </Modal>


            </div>
        )
    }
}

export default DetailsPage;
