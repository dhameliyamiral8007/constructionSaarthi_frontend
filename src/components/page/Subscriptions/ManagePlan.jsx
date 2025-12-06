import { useState } from "react";
import { GrFormEdit } from "react-icons/gr";
import { IoToggle } from "react-icons/io5";

const ManagePlan = () => {
    const [open, setOpen] = useState(false);
    const plans = [
        {
            planName: "Monthly",
            contractor: "Contractor + 3 Free Users",
            rs: "999",
            user: "312",
            status: "active"
        },
        {
            planName: "3 Month Plan",
            contractor: "Contractor + 3 Free Users",
            rs: "1499",
            user: "512",
            status: "active"
        },
        {
            planName: "6 Month Plan",
            contractor: "Contractor + 3 Free Users",
            rs: "2499",
            user: "512",
            status: "active"
        },
        {
            planName: "12 Month Plan",
            contractor: "Contractor + 3 Free Users",
            rs: "3999",
            user: "512",
            status: "active"
        }
    ];

    const addOns = [
        {
            planName: "Single User",
            rs: "999",
            user: "312",
            status: "active"
        },
    ]
    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Manage Plans</h2>
            <p className="text-gray-600 mb-6">
                Handle all your plans effortlessly at the best rates
            </p>

            <div>
                <h1 className="text-2xl font-semibold mb-4">Subscription Plans</h1>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {plans.map((plan, index) => (
                        <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{plan.planName}</span>
                                <GrFormEdit size={25} />
                            </div>
                            <div className="text-sm text-gray-600 mb-2">{plan.contractor}</div>
                            <div className="font-semibold text-[#B02E0C]">₹{plan.rs}</div>
                            <div className="font-semibold">
                                Current Users: <span className="font-normal">{plan.user}</span>
                            </div>
                            <div className="mt-3 flex gap-1 item-center">
                                <div className="text-gray-600">Subscription Active</div>
                                <div>
                                    <IoToggle size={25} color="#B02E0C" />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* CARD BUTTON */}
                    <div
                        onClick={() => setOpen(true)}
                        className="w-full p-6 border-2 border-dashed border-red-200 rounded-xl 
                bg-white cursor-pointer hover:shadow-md transition"
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <div className="text-[25px] text-black font-semibold">+</div>
                            <p className="text-lg font-semibold text-black">Add New Plan</p>
                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                            Create a new subscription plan and make it active for users.
                        </p>
                    </div>

                    {/* blur OVERLAY WHEN SIDEBAR OPEN */}
                    {open && (
                        <div
                            onClick={() => setOpen(false)}
                            className="fixed inset-0  z-50 backdrop-blur-[1px] bg-[#b3b3b3]/30"
                        ></div>
                    )}

                    {/* RIGHT SIDEBAR */}
                    <div
                        className={`fixed top-0 right-0 h-full overflow-y-auto md:w-[740px] w-full bg-white shadow-xl z-50
                transition-transform duration-300 
                ${open ? "translate-x-0" : "translate-x-full"}`}
                    >
                        <div className="bg-white w-full mx-auto rounded-xl shadow-lg pl-[40px] py-[40px] pr-1 relative">
                            {/* Header */}
                            <div className="mb-5">
                                <h2 className="text-xl font-semibold">Add New Plan</h2>
                                <p className="text-gray-500 text-sm">
                                    Fill in all the required details below to create a new plan.
                                </p>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="absolute top-6 right-4 text-4xl text-[#060C12] hover:text-black"
                                >
                                    &times;
                                </button>
                            </div>

                            <form className="space-y-4">
                                {/* Plan Name + Price */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                                    <div>
                                        <label className="text-[16px] font-medium text-[#060C12]">Plan Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter plan name"
                                            className="mt-1 w-full border-[2px] border-[#060C121A] rounded-[12px] p-[10px] placeholder:text-[#838588] focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[16px] font-medium text-[#060C12]">Price</label>
                                        <input
                                            type="number"
                                            placeholder="₹"
                                            className="mt-1 w-full border-[2px] border-[#060C121A] rounded-[12px] p-[10px] placeholder:text-[#838588] focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>

                                {/* User Role / User Count */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[16px] font-medium text-[#060C12]">User Role</label>
                                        <input
                                            type="text"
                                            placeholder="Enter User Role"
                                            className="mt-1 w-full border-[2px] border-[#060C121A] rounded-[12px] p-[10px] placeholder:text-[#838588] focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[16px] font-medium text-[#060C12]">User Count</label>
                                        <input
                                            type="text"
                                            placeholder="Enter User Count"
                                            className="mt-1 w-full border-[2px] border-[#060C121A] rounded-[12px] p-[10px] placeholder:text-[#838588] focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>

                                {/* Sub User + Calculation */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[16px] font-medium text-[#060C12]">Sub User Count</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Sub User Count"
                                            className="mt-1 w-full border-[2px] border-[#060C121A] rounded-[12px] p-[10px] placeholder:text-[#838588] focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[16px] font-medium text-[#060C12]">Calculation</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Calculation"
                                            className="mt-1 w-full border-[2px] border-[#060C121A] rounded-[12px] p-[10px] placeholder:text-[#838588] focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
                                    <div>
                                        <label className="text-[16px] font-medium text-[#060C12]">Billing Period</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Billing Period"
                                            className="mt-1 w-full border-[2px] border-[#060C121A] rounded-[12px] p-[10px] placeholder:text-[#838588] focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium block mb-2">Coupon Enable</label>
                                        <div className="flex gap-6 items-center mt-4.5">
                                            {/* TRUE */}
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="activeStatus"
                                                    value="true"
                                                    className="w-4 h-4"
                                                    onMouseEnter={(e) => (e.currentTarget.style.accentColor = '#B02E0C')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.accentColor = '#B02E0C')}
                                                />
                                                <span>True</span>
                                            </label>

                                            {/* FALSE */}
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="activeStatus"
                                                    value="false"
                                                    className="w-4 h-4"
                                                    onMouseEnter={(e) => (e.currentTarget.style.accentColor = '#B02E0C')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.accentColor = '#B02E0C')}
                                                />
                                                <span>False</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Add New Add-ons Header */}
                                <div className="flex justify-between items-center mt-4">
                                    <h3 className="text-lg font-semibold">Add New Add-ons</h3>
                                    {/* <button
                                        type="button"
                                        className="text-orange-600 text-sm font-medium hover:underline"
                                    >
                                        + Add New
                                    </button> */}
                                </div>

                                {/* Add-ons Inputs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[16px] font-medium text-[#060C12]">Member Price</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Member Price"
                                            className="mt-1 w-full border-[2px] border-[#060C121A] rounded-[12px] p-[10px] placeholder:text-[#838588] focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium block mb-2">Member Active</label>
                                        <div className="flex gap-6 items-center mt-4.5">
                                            {/* TRUE */}
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="activeStatus"
                                                    value="true"
                                                    className="w-4 h-4"
                                                    onMouseEnter={(e) => (e.currentTarget.style.accentColor = '#B02E0C')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.accentColor = '#B02E0C')}
                                                />
                                                <span>True</span>
                                            </label>

                                            {/* FALSE */}
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="activeStatus"
                                                    value="false"
                                                    className="w-4 h-4"
                                                    onMouseEnter={(e) => (e.currentTarget.style.accentColor = '#B02E0C')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.accentColor = '#B02E0C')}
                                                />
                                                <span>False</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Add-ons Description */}
                                <div>
                                    <label className="text-[16px] font-medium text-[#060C12]">Description</label>
                                    <textarea
                                        placeholder="Enter description"
                                        className="mt-1 w-full border-[2px] h-24 border-[#060C121A] rounded-[12px] p-[10px] placeholder:text-[#838588] focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    ></textarea>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <h3 className="text-lg font-semibold">Add New Calculation Pack</h3>
                                    {/* <button
                                        type="button"
                                        className="text-orange-600 text-sm font-medium hover:underline"
                                    >
                                        + Add New
                                    </button> */}
                                </div>

                                {/* Add-ons Inputs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[16px] font-medium text-[#060C12]">Minimum Calculation</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Minimum Calculation"
                                            className="mt-1 w-full border-[2px] border-[#060C121A] rounded-[12px] p-[10px] placeholder:text-[#838588] focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[16px] font-medium text-[#060C12]">Calculation Price</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Calculation Price"
                                            className="mt-1 w-full border-[2px] border-[#060C121A] rounded-[12px] p-[10px] placeholder:text-[#838588] focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium block mb-2">Member Active</label>
                                        <div className="flex gap-6 items-center mt-4.5">
                                            {/* TRUE */}
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="activeStatus"
                                                    value="true"
                                                    className="w-4 h-4"
                                                    onMouseEnter={(e) => (e.currentTarget.style.accentColor = '#B02E0C')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.accentColor = '#B02E0C')}
                                                />
                                                <span>True</span>
                                            </label>

                                            {/* FALSE */}
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="activeStatus"
                                                    value="false"
                                                    className="w-4 h-4"
                                                    onMouseEnter={(e) => (e.currentTarget.style.accentColor = '#B02E0C')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.accentColor = '#B02E0C')}
                                                />
                                                <span>False</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Toggle */}
                                <div className="flex items-center gap-4 mt-4">
                                    <label className="text-sm font-medium">Current Status</label>

                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#B02E0C] transition-all"></div>
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                                    </label>
                                </div>

                                {/* Buttons */}
                                <div className="flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setOpen(false)}
                                        className="px-5 py-2 bg-gray-200 rounded-[14px] hover:bg-gray-100 cursor-pointer"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-5 py-2 bg-[#B02E0C] text-white rounded-[14px] hover:bg-orange-800 cursor-pointer"
                                    >
                                        Add Plan
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* ADD-ONS SECTION */}
            <div>
                <h1 className="text-2xl font-semibold my-4">Add-ons</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {addOns.map((plan, index) => (
                        <div key={index} className="p-4 bg-white rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{plan.planName}</span>
                                <GrFormEdit size={25} />
                            </div>
                            <div className="font-semibold text-[#B02E0C]">₹{plan.rs}</div>
                            <div className="font-semibold">
                                Current Users:
                                <span className="font-normal">{plan.user}</span>
                            </div>
                            <div className="mt-3 flex gap-1 item-center">
                                <div className="text-gray-600">Subscription Active</div>
                                <div>
                                    <IoToggle size={25} color="#B02E0C" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ManagePlan;
