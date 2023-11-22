import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { toast } from "react-toastify";

import { getQuotes, deleteQuote } from "../../../../http/quote";

import QuoteDataModal from "./QuoteDataModal";

import { Button, Confirm } from "../../../../components/ui";

const QuoteList = () => {
    const [Quotes, setQuotes] = useState([]);
    const [quoteDataModalState, setQuoteDataModalState] = useState(false);
    const [confirmModalState, setConfirmModalState] = useState(false);
    const [selectedQuote, setSelectedQuote] = useState(null);

    const inputDataStructure = {
        query: {
            key: "query",
            label: "",
            placeholder: "Search",
            value: "",
            type: "text",
            isValid: true,
            error: "",
        },
        team: {
            key: "team",
            label: "",
            value: "",
            optList: [
                { id: "all", title: "All teams" },
                { id: "eb", title: "Execetive Board" },
                { id: "tvc", title: "Thrust Vector Controlling" },
                { id: "tc", title: "Thrust Controlling" },
                { id: "body", title: "Body & Assembling" },
                { id: "safety", title: "Recovery & Safety" },
                { id: "launch", title: "Launching & Navigation" },
            ],
            isValid: true,
            error: "",
        },
    };

    const [inputs, setInputs] = useState(inputDataStructure);

    const handleView = (Quote) => {
        setSelectedQuote(Quote);
        setQuoteDataModalState(true);
    };

    const handleDelete = async () => {
        console.log(selectedQuote);
        try {
            await deleteQuote(selectedQuote.id);
            setConfirmModalState(false);
            setSelectedQuote(null);

            refreshQuotes();
            toast.success("Quote deleted successfully");
        } catch (e) {}
    };

    const handleCloseModal = () => {
        refreshQuotes();
        setQuoteDataModalState(false);
        setConfirmModalState(false);
        setSelectedQuote(null);
    };

    const handleChange = (e, input) => {
        input.value = e.target.value;
        input.is_valid = e.target.value ? true : false;
        input.error = e.target.value ? "" : "Please input the password";

        let input_list = { ...inputs };
        input_list[input.key] = input;
        setInputs(input_list);
    };

    const refreshQuotes = () => {
        try {
            getQuotes(Quotes).then((data) => {
                setQuotes(data);
            });
        } catch (e) {}
    };

    useEffect(() => {
        refreshQuotes();
        const intervalId = setInterval(refreshQuotes, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const status = (quote) => {
        let classes =
            "cursor-pointer inline-flex items-center justify-center px-2  py-1 mr-2 text-xs font-bold leading-none text-red-100 rounded-full";

        switch (quote.status) {
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

        return (
            <div>
                <span
                    onClick={() => {
                        setSelectedQuote(quote);
                    }}
                    className={classes}
                >
                    {quote.status}
                </span>
            </div>
        );
    };

    const actionBtns = (Quote) => {
        return (
            <div className="flex">
                <Button
                    text="Delete"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => {
                        setSelectedQuote(Quote);
                        setConfirmModalState(true);
                    }}
                />

                <Button
                    text="View"
                    className={
                        "ml-3 hover:bg-primary hover:text-white px-[14px]"
                    }
                    handleClick={() => {
                        handleView(Quote);
                    }}
                />
            </div>
        );
    };

    const formatDate = (value) => {
        {
            let date = new Date(value);
            const day = date.toLocaleString("default", { day: "2-digit" });
            const month = date.toLocaleString("default", {
                month: "short",
            });
            const year = date.getFullYear();
            return day + "-" + month + "-" + year;
        }
    };

    const columns = [
        {
            title: "Name",
            align: "center",
            width: "20%",
            render: (arg) => {
                return arg.user.name;
            },
            sorter: (a, b) => a.user.name.localeCompare(b.user.name),
        },
        {
            title: "Phone number",
            align: "center",
            width: "20%",
            render: (arg) => {
                return arg.user.phoneNumber;
            },
            sorter: (a, b) =>
                a.user.phoneNumber.localeCompare(b.user.phoneNumber),
        },
        {
            title: "Total (LKR)",
            dataIndex: "total",
            align: "center",
            width: "10%",
            sorter: (a, b) => a.total - b.total,
        },

        {
            title: "Status",
            align: "center",
            width: "20%",
            render: (arg) => status(arg),
        },
        {
            title: "Date",
            align: "center",
            width: "30%",
            render: (arg) => formatDate(arg.createdAt),
        },
        {
            title: "Operations",
            align: "center",
            width: "20%",
            render: (arg) => actionBtns(arg),
        },
    ];

    return (
        <section className="w-full">
            {quoteDataModalState && (
                <QuoteDataModal
                    handleClose={handleCloseModal}
                    data={selectedQuote}
                />
            )}
            {confirmModalState && (
                <Confirm
                    cancelHandler={handleCloseModal}
                    confirmHandler={handleDelete}
                />
            )}

            <Table columns={columns} dataSource={Quotes} />
        </section>
    );
};

export default QuoteList;
