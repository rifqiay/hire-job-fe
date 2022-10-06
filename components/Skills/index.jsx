import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Skill = ({ id }) => {
  const [skill, setSkill] = useState({
    nama_skill: "",
    id_worker: id,
  });

  const handleSkill = (e) => {
    setSkill({
      ...skill,
      [e.target.name]: e.target.value,
    });
  };

  const skillSubmit = (e) => {
    e.preventDefault();
    axios
      .post(process.env.NEXT_PUBLIC_API + "/skills/create", skill)
      .then((res) => {
        Swal.fire({
          text: res.data.message,
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="card">
        <h4 className="ms-4 mt-4">Skill</h4>
        <hr />
        <div className="container">
          <div className="mb-3 ">
            <form onSubmit={skillSubmit}>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Masukan nama lengkap"
                  name="nama_skill"
                  onChange={handleSkill}
                />
                <button className="btn btn-warning ms-3">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skill;
