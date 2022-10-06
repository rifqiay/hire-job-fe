import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const Pengalaman = ({ id }) => {
  const [pengalaman, setPengalaman] = useState({
    posisi: "",
    nama_perusahaan: "",
    bulan_tahun: "",
    deskripsi_singkat: "",
    id_worker: id,
  });

  const handlePengalaman = (e) => {
    setPengalaman({
      ...pengalaman,
      [e.target.name]: e.target.value,
    });
  };

  const submitPengalaman = (e) => {
    e.preventDefault();
    axios
      .post(process.env.NEXT_PUBLIC_API + "/experience/create", pengalaman)
      .then((res) => {
        Swal.fire({
          text: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="card">
        <h4 className="ms-4 mt-3">Pengalaman Kerja</h4>
        <hr />
        <div className="container mt-3">
          <form onSubmit={submitPengalaman}>
            <div>
              <label forHtml="posisi">Posisi</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Web developer"
                id="posisi"
                name="posisi"
                onChange={handlePengalaman}
              />
            </div>
            <div className="row mt-4">
              <div className="col">
                <div>
                  <label forHtml="nama-perusahaan">Nama perusahaan</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="PT harus bisa"
                    id="nama-perusahaan"
                    name="nama_perusahaan"
                    onChange={handlePengalaman}
                  />
                </div>
              </div>
              <div className="col">
                <div>
                  <label forHtml="bulan-tahun">Bulan/tahun</label>
                  <input
                    type="text"
                    className="form-control mt-1"
                    placeholder="Januari 2018"
                    id="bulan-tahun"
                    name="bulan_tahun"
                    onChange={handlePengalaman}
                  />
                </div>
              </div>
            </div>
            <div className=" my-4 mb-5">
              <label forHtml="deskrip">Deskripsi singkat</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Tulis deskripsi singkat"
                id="deskrip"
                name="deskripsi_singkat"
                onChange={handlePengalaman}
              />
            </div>
            <hr />
            <button className="btn btn-outline-warning btn-w my-4">
              Tambah pengalaman kerja
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Pengalaman;
