import { Avatar } from "@mui/material";
import Navbar from "../component/navbar";
import Padding from "../component/padding";
import Title from "../component/title";
import medal from "../assets/top-rated.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  base_url,
  getDetailBarang,
  headers,
  listPenawar,
  token,
} from "../api/api_service";
import axios from "axios";
import { convert } from "rupiah-format";
import { useQuery } from "react-query";
import CurrencyInput from "react-currency-input-field";
import { useForm } from "react-hook-form";

export default function Penawaran() {
  const { id } = useParams();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { data } = useQuery("penawaran", () => listPenawar(id), {
    refetchInterval: 3000,
  });

  const detail = useQuery("detail", () => getDetailBarang(id), {
    refetchInterval: 3000,
  });
  const [price, setPrice] = useState(0);

  async function postPenawaran() {
    try {
      let url = `${base_url}/lelang/penawaran/${id}`;
      await axios.post(url, { hargaAkhir: price }, headers);
      setError("");
    } catch (er) {
      setError(er.response.data.message);
    }
  }
  return (
    <>
      <Padding>
        <div className="flex">
          <Navbar />
          <div className="flex flex-col w-full pr-24">
            <div className="pl-20 mt-10 lg:flex space-x-9">
              {detail?.data?.map((i, detail) => {
                document.title = `${i.namaBarang} - Penawaran`;
                if (i.status === "closed")
                  return navigate(`/`, { replace: true });
                return (
                  <div key={detail} className="w-2/4">
                    <div
                      style={{
                        backgroundImage: `url(${i.fotoBarang})`,
                      }}
                      className="bg-gray-500 mb-5 lg:h-72 h-44 w-full lg:w-full px-2 py-3 flex justify-end rounded-lg bg-cover"
                    ></div>
                    <Title text={i.namaBarang} />
                    <p className="text-sm mt-1">
                      Harga awal{" "}
                      <span className="font-semibold">
                        {convert(i.hargaAwal).substring(
                          0,
                          convert(i.hargaAwal).length - 3
                        )}
                      </span>
                    </p>
                  </div>
                );
              })}
              <div className="w-2/5">
                <div className="flex flex-col w-full">
                  {data?.map((i, penawar) => {
                    if (penawar === 0) {
                      return (
                        <Top
                          key={penawar}
                          price={convert(i.penawaranHarga)}
                          img={i.photoProfile}
                        />
                      );
                    } else {
                      return (
                        <div
                          key={penawar}
                          className="flex w-full items-center space-x-9 px-8 mt-5 text-[#727276]"
                        >
                          <div className="flex items-center space-x-6">
                            <Avatar src={i.photoProfile} />
                            <p className="font-medium text-xl">{penawar + 1}</p>
                          </div>
                          <p className="font-medium text-xl">
                            {convert(i.penawaranHarga).substring(
                              0,
                              convert(i.penawaranHarga).length - 3
                            )}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="w-full mt-10">
                  <form onSubmit={handleSubmit(postPenawaran)}>
                    <CurrencyInput
                      {...register("hargaAkhir")}
                      className="bg-gray-form border-gray-input border rounded-md h-8 outline-none px-3 lg:w-full text-sm"
                      placeholder="Ketik penawaranmu"
                      prefix="Rp. "
                      defaultValue={0}
                      decimalsLimit={2}
                      onValueChange={(value) => setPrice(value)}
                    />
                    <small className="text-red-500 mt-2 text-xs">{error}</small>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Padding>
    </>
  );
}

function Top({ price, name, email, img }) {
  return (
    <>
      <div className="bg-gradient-to-r text-white from-[#FFA722] to-[#FFD200] w-full flex items-center py-3 px-8 rounded-lg space-x-3">
        <Avatar src={img} />
        <img src={medal} alt={medal} className="h-10" />
        <p className="font-semibold text-xl">
          {price.substring(0, price.length - 3)}
        </p>
      </div>
    </>
  );
}
