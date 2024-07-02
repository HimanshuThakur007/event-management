import React, { useState, useEffect } from 'react';
import './style.css';

const OtpForm = ({ onClose, onVerify, onResend, onSendOtp }) => {
    // const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [isOtpValid, setIsOtpValid] = useState(true);
    const [timer, setTimer] = useState(30);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
            return () => clearInterval(countdown);
        } else {
            setIsResendDisabled(false);
        }
    }, [timer]);

    const handleEmailChange = (e) => {
        // setEmail(e.target.value);
        setMobileNo(e.target.value);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        onSendOtp(mobileNo);
        setIsEmailSubmitted(true);
    };

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (/^[0-9]*$/.test(value)) {
            let newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Focus next input
            if (value && index < otp.length - 1) {
                const nextInput = document.getElementById(`otp-input${index + 2}`);
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const otpString = otp.join("");
        const isValid = onVerify(otpString);
        setIsOtpValid(isValid);
    };

    const handleResend = () => {
        setTimer(30);
        setIsResendDisabled(true);
        onResend();
    };

    return (
        <div className="otp-modal-overlay">
            <div className="otp-modal-container">
                {!isEmailSubmitted ? (
                    <form className="otp-Form" onSubmit={handleEmailSubmit}>
                        <span className="mainHeading text-xl font-semibold mb-4">Mobile Number</span>
                        <div className="inputContainer flex space-x-2 mb-4">
                            <input
                                className="form-control"
                                name="username"
                                value={mobileNo}
                                onChange={handleEmailChange}
                                id="username"
                                type="number"
                                min="0"
                                placeholder="Mobile Number*"
                                required
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <button className="btn verifyButton" type="submit">Submit</button>
                            <button type="button" className="exitBtn" onClick={onClose}>×</button>
                        </div>
                    </form>
                ) : (
                    <form className="otp-Form" onSubmit={handleSubmit}>
                        <span className="mainHeading">Enter OTP</span>
                        <p className="otpSubheading">We have sent a verification code to your mobile No.</p>
                        <div className="inputContainer">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    required
                                    maxLength={1}
                                    type="text"
                                    className={`otp-input ${!isOtpValid ? 'error' : ''}`}
                                    id={`otp-input${index + 1}`}
                                    value={value}
                                    onChange={(e) => handleChange(e, index)}
                                />
                            ))}
                        </div>
                        {!isOtpValid && <p className="errorMessage">OTP is incorrect</p>}
                        <div className="flex justify-between items-center">
                            <button className="btn verifyButton" type="submit">Verify</button>
                            <button type="button" className="exitBtn" onClick={onClose}>×</button>
                        </div>
                        <p className="resendNote">
                            {isResendDisabled ? (
                                `Didn't receive the code? 00:${timer}`
                            ) : (
                                <>
                                    Didn't receive the code?
                                    <button
                                        type="button"
                                        className="resendBtn"
                                        onClick={handleResend}
                                    >
                                        Resend Code
                                    </button>
                                </>
                            )}
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default React.memo(OtpForm);
