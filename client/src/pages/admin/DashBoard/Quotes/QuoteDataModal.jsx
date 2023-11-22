import React, { useEffect, useState } from "react";
import { Table } from "antd";

const QuotetModal = ({ data, handleClose }) => {
    const quoteStatus = (status) => {
        let classes =
            "ml-3 cursor-pointer inline-flex items-center justify-center px-2  py-1 mr-2 text-xs font-bold leading-none text-red-100 rounded-full";

        switch (status) {
            case "created":
                classes += " bg-[#6c5ce7]";
                break;
            case "processing":
                classes += " bg-[#e17055]";
                break;
            case "delivering":
                classes += " bg-[#fd79a8]";
                break;
            case "completed":
                classes += " bg-[#00b894]";
                break;
            case "canceled":
                classes += " bg-[#e17055]";
                break;
        }

        return <span className={classes}>{status}</span>;
    };

    const img = (images) => {
        return (
            <div className="flex">
                {images.map((img) => {
                    return (
                        <img
                            className="w-12 h-12 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                            src={img}
                        />
                    );
                })}
            </div>
        );
    };
    const columns = [
        {
            title: "Product image",
            dataIndex: "",
            key: "avatar",
            width: "10%",
            render: (arg) => img(arg.images),
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            align: "center",
            width: "40%",
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            align: "center",
            width: "10%",
            sorter: (a, b) => a.price.localeCompare(b.price),
        },
        {
            title: "Discount",
            dataIndex: "discount",
            key: "discount",
            align: "center",
            width: "20%",
            sorter: (a, b) => a.discount.localeCompare(b.discount),
        },
    ];
    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
            onClick={handleClose}
        >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="mt-[100px] flex min-h-full p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full lg:w-[70%] mx-auto">
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                            className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                        >
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3
                                    className="text-lg font-medium leading-6 text-gray-900"
                                    id="modal-title"
                                >
                                    Quote data
                                </h3>
                                <div className="flex w-full flex-col bquote bquote-bquote-200 bg-white">
                                    <div className="flex flex-col items-center p-5 md:flex-row md:justify-between">
                                        <h2 className="mb-2 flex text-sm font-semibold text-heading md:text-lg">
                                            Quote Details
                                            <span className="px-2">-</span>
                                            334983046149
                                        </h2>
                                    </div>
                                    <div className="relative mx-5 mb-6 overflow-hidden rounded">
                                        <div className="bg-[#F7F8FA] px-7 py-4">
                                            <div className="mb-0 flex flex-col flex-wrap items-center justify-between gap-x-8 text-base font-bold text-heading sm:flex-row lg:flex-nowrap">
                                                <div className="quote-2 flex w-full gap-6 xs:flex-nowrap sm:quote-1 max-w-full basis-full justify-between">
                                                    <div className="flex flex-wrap items-center">
                                                        <span className="mb-2 block text-xs xs:text-base lg:mb-0 lg:inline-block lg:ltr:mr-4 lg:rtl:ml-4">
                                                            Quote Status :
                                                        </span>
                                                        <div className="w-full lg:w-auto">
                                                            {quoteStatus(
                                                                data.status
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap items-center">
                                                        <span className="mb-2 block text-xs xs:text-base lg:mb-0 lg:inline-block lg:ltr:mr-4 lg:rtl:ml-4">
                                                            Payment Status :
                                                        </span>
                                                        <div className="w-full lg:w-auto">
                                                            <span className="px-3 py-1 rounded-full text-sm text-light bg-[#F59E0B] min-h-[2rem] items-center justify-center text-[9px] !leading-none xs:text-sm inline-flex">
                                                                COD
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col bquote-b bquote-bquote-200 sm:flex-row">
                                        <div className="flex w-full flex-col bquote-b bquote-bquote-200 px-5 py-4 sm:bquote-b-0 ltr:sm:bquote-r rtl:sm:bquote-l md:w-3/5">
                                            <div className="mb-4">
                                                <span className="mb-2 block text-sm font-bold text-heading">
                                                    Name
                                                </span>
                                                <span className="text-sm text-body">
                                                    {data.name}
                                                </span>
                                            </div>
                                            <div className="mb-4">
                                                <span className="mb-2 block text-sm font-bold text-heading">
                                                    Shipping Address
                                                </span>
                                                <span className="text-sm text-body">
                                                    {data.address}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex w-full flex-col px-5 py-4 md:w-2/5">
                                            <div className="mb-3 flex justify-between">
                                                <span className="text-sm text-body">
                                                    Sub Total
                                                </span>
                                                <span className="text-sm text-heading">
                                                    $5.00
                                                </span>
                                            </div>
                                            <div className="mb-3 flex justify-between">
                                                <span className="text-sm text-body">
                                                    Discount
                                                </span>
                                                <span className="text-sm text-heading">
                                                    $0.00
                                                </span>
                                            </div>
                                            <div className="mb-3 flex justify-between">
                                                <span className="text-sm text-body">
                                                    Delivery Fee
                                                </span>
                                                <span className="text-sm text-heading">
                                                    $50.00
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span className="text-sm font-bold text-heading">
                                                    Total
                                                </span>
                                                <span className="text-sm font-bold text-heading">
                                                    {data.total + " LKR"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Table
                                            columns={columns}
                                            dataSource={data.products}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuotetModal;
