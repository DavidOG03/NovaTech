"use client";

import React, { useState } from "react";

export default function AccountType() {
  const [accountType, setAccountType] = useState<string | null>(null);

  const toggleAccountType = (type: string) => {
    setAccountType((prevType) => (prevType === type ? null : type));
  };

  return (
    <div className="account-type-selection bg-white p-8 w-full h-full pt-[100px]">
      <h1 className="text-[40px] font-medium mb-14 text-center">
        Join as Customer or Vendor
      </h1>
      <div className="flex justify-center items-stretch gap-[84px] mb-6">
        <button
          onClick={() => toggleAccountType("Customer")}
          className={`px-8 pt-8 pb-[70px] border border-bordergray rounded-[10px] max-w-[272px] text-2xl font-medium text-left flex flex-col justify-between items-start${
            accountType === "Customer" ? " text-pink border-pink" : ""
          }`}
        >
          <div className="flex flex-row justify-between items-center mb-[40px] w-full">
            <Customer/>
            <div
              className={`checkmark w-[20px] h-[20px] rounded-full border border-gray grid place-items-center  ${
                accountType === "Customer" ? "border-pink" : ""
              }`}
            >
              <div
                className={`checkmark-small w-[10px] h-[10px] rounded-full border border-gray  ${
                  accountType === "Customer"
                    ? " border-pink  bg-pink"
                    : "bg-white"
                }`}
              ></div>
            </div>
          </div>
          <p className="max-w-[162px] -tracking-[0.25px]">
            I’m a Customer, looking to buy
          </p>
        </button>
        <button
          onClick={() => toggleAccountType("Vendor")}
          className={`px-8 pt-8 pb-[70px] border  border-bordergray rounded-[10px] max-w-[272px] text-2xl font-medium text-left flex flex-col justify-between items-start ${
            accountType === "Vendor" ? " text-pink border-pink" : ""
          }`}
        >
          <div className="flex flex-row justify-between items-center mb-[40px] w-full">
            <img src="/assets/vendor-icon.svg" alt="customer icon" />
            <div
              className={`checkmark w-[20px] h-[20px] rounded-full border border-gray grid place-items-center  ${
                accountType === "Vendor" ? "border-pink" : ""
              }`}
            >
              <div
                className={`checkmark-small w-[10px] h-[10px] rounded-full border border-gray  ${
                  accountType === "Vendor"
                    ? " border-pink  bg-pink"
                    : "bg-white"
                }`}
              ></div>
            </div>
          </div>
          <p className="max-w-[162px] -tracking-[0.25px]">
            I’m a Vendor, looking to sell
          </p>
        </button>
      </div>
      {accountType && (
        <div className="flex flex-col justify-center items-center gap-4">
          <a
            href={`/auth/${accountType}`}
            className="text-white rounded-[8px] bg-pink w-full max-w-[399px] text-center mx-auto font-medium py-3 text-[20px]"
          >
            Join as a {accountType}
          </a>
          <span className="font-normal text-[20px] text-black">
            Already have an account?{" "}
            <a
              href="/auth/signin"
              className="font-medium text-[20px] text-pink "
            >
              Sign In
            </a>
          </span>
        </div>
      )}
    </div>
  );
}
