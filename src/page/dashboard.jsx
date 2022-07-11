import React, { useEffect, useState } from "react";
import Header from "../component/header";
import Navbar from "../component/navbar";
import Padding from "../component/padding";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";
import Kategori from "../component/kategori";
import Title from "../component/title";
import Card from "../component/card";
import { useQuery } from "react-query";
import { base_url, getNol, headers } from "../api/api_service";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { convert } from "rupiah-format";

export let month = [
  "januari",
  "februari",
  "maret",
  "april",
  "mei",
  "juni",
  "juli",
  "agustus",
  "september",
  "oktober",
  "november",
  "desember",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { data } = useQuery("nol", () => getNol(), { refetchInterval: 3000 });
  const [other, setOther] = useState([]);

  async function getOther() {
    try {
      let url = `${base_url}/barang/other`;
      let res = await axios.get(url, headers);
      setOther(res?.data.data);
    } catch (er) {
      console.log(er);
    }
  }

  useEffect(() => {
    getOther();
  }, []);

  return (
    <React.Fragment>
      <Padding>
        <div className="flex">
          <Navbar />
          <div className="flex flex-col w-full pr-24">
            <Header />
            <div className="pl-20 mt-10">
              <Title text={"From Rp 0"} />
              <Swiper
                centeredSlides={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={true}
                modules={[Navigation, Autoplay, Pagination]}
                spaceBetween={50}
                slidesPerView={2}
                loop
              >
                {data?.map((i, nol) => {
                  let date = new Date(i.tanggal);
                  return (
                    <SwiperSlide
                      key={nol}
                      onClick={() => navigate(`/detail/${i.id}`)}
                    >
                      <div
                        style={{ backgroundImage: `url(${i.fotoBarang})` }}
                        className="h-72 w-full cursor-pointer rounded-lg mt-5 bg-gray-600 bg-cover"
                      >
                        <div className="bg-gradient-to-t from-black px-7 bg-opacity-50 pt-52 h-full w-full rounded-lg">
                          <div className="text-white">
                            <h2 className="text-2xl font-semibold">
                              {i.namaBarang.length >= 25
                                ? `${i.namaBarang.substring(
                                    0,
                                    i.namaBarang.length - 70
                                  )}.....`
                                : i.namaBarang}
                            </h2>
                            <p className="capitalize text-sm">
                              {i.jam.substring(0, i.jam.length - 3)} WIB{" "}
                              {date.getDate()} {month[date.getMonth()]}{" "}
                              {date.getFullYear()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div className="flex mt-8 space-x-6 mb-7">
                <Kategori text={"Gaming"} />
                <Kategori text={"Komputer"} />
                <Kategori text={"Elektronik"} />
                <Kategori text={"Transportasi"} />
                <Kategori text={"Rumah"} />
                <Kategori text={"Perhiasan"} />
                <Kategori text={"Seni"} />
              </div>
              <Title text={"Another"} />
              <div className="grid grid-cols-4 gap-5 mt-7">
              {other?.map((i, other) => {
                  let date = new Date(i.tanggal);
                  return (
                    <Card
                      key={other}
                      id={i.id}
                      time={i.jam}
                      price={convert(i.hargaAwal)}
                      img={i.fotoBarang}
                      title={i.namaBarang}
                      date={`${date.getDate()} ${
                        month[date.getMonth()]
                      } ${date.getFullYear()}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Padding>
    </React.Fragment>
  );
}
