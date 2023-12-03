import React from 'react'

const Contact = () => {
    return (
        <div className="content-section-e parallax" id="contact">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h2 className="section-heading wow fadeInUp">Contact <strong>Us</strong></h2>
                        <span className="separator2" />
                        <p className="section-subheading2">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                    </div>
                    <div className="col-md-4 contact-info">
                        <div className="row">
                            <div className="col-xs-12 col-sm-4 col-md-12">
                                <h3><i className="fa fa-map-marker" /> Address:</h3>
                                <address>8578 NW 70th Street, 33166, Miami - Florida, USA</address>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-12">
                                <h3><i className="fa fa-phone" /> Phone:</h3>
                                <address>(+385) 593 6888 / (+385) 593 6888</address>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-12">
                                <h3><i className="fa fa-envelope" /> Email:</h3>
                                <address>example@example.com</address>
                            </div>
                            <div className="col-md-12 social-contact wow fadeInUp">
                                <a href="#"><i className="fa fa-facebook" /></a>
                                <a href="#"><i className="fa fa-twitter" /></a>
                                <a href="#"><i className="fa fa-dribbble" /></a>
                                <a href="#"><i className="fa fa-tumblr" /></a>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="alert alert-success hidden" id="MessageSent">
                                We have received your message, we will contact you very soon.
                            </div>
                            <div className="alert alert-danger hidden" id="MessageNotSent">
                                Oops! Something went wrong please refresh the page and try again.
                            </div>
                            <form method="post" id="contact-form" className="contact-form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="name">Name</label>
                                            <input type="text" name="name" id="name" placeholder="Name" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="email">Email</label>
                                            <input type="email" name="email" id="email" placeholder="Email" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="sr-only" htmlFor="message">Message</label>
                                            <textarea name="message" id="message" rows={8} placeholder="Message" className="form-control" defaultValue={""} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="submit" defaultValue="send" className="btn btn-theme btn-block btn-contact" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact


