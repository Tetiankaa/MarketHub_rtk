import {faCircleCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Register = () => {
    return (
        <div className={'d-flex justify-content-center flex-column'}>
            <div>
                <p className="fs-2">Registration</p>
            </div>

            <div className={'d-flex'}>
                <div className={'w-25'}>

                    <form className="border border-info rounded-4 p-3">
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder={'Email'}/>
                        </div>
                        <div className="mb-3">
                            <input type="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="subscribe"/>
                            <label className="form-check-label fs-6 fw-light" htmlFor="subscribe">
                                I want to receive information about news, promotions and discount coupons.
                            </label>
                        </div>
                        <div className="mb-1">
                            <button type="submit" className="btn btn-primary mb-3 form-control">Register</button>
                        </div>

                        <div>
                            <p className={'fw-light'} style={{fontSize: '11px'}}>I declare that I have familiarized
                                myself with <b>the principles of processing personal
                                    data</b> and with <b>the terms and conditions</b> and I want to register and join
                                the MarketHub club.</p>
                        </div>

                        <div className={'mb-3 mt-3 d-flex justify-content-center'}>
                            <p>Already have an account? <a href={'/account/login'} className={'font-weight-bold'}><b>Sing
                                in</b></a></p>
                        </div>
                    </form>
                </div>

                <div className={'w-25 ms-5 d-flex justify-content-center align-items-center flex-column'}>
                    <p className={'fs-4'}>What benefits do you get by registering?</p>
                    <p><FontAwesomeIcon icon={faCircleCheck} color={'#0d6efd'}/> Thanks to the saved address, you can
                        send the order in a few clicks</p>
                    <p><FontAwesomeIcon icon={faCircleCheck} color={'#0d6efd'}/> You will have an overview of the status
                        of the order</p>
                    <p><FontAwesomeIcon icon={faCircleCheck} color={'#0d6efd'}/> View your order history at any time</p>
                </div>
            </div>

        </div>
    );
};

export {Register};
