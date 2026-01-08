import React from "react";

const Checkout = ({ open, onClose, total }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* modal */}
      <div className="relative w-[500px] rounded-[20px] bg-[#FDF3EF] p-[30px] shadow-2xl">
        <h2 className="font-cormorant text-[36px] text-[#0D3B24] mb-[20px]">
          Checkout
        </h2>

        <div className="flex flex-col gap-[15px]">
          <input
            className="h-[45px] rounded-[10px] px-[15px] border border-[#445C32]"
            placeholder="Name"
          />
          <input
            className="h-[45px] rounded-[10px] px-[15px] border border-[#445C32]"
            placeholder="Address"
          />
          <input
            className="h-[45px] rounded-[10px] px-[15px] border border-[#445C32]"
            placeholder="City"
          />
        </div>

        <p className="mt-[20px] font-lora text-[20px] text-[#0D3B24]">
          Total: €{total}
        </p>

        <div className="mt-[30px] flex justify-end gap-[15px]">
          <button
            onClick={onClose}
            className="px-[20px] py-[10px] rounded-[10px] border border-[#445C32]"
          >
            Cancel
          </button>

          <button
            className="px-[25px] py-[10px] rounded-[10px] bg-[#445C32] text-white hover:bg-[#0D3B24]"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
