import Link from "next/link";
import Logo from "../../public/logo.svg";
import Background from "../../public/bg.svg";
import Image from "next/image";
import { Fragment, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();
  const [confirmPassword, setConfirmPasword] = useState("");
  const [isError, setIsError] = useState("");
  const [form, setForm] = useState({
    nama: "",
    email: "",
    phone: "",
    sandi: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const checkValidation = (e) => {
    const confirm = e.target.value;
    setConfirmPasword(confirm);
    const cek = form.sandi;
    if (cek !== confirm) {
      setIsError("Password not match!");
    } else {
      setIsError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cek = form.sandi;

    if (cek !== confirmPassword) {
      return;
    }
    axios
      .post(process.env.NEXT_PUBLIC_API + "/worker/register", form)
      .then((res) => {
        Swal.fire({
          text: res.data.message,
          icon: "success",
        });
        router.replace("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <style jsx>
        {`
          body {
            padding: 30px 0;
          }

          .test {
            background-color: salmon;
          }
          .h {
            height: 90vh;
          }

          .a {
            background-color: #3913faa4;
          }

          .bg {
            box-sizing: border-box;
            background-size: cover;
          }

          .h-bg {
            height: 100%;
          }

          .text {
            width: 400px;
          }

          .logo {
            margin: 15px 50px;
          }

          .logo img {
            width: 70px;
          }

          .title {
            height: 80%;
          }

          .btn-w {
            width: 100%;
            color: #fff;
            font-weight: bold;
            border-radius: 4px;
            padding: 7px 12px;
          }

          .btn-w:hover {
            color: #fff !important;
          }

          .h-form {
            height: 100%;
            box-sizing: border-box;
            padding: 0 50px;
          }

          input {
            padding: 10px 15px !important;
            border-radius: 4px !important;
          }

          .row > * {
            padding-right: 0;
            padding-left: 0;
          }
          @media only screen and (max-width: 600px) {
            .responsiv {
              display: none;
            }
            p {
              font-size: 15px;
            }
          }
        `}
      </style>

      {/* content */}

      <div className="container mt-4">
        <main>
          <div className="row h">
            <div
              className="col-lg-6 bg h-bg responsiv"
              style={{
                backgroundImage: `url(${Background.src})`,
              }}
            >
              <div className="a h-bg">
                <div className="row">
                  <div className="col logo">
                    <Image src={Logo} alt="" width="100" height="" />
                  </div>
                </div>
                <div className="title d-flex justify-content-center align-items-center">
                  <div className="text">
                    <h1 className="text-light">
                      Temukan developer berbakat & dan terbaik di berbagai
                      bidang pilihan
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            {/* form */}
            <div className="col-lg-6">
              <section className="d-flex justify-content-center align-items-center h-form">
                <div>
                  <h1>Halo, Pewpeople</h1>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Similique autem molestiae, aut quaerat maxime voluptatum.
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="nama">Nama</label>
                      <input
                        type="text"
                        className="form-control mt-1"
                        placeholder="Masukan nama panjang"
                        id="nama"
                        name="nama"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Masukan alamat email"
                        id="email"
                        name="email"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="phone">No handphone</label>
                      <input
                        type="text"
                        className="form-control mt-1"
                        placeholder="Masukan no handphone"
                        id="phone"
                        name="phone"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="psw">Kata sandi</label>
                      <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Masukan kata sandi"
                        id="psw"
                        name="sandi"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mt-3">
                      <label htmlFor="confirm-psw">Konfirmasi kata Sandi</label>
                      <input
                        type="password"
                        className="form-control mt-1"
                        placeholder="Masukan konfirmasi kata sandi"
                        id="confirm-psw"
                        name="confirm"
                        onChange={(e) => checkValidation(e)}
                      />
                      <p className="text-danger">{isError}</p>
                    </div>
                    <button
                      type="submit"
                      className="btn-w btn btn-warning mt-4"
                    >
                      Daftar
                    </button>
                    <p className="text-center mt-3">
                      Anda sudah punya akun?{" "}
                      <Link href="/login">masuk disini</Link>
                    </p>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
}
