import React from "react";
import { useQuery } from "react-query";
import { convert } from "rupiah-format";
import { getToday } from "../api/api_service";
import Card from "../component/card";
import Header from "../component/header";
import Navbar from "../component/navbar";
import Padding from "../component/padding";
import Title from "../component/title";
import { month } from "./dashboard";

export default function Today() {
  const { data } = useQuery("today", () => getToday(), {
    refetchInterval: 5000,
  });
  return (
    <React.Fragment>
      <Padding>
        <div className="flex">
          <Navbar />
          <div className="flex flex-col w-full pr-24">
            <Header />
            <div className="pl-20 mt-10">
              <Title text={"Today"} />
              <div className="grid grid-cols-4 gap-5 mt-7">
                {data?.length === 0 ? (
                  <h1>Kosong</h1>
                ) : (
                  data?.map((i, today) => {
                    let date = new Date();
                    return (
                      <Card
                        key={today}
                        time={i.jam}
                        title={i.namaBarang}
                        date={`${date.getDate()} ${
                          month[date.getMonth()]
                        } ${date.getFullYear()}`}
                        id={i.id}
                        img={i.fotoBarang}
                        price={convert(i.hargaAwal)}
                      />
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </Padding>
    </React.Fragment>
  );
}
