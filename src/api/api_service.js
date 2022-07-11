import axios from "axios";

export let base_url = "http://localhost:9000";
export let token = localStorage.getItem("token");
export let headers = {
  headers: { authorization: `Bearer ${token}` },
};

export async function getNol() {
  try {
    let url = `${base_url}/barang/nol`;
    let res = await axios.get(url, headers);
    return res.data?.data?.rows;
  } catch (er) {
    return window.location.reload();
  }
}

export async function getDetailBarang(id) {
  try {
    let url = `${base_url}/lelang/schedule/${id}`;
    let res = await axios.get(url, headers);
    return res.data?.data;
  } catch (er) {
    console.log(er);
  }
}

export async function getProfile() {
  try {
    let url = `${base_url}/user/profile`;
    let res = await axios.get(url, headers);
    return res.data.data;
  } catch (er) {
    console.log(er);
  }
}

export async function getToday() {
  try {
    let url = `${base_url}/barang/today`;
    let res = await axios.get(url, headers);
    return res?.data?.data;
  } catch (er) {
    console.log(er);
  }
}

export async function listPenawar(id) {
  try {
    let url = `${base_url}/lelang/history/${id}`;
    let res = await axios.get(url, headers);
    return res?.data?.data;
  } catch (er) {
    console.log(er);
  }
}
