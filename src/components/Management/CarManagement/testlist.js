import React from "react";

const cars = [
    {
        id: 1,
        name: "Mercedes Grand Sedan",
        brand: "Cheverolet",
        price: 500,
        image: "images/car-1.jpg",
    },
    {
        id: 2,
        name: "Range Rover",
        brand: "Subaru",
        price: 500,
        image: "images/car-2.jpg",
    },
    // Add remaining car data here with unique ids
];

const CarCard = ({ car }) => (
    <div className="col-md-4" key={car.id}>
        <div className="car-wrap rounded ftco-animate">
            <div
                className="img rounded d-flex align-items-end"
                style={{ backgroundImage: `url(${car.image})` }}
            ></div>
            <div className="text">
                <h2 className="mb-0">
                    <a href="car-single.html">{car.name}</a>
                </h2>
                <div className="d-flex mb-3">
                    <span className="cat">{car.brand}</span>
                    <p className="price ml-auto">
                        ${car.price} <span>/day</span>
                    </p>
                </div>
                <p className="d-flex mb-0 d-block">
                    <a href="#" className="btn btn-primary py-2 mr-1">
                        Book now
                    </a>
                    <a href="car-single.html" className="btn btn-secondary py-2 ml-1">
                        Details
                    </a>
                </p>
            </div>
        </div>
    </div>
);

const CarListPage = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                <div className="container">
                    <a className="navbar-brand" href="index.html">
                        Car<span>Book</span>
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#ftco-nav"
                        aria-controls="ftco-nav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="oi oi-menu"></span> Menu
                    </button>

                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a href="index.html" className="nav-link">Home</a>
                            </li>
                            <li className="nav-item">
                                <a href="about.html" className="nav-link">About</a>
                            </li>
                            <li className="nav-item">
                                <a href="services.html" className="nav-link">Services</a>
                            </li>
                            <li className="nav-item">
                                <a href="pricing.html" className="nav-link">Pricing</a>
                            </li>
                            <li className="nav-item active">
                                <a href="car.html" className="nav-link">Cars</a>
                            </li>
                            <li className="nav-item">
                                <a href="blog.html" className="nav-link">Blog</a>
                            </li>
                            <li className="nav-item">
                                <a href="contact.html" className="nav-link">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <section
                className="hero-wrap hero-wrap-2 js-fullheight"
                style={{ backgroundImage: "url('images/bg_3.jpg')" }}
                data-stellar-background-ratio="0.5"
            >
                <div className="overlay"></div>
                <div className="container">
                    <div className="row no-gutters slider-text js-fullheight align-items-end justify-content-start">
                        <div className="col-md-9 ftco-animate pb-5">
                            <p className="breadcrumbs">
                <span className="mr-2">
                  <a href="index.html">
                    Home <i className="ion-ios-arrow-forward"></i>
                  </a>
                </span>{" "}
                                <span>
                  Cars <i className="ion-ios-arrow-forward"></i>
                </span>
                            </p>
                            <h1 className="mb-3 bread">Choose Your Car</h1>
                        </div>
                    </div>
                </div>
            </section>

            <section className="ftco-section bg-light">
                <div className="container">
                    <div className="row">
                        {cars.map((car) => (
                            <CarCard car={car} key={car.id} />
                        ))}
                    </div>
                    <div className="row mt-5">
                        <div className="col text-center">
                            <div className="block-27">
                                <ul>
                                    <li>
                                        <a href="#">&lt;</a>
                                    </li>
                                    <li className="active">
                                        <span>1</span>
                                    </li>
                                    <li>
                                        <a href="#">2</a>
                                    </li>
                                    <li>
                                        <a href="#">3</a>
                                    </li>
                                    <li>
                                        <a href="#">4</a>
                                    </li>
                                    <li>
                                        <a href="#">5</a>
                                    </li>
                                    <li>
                                        <a href="#">&gt;</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CarListPage;
