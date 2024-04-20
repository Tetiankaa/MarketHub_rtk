import {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {IUser} from "../../interfaces";
import {authActions} from "../../redux/slices";

const ContactInformation = () => {

    const dispatch = useAppDispatch();

    const {authUser} = useAppSelector(state => state.auth);

    const {setValue, register, handleSubmit} = useForm<IUser>();

    const [gender, setGender] = useState<string>(authUser?.gender || '');
    const [companyData, setCompanyData] = useState<boolean>(false);

    useEffect(() => {
        if (authUser) {
            setGender(authUser.gender);
            setValue('gender',authUser.gender)
            setValue('phone', authUser.phone);
            setValue('firstName', authUser.firstName);
            setValue('lastName', authUser.lastName);
            setValue('lastName', authUser.lastName);
            setValue('address.address', authUser.address.address);
            setValue('address.city', authUser.address.city);
            setValue('address.postalCode', authUser.address.postalCode);
            setValue('address.state', authUser.address.state);
        }
        if (companyData){
            setValue('company.name', authUser.company.name);
            setValue('company.department', authUser.company.department);
            setValue('company.address.address', authUser.company.address.address);
            setValue('company.address.city', authUser.company.address.city);
            setValue('company.address.postalCode', authUser.company.address.postalCode);
            setValue('company.address.state', authUser.company.address.state);
        }
    }, [authUser, setValue, companyData]);

    const handleChanges: SubmitHandler<IUser> = (user) => {
       dispatch(authActions.updateUserDetails({id:authUser.id,dataToUpdate:user}))
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleChanges)}>
                <h4>Personal information</h4>

                <div className={'d-flex'}>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" id="female" {...register('gender')}
                               value={'female'} onChange={(e) => setGender(e.target.value)}
                               checked={gender === 'female'}/>
                        <label className="form-check-label" htmlFor="female">
                            Female
                        </label>
                    </div>

                    <div className="form-check ms-3">
                        <input className="form-check-input" type="radio" id="male" {...register('gender')}
                               value={'male'} onChange={(e) => setGender(e.target.value)} checked={gender === 'male'}/>
                        <label className="form-check-label" htmlFor="male">
                            Male
                        </label>
                    </div>
                </div>

                <div className="input-group input-group-sm mb-3 mt-3">
                    <span className="input-group-text">Mobile phone</span>
                    <input type="text" className="form-control"  {...register('phone')}/>
                </div>

                <h4>Billing address</h4>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">Name</span>
                    <input type="text" className="form-control"  {...register('firstName')}/>
                </div>

                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">Surname</span>
                    <input type="text" className="form-control"  {...register('lastName')}/>
                </div>

                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">Address</span>
                    <input type="text" className="form-control"  {...register('address.address')}/>
                </div>

                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">City</span>
                    <input type="text" className="form-control"  {...register('address.city')}/>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">Postal code</span>
                    <input type="text" className="form-control"  {...register('address.postalCode')}/>
                </div>
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text">State</span>
                    <input type="text" className="form-control"  {...register('address.state')}/>
                </div>

                <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="companyData"
                           onChange={() => setCompanyData(prevState => !prevState)}/>
                    <label className="form-check-label" htmlFor="companyData">
                        Change or enter company data
                    </label>
                </div>

                { companyData &&
                    <div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text">Company name</span>
                            <input type="text" className="form-control"  {...register('company.name')}/>
                        </div>

                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text">Department</span>
                            <input type="text" className="form-control"  {...register('company.department')}/>
                        </div>

                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text">Address</span>
                            <input type="text" className="form-control"  {...register('address.address')}/>
                        </div>

                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text">City</span>
                            <input type="text" className="form-control"  {...register('company.address.city')}/>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text">Postal code</span>
                            <input type="text" className="form-control"  {...register('company.address.postalCode')}/>
                        </div>
                        <div className="input-group input-group-sm mb-3">
                            <span className="input-group-text">State</span>
                            <input type="text" className="form-control"  {...register('company.address.state')}/>
                        </div>

                    </div>
                }

                <button type={'submit'} className={'btn btn-primary'}>Save Changes</button>
            </form>
        </div>
    );
};

export {ContactInformation};
