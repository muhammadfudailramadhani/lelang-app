import React from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { convert } from "rupiah-format";
import { getDetailBarang } from "../api/api_service";
import Header from "../component/header";
import Navbar from "../component/navbar";
import Padding from "../component/padding";
import Title from "../component/title";
import { month } from "./dashboard";

export default function Detail() {
  const { id } = useParams();
  const { data } = useQuery("detail_barang", () => getDetailBarang(id), {
    refetchInterval: 3000,
  });
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Padding>
        <div className="flex">
          <Navbar />
          <div className="flex flex-col w-full pr-24">
            <Header />
            {data?.map((i, detail) => {
              let date = new Date(i.tanggal);
              return (
                <div key={detail} className="pl-20 mt-10 lg:flex space-x-9">
                  <div
                    style={{ backgroundImage: `url(${i.fotoBarang})` }}
                    className="bg-gray-500 lg:h-72 h-44 w-full lg:w-2/4 rounded-lg bg-cover"
                  ></div>
                  <div className="w-2/4">
                    <Title text={i.namaBarang} />
                    <p className="text-sm mt-5 mb-5">{i.deskripsi}</p>
                    <Title text={"Info"} />
                    <p className="lg:text-sm text-xs mt-3">
                      Dimulai pada{" "}
                      <span className="font-semibold">
                        {i.jam.substring(0, i.jam.length - 3)} WIB,{" "}
                        {date.getDate()} {month[date.getMonth()]}{" "}
                        {date.getFullYear()}
                      </span>
                    </p>
                    <p className="text-sm">
                      Harga awal{" "}
                      <span className="font-semibold">
                        {convert(i.hargaAwal).substring(
                          0,
                          convert(i.hargaAwal).length - 3
                        )}
                      </span>
                    </p>
                    <p className="text-sm">
                      Status{" "}
                      <span className="font-semibold">
                        {i.status}
                      </span>
                    </p>
                    <p className="text-sm">
                      Petugas{" "}
                      <span className="font-semibold">
                        {i.username}
                      </span>
                    </p>
                    <div className="mt-3">
                      {i.status === "closed" ? (
                        <button className="bg-gray-600 text-white cursor-not-allowed opacity-40 text-sm px-5 font-semibold py-1 rounded-md relative">
                          Tutup
                        </button>
                      ) : (
                        <div>
                          <div className="bg-blue-theme h-7 w-20 text-sm px-5 font-semibold py-1 rounded-md absolute blur opacity-25"></div>
                          <button
                            onClick={() => navigate(`/penawaran/${id}`)}
                            className="bg-blue-theme text-white text-sm px-5 font-semibold py-1 rounded-md relative"
                          >
                            Join
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Padding>
    </React.Fragment>
  );
}
