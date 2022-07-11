import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { base_url, headers } from "../api/api_service";
import axios from "axios";

export default function Alert({ open, setOpen, type, change }) {
  const cancelButtonRef = useRef(null);
  const { register, handleSubmit } = useForm();

  async function onSubmit(data) {
    console.log(data);
    try {
      let url = `${base_url}/user/update`;
      await axios.put(
        url,
        {
          [change]: data?.[change],
        },
        headers
      );
      setOpen(false);
    } catch (er) {
      console.log(er);
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative bg-[#F5F4F6] transform align-middle transition-all rounded-md w-2/6 px-6 overflow-hidden inline-block">
              <div className="bg-[#F5F4F6] flex flex-col px-10 py-10 rounded-md">
                <h1 className="text-2xl font-semibold text-center">
                  Ganti {change}
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    {...register(change)}
                    type="text"
                    className="bg-gray-form border border-gray-input rounded-md h-8 outline-none pl-3 lg:w-full text-sm my-5"
                  />
                  <div>
                    <button className="bg-blue-theme text-white px-5 py-1 rounded-md text-sm absolute blur opacity-40">
                      Simpan
                    </button>
                    <button className="bg-blue-theme text-white px-5 py-1 rounded-md text-sm relative transition ease-in-out hover:scale-110">
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
