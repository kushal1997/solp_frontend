import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import Subheader from '../components/Subheader';
// subheading=''
export const SubHeader = () => {
    const location = useLocation();
    return (
        <main className='sub_header'>
            {
                location.pathname === '/policy/terms_and_condition' && <Subheader heading='Our Policies' subheading='Terms & Conditions'/>
            }
            {
                location.pathname === '/policy/service' && <Subheader heading='Our Policies' subheading='Data Privacy Policy'/>
            }
            {
                location.pathname === '/policy/cancellation_and_refund' && <Subheader heading='Our Policies' subheading='Cancellation & Refund' />
            }
            <div className="policy">
                <h2>
                    <NavLink to='/policy/terms_and_condition'>
                        Terms & Conditions
                    </NavLink>
                </h2>
                <h2>
                    <NavLink to='/policy/service'>
                        Data Privacy Policy
                    </NavLink>
                </h2>
                <h2>
                    <NavLink to='/policy/cancellation_and_refund'>
                        Cancellation & Refund
                    </NavLink>
                </h2>
            </div>
        </main>
    )
}

