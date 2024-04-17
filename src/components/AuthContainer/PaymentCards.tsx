import {faCreditCard} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";

import {useAppSelector} from "../../hooks";
import {IBank} from "../../interfaces";



const PaymentCards = () => {
      const {authUser} = useAppSelector(state => state.auth);
      const {bank} = authUser;

      const {setValue, register, handleSubmit,reset} = useForm<IBank>();

    useEffect(() => {
        setValue('cardType',bank.cardType);
        setValue('cardNumber',bank.cardNumber);
        setValue('cardExpire',bank.cardExpire);
        setValue('iban',bank.iban);
        setValue('currency',bank.currency);
    }, [bank, setValue]);

    const handlePaymentChanges:SubmitHandler<IBank> = (paymentDetails) =>{

    }
    return (
        <div>
            {(authUser && !bank) &&
                <div className="alert alert-warning" role="alert">
                    <FontAwesomeIcon icon={faCreditCard} style={{fontSize:'30px'}}/>
                    <h5>You do not have a payment card saved yet.</h5>
                    When paying for a future order, check "remember the card for the next purchase"
                </div>}

            <form onSubmit={handleSubmit(handlePaymentChanges)}>
                <div className="input-group input-group-sm mb-3 col-6">
                    <span className="input-group-text">Card Type</span>
                    <input type="text" className="form-control"  {...register('cardType')}/>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">Card Number</span>
                    <input type="text" className="form-control"  {...register('cardNumber')}/>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">Card Expire</span>
                    <input type="text" className="form-control"  {...register('cardExpire')}/>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">IBAN</span>
                    <input type="text" className="form-control"  {...register('iban')}/>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">Currency</span>
                    <input type="text" className="form-control"  {...register('currency')}/>
                </div>

                <button type={'submit'} className={'btn btn-primary'}>Save Changes</button>
            </form>
        </div>
    );
};

export {PaymentCards};
