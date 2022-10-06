import React, { useState, useEffect } from "react";
import Image from "next/image";
import location from "../../public/location.svg";
import edit from "../../public/edit.svg";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import defaultPhoto from "../../public/default-photo.jpg";

const EditProfile = ({ id }) => {
  const [data, setData] = useState([]);
  const [saveImage, setSaveImage] = useState(null);
  function handleUpload(e) {
    console.log(e.target.files[0]);
    const uploader = e.target.files[0];
    setSaveImage(uploader);
  }
  const [form, setForm] = useState({
    nama: "",
    job_desc: "",
    domisili: "",
    tempat_kerja: "",
    deskripsi_singkat: "",
    photo: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const formData = new FormData();
  formData.append("nama", form.nama);
  formData.append("job_desc", form.job_desc);
  formData.append("domisili", form.domisili);
  formData.append("tempat_kerja", form.tempat_kerja);
  formData.append("deskripsi_singkat", form.deskripsi_singkat);
  formData.append("photo", saveImage);

  const dataPribadiSubmit = (e) => {
    e.preventDefault();
    // forHtml (let [key, value] of formData) {
    //   console.log(`${key}: ${value}`);
    // }
    axios
      .put(process.env.NEXT_PUBLIC_API + "/worker/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        Swal.fire({
          text: res.data.message,
          icon: "success",
        });
        console.log("res :", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API + "/worker/" + id)
      .then((res) => {
        setData(res.data.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <style jsx>{`
        .btn-w {
          width: 100%;
        }
      `}</style>
      <div className="col-lg-4 offset-lg-1">
        <div className="card p-lg-3 px-3 py-lg-3">
          <div className="col-lg-12 mt-3 d-flex justify-content-center test">
            <div className="col-lg-4">
              {!data.photo ? (
                <Image
                  src={defaultPhoto}
                  width="100px"
                  height="100px"
                  alt="avatar"
                />
              ) : (
                <Image
                  src={data.photo}
                  width="100px"
                  height="100px"
                  alt="avatar"
                />
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Image src={edit} alt="edit" />
            <input
              type="file"
              onChange={handleUpload}
              id="phto"
              style={{ display: "none" }}
            />
            <label htmlFor="phto">
              <h4 className="ms-2 text-secondary">Edit</h4>
            </label>
          </div>
          <h5>{data.nama}</h5>
          <h6>Web developer</h6>
          <div className="d-flex">
            <Image src={location} alt="location" />
            <span className="ms-2">{data.domisili}</span>
          </div>
          <strong className="mb-3">{data.job_desc}</strong>
        </div>
        <Link href={`/home/${id}`}>
          <button className="btn btn-warning btn-w mt-4">Detail</button>
        </Link>
        <button
          className="btn btn-primary btn-w mt-4"
          onClick={dataPribadiSubmit}
        >
          Simpan
        </button>

        <button className="btn btn-light btn-outline-primary btn-w mt-4">
          Batal
        </button>
      </div>
      <div className="col-lg-6 mt-4">
        <div className="card">
          <h4 className="ms-4 mt-4">Data diri</h4>
          <hr />
          <form onSubmit={dataPribadiSubmit}>
            <div className="container">
              <div className="mb-3 mx-4">
                <label forHtml="name">Nama lengkap</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Masukan nama lengkap"
                  id="name"
                  name="nama"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 mx-4">
                <label forHtml="job">Job desk</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Masukan job desk"
                  id="job"
                  name="job_desc"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 mx-4">
                <label forHtml="domisili">Domisili</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Masukan domisilis"
                  id="domisili"
                  name="domisili"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3 mx-4">
                <label forHtml="tempat-kerja">Tempat kerja</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Masukan tempat kerja"
                  id="tempat-kerja"
                  name="tempat_kerja"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5 mx-4">
                <label forHtml="deskripsi">Deskripsi singkat</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Tulis deskripsi singkat"
                  id="deskripsi"
                  name="deskripsi_singkat"
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
