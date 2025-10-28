"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AccountType() {
  const [accountType, setAccountType] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleConfirm = () => {
    if (!accountType) return;
    localStorage.setItem("accountType", accountType);
    if (accountType === "Customer") {
      navigate("/signup");
    } else {
      navigate("/seller-signup");
    }
  };

  return (
    <div className="account-type-selection bg-white p-8 w-full h-full pt-[100px]">
      <h1 className="text-[40px] font-medium mb-14 text-center">
        Join as Customer or Vendor
      </h1>

      <div className="flex justify-center items-stretch gap-[84px] mb-10">
        <button
          onClick={() => setAccountType("Customer")}
          className={`px-8 pt-8 pb-[70px] border border-bordergray rounded-3xl max-w-[272px] text-2xl font-medium text-left flex flex-col justify-between items-start transition-all ${
            accountType === "Customer" ? "text-pink border-pink shadow-md" : ""
          }`}
        >
          <div className="flex flex-row justify-between items-center mb-[40px] w-full">
            <img src="/images/customer-icon.svg" alt="customer icon" />
            <div
              className={`checkmark w-[20px] h-[20px] rounded-full border border-gray grid place-items-center ${
                accountType === "Customer" ? "border-pink" : ""
              }`}
            >
              <div
                className={`checkmark-small w-[10px] h-[10px] rounded-full ${
                  accountType === "Customer" ? "bg-pink" : "bg-white"
                }`}
              ></div>
            </div>
          </div>
          <p className="max-w-[162px] -tracking-[0.25px]">
            I’m a Customer, looking to buy
          </p>
        </button>

        <button
          onClick={() => setAccountType("Vendor")}
          className={`px-8 pt-8 pb-[70px] border border-bordergray rounded-3xl max-w-[272px] text-2xl font-medium text-left flex flex-col justify-between items-start transition-all ${
            accountType === "Vendor" ? "text-pink border-pink shadow-md" : ""
          }`}
        >
          <div className="flex flex-row justify-between items-center mb-[40px] w-full">
            <img src="/images/vendor-icon.svg" alt="vendor icon" />
            <div
              className={`checkmark w-[20px] h-[20px] rounded-full border border-gray grid place-items-center ${
                accountType === "Vendor" ? "border-pink" : ""
              }`}
            >
              <div
                className={`checkmark-small w-[10px] h-[10px] rounded-full ${
                  accountType === "Vendor" ? "bg-pink" : "bg-white"
                }`}
              ></div>
            </div>
          </div>
          <p className="max-w-[162px] -tracking-[0.25px]">
            I’m a Vendor, looking to sell
          </p>
        </button>
      </div>

      <div className="flex flex-col justify-center items-center gap-4">
        <button
          onClick={handleConfirm}
          disabled={!accountType}
          className={`w-full max-w-[399px] py-3 text-[20px] font-medium rounded-3xl transition-all ${
            accountType
              ? "bg-pink text-white hover:opacity-90"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {accountType
            ? `Continue as ${accountType}`
            : "Please select an account type"}
        </button>

        <p className="text-center mt-6 max-w-[400px] mx-auto text-sm text-gray-500">
          By signing up as a Vendor, you agree to our Terms of Service and
          Privacy Policy.
        </p>
      </div>
    </div>
  );
}
