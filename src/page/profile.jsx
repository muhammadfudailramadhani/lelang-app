import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { base_url, getProfile, headers } from "../api/api_service";
import Alert from "../component/alert";
import Header from "../component/header";
import Navbar from "../component/navbar";
import Padding from "../component/padding";

export default function Profile() {
  const { data } = useQuery("profile", () => getProfile(), {
    refetchInterval: 5000,
  });
  const [open, setOpen] = useState(false);

  const [img, setImg] = useState();
  const [imgData, setImgData] = useState();
  const [isImage, setIsImage] = useState(false);
  const [msgImage, setMsgImage] = useState("");
  const [change, setChange] = useState("");

  function getImage(e) {
    if (e.target.files && e.target.files[0]) {
      if (
        e.target.files[0].type === "image/jpeg" ||
        e.target.files[0].type === "image/jpg" ||
        e.target.files[0].type === "image/png"
      ) {
        setImg(URL.createObjectURL(e.target.files[0]));
        setImgData(e.target.files[0]);
        setIsImage(true);
        setMsgImage("");
      } else {
        setMsgImage("Hanya file ber-ekstensi .jpeg, .jpg, .png");
      }
    }
  }
  async function updateImage() {
    try {
      let url = `${base_url}/user/update`;
      let formdata = new FormData();
      formdata.append("photoProfile", imgData);
      await axios.put(url, formdata, headers);
      setIsImage(false);
    } catch (er) {
      console.log(er);
    }
  }
  return (
    <React.Fragment>
      <Alert open={open} change={change} setOpen={setOpen} />
      <Padding>
        <div className="flex">
          <Navbar />
          <div className="flex flex-col w-full pr-24">
            {/* <Header /> */}
            <div className="pl-20 mt-10 flex space-x-36">
              <div className="flex flex-col justify-center space-y-5 w-1/4 items-center">
                <div
                  style={{
                    backgroundImage: `url(${
                      img === undefined ? data?.photoProfile : img
                    })`,
                  }}
                  className="h-52 w-52 bg-cover bg-center bg-gray-500 rounded-full"
                ></div>
                <small className="text-xs italic text-red-500">
                  {msgImage}
                </small>
                <div className="flex">
                  <button
                    type="button"
                    className="flex relative flex-col text-sm text-[#848484] cursor-pointer border-2 border-[#848484] rounded-md px-4 py-1"
                  >
                    Ganti foto
                  </button>
                  <input
                    accept=".jpg, .jpeg, .png"
                    onChange={getImage}
                    type="file"
                    className="absolute w-28 block opacity-0 cursor-pointer"
                  />
                </div>
                {isImage ? (
                  <div className="flex space-x-4">
                    <div className="">
                      <button
                        onClick={() => {
                          setIsImage(false);
                          setImg();
                        }}
                        className="text-sm px-5 py-1 bg-red-600 absolute blur rounded-md opacity-40"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setIsImage(false);
                          setImg();
                        }}
                        className="text-sm px-5 py-1 text-white bg-red-600 relative rounded-md transition ease-in-out hover:scale-110"
                      >
                        Cancel
                      </button>
                    </div>
                    <div>
                      <button className="text-sm px-5 py-1 bg-blue-theme rounded-md transition ease-in-out hover:scale-110 absolute blur opacity-40">
                        Update
                      </button>
                      <button
                        onClick={updateImage}
                        className="text-sm relative px-5 py-1 text-white bg-blue-theme rounded-md transition ease-in-out hover:scale-110"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="">
                <h1 className="text-2xl mb-5 font-semibold">
                  Profile
                </h1>
                <p className="font-bold text-sm mb-6 text-[#828282]">
                  Nama
                  <span className="font-normal mx-6">{data?.name}</span>
                  <span>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setChange("name");
                      }}
                      className="text-xs border border-[#626267] text-[#626267] px-4 py-0.5 rounded-md relative transition ease-out hover:scale-110"
                    >
                      Edit
                    </button>
                  </span>
                </p>
                <p className="font-bold text-sm mb-6 text-[#828282]">
                  Username
                  <span className="font-normal mx-6">{data?.username}</span>
                  <span>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setChange("username");
                      }}
                      className="text-xs border border-[#626267] text-[#626267] px-4 py-0.5 rounded-md relative transition ease-out hover:scale-110"
                    >
                      Edit
                    </button>
                  </span>
                </p>
                <p className="font-bold text-sm mb-6 text-[#828282]">
                  Email
                  <span className="font-normal mx-6">{data?.email}</span>
                </p>
                <p className="font-bold text-sm mb-6 text-[#828282]">
                  Password
                  <span className="font-normal mx-6">****************</span>
                  <span>
                    <button
                      onClick={() => {
                        setOpen(true);
                        setChange("password");
                      }}
                      className="text-xs border border-[#626267] text-[#626267] px-4 py-0.5 rounded-md relative transition ease-out hover:scale-110"
                    >
                      Edit
                    </button>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Padding>
    </React.Fragment>
  );
}
