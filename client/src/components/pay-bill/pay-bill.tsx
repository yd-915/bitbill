//import useState from react
import { useState } from "react";

//import custom styles from
import { PayBillAmountIn, PayBillAmountInText, 
         PayBillAmoutCont, PayBillButton, 
         PayBillButtonDiv, PayBillButtonTwo,
         PayBillContainer, PayBillForm,
         PayBillGroup, PayBillHeader,
         PayBillInnerContainer, PayBillInput, 
         PayBillLabel, PayBillPrice, PayBillSQLInText 
        } from "./pay-bill.styles";

//import react phone put 2 library
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';

//import select
import Select from "react-select";

//importing custom dropdown 
import { customStyles } from "../../utils/utils";

// importing options from utils
import { DropdownSelectType, NestedObjectType } from "../../types/types";

// get service name
import { useLocation } from "react-router-dom";

// react-redux
import {useSelector} from 'react-redux'
import { RootState } from "../../store/store";

// import pay
import { getCustomerName } from "../../utils/requests";

// import useDispatch
import {useDispatch} from 'react-redux';

import { alert, close} from "../../store/alert/alert.modal.reducer";
import Spinner from "../spinner/spinner";
import axios from "axios";

//JSX Component
const PayBill = () => {
    // use params to get services
    const location = useLocation()
    const category = location.state

    // dispatch
    const dispatch  = useDispatch();


    // selector
    const bills = useSelector((state: RootState) => state?.currentUser?.bills)
    

   const billsName : string[] = bills?.map((bill : any) => ({
    value: bill.name,
    label: bill.name,
   }))

   const amount : Number[] = bills?.map((bill : any) => (
      bill.amount
   ))

   const [customerName, setCustomerName] : any= useState("")

   const [selectedOption, setSelectedOption] : any = useState("");

   const [nairaAmount, setNairaAmount] : any = useState("")

   const result = bills?.find((bill: any) => bill.name === selectedOption?.value);

   const [meter, setMeter] : any = useState("");

   console.log(result, amount)
    // use state initial values
    const [phone, setPhone] : DropdownSelectType = useState("");

    // handle payment
    const handlePay = async (e : React.FormEvent<HTMLFormElement> | any) => {
        e.preventDefault()
        // const usdAmount : string | number = amount[0] === 0 ? (nairaAmount/750).toFixed(2)  : (result?.amount/750).toFixed(2)
        // const naira = amount[0] === 0 ? nairaAmount : result?.amount
        const customer =   category === "electricity" || category === "cable" ? meter : phone

         if(!bills[0]?.label_name || !customer) {
            dispatch(alert("Fill all fields ⌛️"))
            return setTimeout(() => {
                dispatch(close(""))
            }, 700)
         }
      // handle payment with btc
      const newWindow = window.open("https://btcpay0.voltageapp.io/apps/2kaqWpEAiUizaRiuzs2XYxnNtmkr/pos", '_blank', 'noopener,noreferrer')
      if (newWindow) newWindow.opener = null

            }

    // handle customer name
    const handleCustomerName = async  (e : any) => {
         console.log(selectedOption, "option")
        //   setCustomerName(e.target.value)
           setMeter(e.target.value)
           await getCustomerName(e.target.value,result?.biller_code, setCustomerName, result?.item_code )


    }
  return (
    <PayBillContainer>
        {!bills ? <Spinner/> : 
        <PayBillInnerContainer>
            <PayBillHeader>{
             `${category} Recharge`}</PayBillHeader>

            <PayBillForm 
            //    ref={formRef}
               onSubmit={handlePay}
                >
            <PayBillGroup>
                    <PayBillLabel>Network Provider</PayBillLabel>
                    <Select
                        options={billsName}
                        styles={customStyles}
                        //@ts-ignore
                        defaultValue={selectedOption}
                        onChange={(e : any) => setSelectedOption(e)}
                        />
                </PayBillGroup>
                <PayBillGroup>
                    <PayBillLabel>{bills[0]?.label_name === "SmartCard Number" ? "Smart Card Number" : bills[0]?.label_name === "Meter Number" ? "Meter Number" : "Phone Number"}</PayBillLabel>
                    {
                       category === "electricity" || category === "cable" ? 
                       <div>
                             <PayBillInput className="input"  placeholder={category === "electricity" ? "Meter Number" : "Smart Card Number"} onChange={  handleCustomerName }/>
                             <p style={{
                                marginTop : "5px" ,
                                fontSize : "13px",
                                fontWeight : "bold",
                                color : "green",
                             }}>{customerName}</p>
                       </div>
                    
                      
                      
                       :   <PhoneInput
                       country={bills[0]?.country.toLowerCase()}
                       regions={'africa'}
                       value={phone}
                       onChange={phone => setPhone(phone)}
                       inputStyle={{
                           width: '100%',
                           fontSize: '0.8rem',
                           color : "grey",
                           borderRadius: '4px',
                           boxShadow: 'none',
                           boxSizing: 'border-box',
                           paddingLeft : '5rem',
                           border : 'none',
                       }}
                       dropdownStyle={{
                           borderRadius: '4px',
                           boxShadow: 'none',
                           boxSizing: 'border-box',
                       }}
                       buttonStyle={{
                           border : 'none',
                           padding : '0 1rem',
                           backgroundColor : 'white',
                           height : '80%',
                           borderRight : '1px solid #959595',
                           top : "50%",
                           transform : "translateY(-50%)"
                       }}
                       containerStyle={{
                           border : '1px solid #959595',
                           borderRadius : '4px',
                           backgroundColor : "white",
                           padding : '0.5rem',
                       }}
                       />
                    }
                  
               </PayBillGroup>
                  <PayBillGroup>
                    <PayBillLabel>Amount</PayBillLabel>
                    <PayBillAmoutCont>
                     
                       <PayBillInput
                           type = {"number"}
                           value={amount[2] === 0 ? undefined : result?.amount }
                           min={category === "electricity" ? 1000 : undefined}
                           onChange={(e) => setNairaAmount(e.target.value)}
                        />
                        <PayBillAmountIn>
                            <PayBillAmountInText>Amount in</PayBillAmountInText>
                            <PayBillSQLInText>USD: ${!selectedOption?.value ? "0.00" :  amount[2] === 0 ?  (nairaAmount/750).toFixed(2) : (result?.amount/750).toFixed(2)}</PayBillSQLInText>
                        </PayBillAmountIn>
                    </PayBillAmoutCont>
                </PayBillGroup>

                <PayBillButtonDiv>
                    <PayBillButton type="submit">
                        Pay with 
                        <img src="/assets/Vector.png" className = "payBackIcon" alt="" />
                        <span className="boldText">Pay</span>
                    </PayBillButton>

                </PayBillButtonDiv>

                
                
            </PayBillForm>
        </PayBillInnerContainer>
       }
    </PayBillContainer>    
)
}

export default PayBill
