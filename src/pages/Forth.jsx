import React, { Fragment, useState } from "react";
import QRCode from "react-qr-code";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import CountDown from "../components/CountDown";

export default function Forth() {
  const networks = [
    { id: 1, name: "ETH", subname: "ERC20" },
    { id: 2, name: "TRX", subname: "TRC20" },
    { id: 3, name: "BSC", subname: "BEP20" },
  ];

  const currencies = [
    { id: 1, name: "BUSD" },
    { id: 2, name: "USDT" },
  ];

  const addresses = [
    { id: 1, name: "0x4ced781e7586be8b0a7ae284a883eccd9d409c54" },
    { id: 2, name: "TSv7u97cXVqrWcZ23vsTkCFk6dRnvNcVPw" },
    { id: 3, name: "0xab24fceac4092f81c7fcfc55ebb6fbae34b839e9" },
  ];

  const [selectedNetwork, setSelectedNetwork] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState();

  const [query, setQuery] = useState("");

  const filteredNetwork =
    query === ""
      ? networks
      : networks.filter((network) =>
          network.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const filteredCurrency =
    query === ""
      ? currencies
      : currencies.filter((currency) =>
          currency.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  return (
    <div className="pt-24">
      <div className="container mx-auto">
        <div className=" md:justify-start flex justify-between flex-row flex-wrap">
          <div className="sm:text-start text-4xl font-bold text-center">
            Limitted offer, for 6 hours only!
          </div>
          <div className="sm:text-start max-sm:w-full max-sm:m-0 text-4xl font-bold text-center ml-10">
            <CountDown />
          </div>
        </div>
        <div className="flex justify-center mt-16 flex-wrap">
          <ol className="max-w-[500px] w-full relative text-gray-500 border-l border-gray-200 dark:border-gray-700 max-w-[500px]">
            <li className="mb-10 ml-6">
              <span
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white ${
                  selectedCurrency ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <svg
                  className="w-3.5 h-3.5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              </span>
              <h3 className="font-medium leading-tight mb-3">
                Choose the currency
              </h3>
              <Combobox value={selectedCurrency} onChange={setSelectedCurrency}>
                <div className="relative mt-1">
                  <div className="relative w-full cursor-default overflow-hidden rounded-md border-2 border-gray-400 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                      className="w-full border-none text-lg py-6 pl-4 pr-10 leading-5 text-gray-900 focus:ring-0 focus:outline-none"
                      displayValue={(selectedCurrency) => selectedCurrency.name}
                      placeholder="select network"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                    className=" z-10"
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredCurrency.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredCurrency.map((currency) => (
                          <Combobox.Option
                            key={currency.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-teal-600 text-white"
                                  : "text-gray-900"
                              }`
                            }
                            value={currency}
                          >
                            {({ selectedCurrency, active }) => (
                              <>
                                <span
                                  className={`block truncate text-lg ${
                                    selectedCurrency ? "font-bold" : "font-bold"
                                  }`}
                                >
                                  {currency.name}
                                </span>
                                <span>{currency.subname}</span>
                                {selectedCurrency ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? "text-white" : "text-teal-600"
                                    }`}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </li>
            <li className="mb-10 ml-6">
              <span
                className={`absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white ${
                  selectedNetwork ? "bg-green-500" : "bg-gray-400"
                }`}
              >
                <svg
                  className="w-3.5 h-3.5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              </span>
              <h3 className="font-medium leading-tight mb-3">Select network</h3>
              <Combobox value={selectedNetwork} onChange={setSelectedNetwork}>
                <div className="relative mt-1">
                  <div className="relative w-full cursor-default overflow-hidden rounded-md border-2 border-gray-400 bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                      className="w-full border-none text-lg py-6 pl-4 pr-10 leading-5 text-gray-900 focus:ring-0 focus:outline-none"
                      displayValue={(selectedNetwork) => selectedNetwork.name}
                      placeholder="select network"
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredNetwork.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredNetwork.map((network) => (
                          <Combobox.Option
                            key={network.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-teal-600 text-white"
                                  : "text-gray-900"
                              }`
                            }
                            value={network}
                          >
                            {({ selectedNetwork, active }) => (
                              <>
                                <span
                                  className={`block truncate text-lg ${
                                    selectedNetwork ? "font-bold" : "font-bold"
                                  }`}
                                >
                                  {network.name}
                                </span>
                                <span>{network.subname}</span>
                                {selectedNetwork ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                      active ? "text-white" : "text-teal-600"
                                    }`}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
            </li>
            <li className="ml-6">
              <span
                className={`absolute flex items-center justify-center w-8 h-8 ${
                  selectedNetwork && selectedCurrency
                    ? "bg-green-600"
                    : "bg-gray-400"
                } rounded-full -left-4 ring-4 ring-white`}
              >
                <svg
                  className="w-3.5 h-3.5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              </span>
              <h3 className="font-medium leading-tight mb-3">
                Deposit Address
              </h3>
              {selectedNetwork ? (
                <div className="block border-2 border-gray-400 rounded-md">
                  <div className="flex items-center p-5 border-b-2 border-gray-400">
                    <div className="flex-col w-[70px]">
                      <QRCode
                        size={256}
                        style={{
                          height: "auto",
                          maxWidth: "100%",
                          width: "100%",
                        }}
                        value={
                          addresses[
                            selectedNetwork ? selectedNetwork.id - 1 : ""
                          ].name
                        }
                        viewBox={`0 0 256 256`}
                      />
                    </div>
                    <div className="block ml-5">
                      <h1 className="font-medium mb-2">
                        {selectedNetwork ? selectedNetwork.name : "Empty"}{" "}
                        Address
                      </h1>
                      <div className="flex">
                        <p className="w-full text-black font-medium break-all">
                          {selectedNetwork
                            ? addresses[selectedNetwork.id - 1].name
                            : "Empty"}
                        </p>
                        <CopyToClipboard
                          text={
                            selectedNetwork
                              ? addresses[selectedNetwork.id - 1].name
                              : "Empty"
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 ml-2 cursor-pointer"
                          >
                            <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 013.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0121 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 017.5 16.125V3.375z" />
                            <path d="M15 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0017.25 7.5h-1.875A.375.375 0 0115 7.125V5.25zM4.875 6H6v10.125A3.375 3.375 0 009.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V7.875C3 6.839 3.84 6 4.875 6z" />
                          </svg>
                        </CopyToClipboard>
                      </div>
                    </div>
                  </div>
                  <div className="block p-5 pt-3">
                    <div className="flex items-center justify-between border-b border-gray-400 pt-2 pb-1">
                      <h1>Minimum deposit amount</h1>
                      <p className="text-black font-medium">0.001 BUSD</p>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-400 pt-2 pb-1">
                      <h1>Expected Arrival</h1>
                      <p className="text-black font-medium">
                        64 network confirmation
                      </p>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-400 pt-2 pb-1">
                      <h1>Contract address</h1>
                      <p className="text-black font-medium">
                        Ending with{" "}
                        <a href="" className=" text-blue-700 underline">
                          c7c53
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-gray-400 rounded-md">
                  <div className="p-5">
                    <div
                      role="status"
                      class="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
                    >
                      <div class="flex items-center justify-center bg-gray-300 rounded sm:w-[120px] sm:h-[75px] dark:bg-gray-400">
                        <svg
                          class="w-10 h-10 text-gray-200 dark:text-gray-600"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                      <div class="w-full">
                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-400 w-48 mb-4"></div>
                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-400 max-w-[480px] mb-2.5"></div>
                        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-400 mb-2.5"></div>
                      </div>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>

                  <div className="border-t-2 border-y-gray-400 p-5">
                    <div
                      role="status"
                      class="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                    >
                      <div class="flex items-center justify-between">
                        <div>
                          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                        </div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
                      </div>
                      <div class="flex items-center justify-between pt-4">
                        <div>
                          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                        </div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
                      </div>
                      <div class="flex items-center justify-between pt-4">
                        <div>
                          <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-400"></div>
                        </div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-400 w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ol>
          {selectedNetwork && selectedCurrency ? (
            <div className="w-full">
              <div className="w-full flex justify-center mt-10">
                <a
                  href="fifth"
                  className=" sm:w-fit w-full cursor-pointer bg-yellow-400 py-2 px-6 rounded-md hover:bg-yellow-500 text-xl"
                >
                  Confirm
                </a>
              </div>
              <div className="mt-1 text-green-600 text-center">
                If you successfully paid, kindly click on confirm
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
