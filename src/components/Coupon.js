import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import copy from 'copy-to-clipboard';
import './Coupon.css';

const Coupon = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, code: "COUPON100" },
    { id: 2, code: "COUPON101" },
    { id: 3, code: "COUPON102" }
  ]);
  const [currentCoupon, setCurrentCoupon] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!Cookies.get('lastClaim')) {
      Cookies.set('lastClaim', '', { expires: 1 });
    }
  }, []);

  const claimCoupon = () => {
    setLoading(true);
    setTimeout(() => {
      const lastClaimTime = Cookies.get('lastClaim');
      const now = Date.now();

      if (lastClaimTime && now - lastClaimTime < 3600000) {
        const remainingTime = 3600000 - (now - lastClaimTime);
        setMessage(`Please wait ${Math.ceil(remainingTime / 60000)} minutes before claiming another coupon.`);
      } else if (coupons.length > 0) {
        const [nextCoupon, ...remainingCoupons] = coupons;
        setCoupons(remainingCoupons);
        setCurrentCoupon(nextCoupon.code);
        Cookies.set('lastClaim', now, { expires: 1 });
        setMessage(`Coupon claimed successfully: ${nextCoupon.code}. Thank you!`);
      } else {
        setMessage('No coupons available.');
      }
      setLoading(false);
    }, 500);
  };

  const handleCopy = () => {
    copy(currentCoupon);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="coupon-container">
      <button className="claim-button" onClick={claimCoupon} disabled={loading}>
        {loading ? 'Processing...' : 'Claim Coupon'}
      </button>
      {currentCoupon && (
        <div className="coupon-code">
          <span>{currentCoupon}</span>
          <button className="copy-button" onClick={handleCopy}>
            <FontAwesomeIcon icon={faCopy} />
          </button>
        </div>
      )}
      {copied && <p className="copied-message">Copied to clipboard!</p>}
      {message && <p className="message">{message}</p>}
    </div>
    
  );
};

export default Coupon;