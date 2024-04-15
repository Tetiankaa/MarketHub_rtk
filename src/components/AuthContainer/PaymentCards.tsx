import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {useAppSelector} from "../../hooks";


const PaymentCards = () => {
      const {authUser} = useAppSelector(state => state.auth);


    return (
        <div>
            {(authUser && !authUser.bank) &&
                <div className="alert alert-warning" role="alert">
                    <FontAwesomeIcon icon={faCreditCard} style={{fontSize:'30px'}}/>
                    <h5>You do not have a payment card saved yet.</h5>
                    When paying for a future order, check "remember the card for the next purchase"
                </div>}

            <form>
                <div className="mb-3">
                    <label htmlFor="cardType" className="form-label">Card Type</label>
                    <input type="text" className="form-control" id="cardType" value={authUser.bank.cardType}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
            </form>
        </div>
    );
};

export {PaymentCards};
