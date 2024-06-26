import React, {  useContext, useEffect, useState } from 'react'
import MainNav from '../MainNav/MainNav';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import one from '../../image/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { faSubscript } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ContextUser } from '../../context/Context';
import Subscribes from '../subscribe/Subscribes';


export default function NewsDetails() {
  const [ single, setSingle ] = useState( [] );
  const { setOpenSubscrips, openSubscrips } = useContext(ContextUser);
  const { id } = useParams();
       useEffect(() => {
         axios
           .get(`https://syrianrevolution1.com/lists/${id}`)
           .then((result) => setSingle(result.data))
           .catch((error) => console.log(error));
       }, [id]);

  ///////////////////////////////
    const [archief, setArchirf] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
      axios.get("https://syrianrevolution1.com/lists/userview").then((result) => {
        setArchirf(result.data.data);
      }).catch((error)=>console.log(error));
    }, [] );
  ///////////////////////////////
  return (
    <>
      <MainNav />
      <Navbar />
      <div className="demonstrations py-3">
        <div className="container" style={{ marginTop: "30px" }}>
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="col-md-8">
              <h4 style={{ marginBottom: "30px" }}>
                {" "}
                العنوان : {single?.name}
              </h4>
              <img
                src={`https://syrianrevolution1.com/postImages/${single?.selfImg}`}
                alt="from single new"
                style={{ width: "100%", marginBottom: "30px" }}
                className="gimg"
              />
              <h6> التفاصيل : </h6>
              <p> {single?.content !== "undefined" ? single?.content : ""}</p>
              <h6>المحافظة : </h6>
              <p>
                {single?.governorate !== "undefined" ? single.governorate : ""}
              </p>
              <h6>رابط خارجي : </h6>
              <a
                style={{ marginBottom: "40px", display: "inline-block" }}
                href={`https://${single?.externalLinks} `}
                target="_blank"
                rel="noopener noreferrer"
              >
                {single.externalLinks !== "undefined"
                  ? single.externalLinks
                  : ""}
              </a>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
                >
                  {single?.user?.selfImg !== undefined &&
                  single?.user?.selfImg !== "undefined" &&
                  single?.user?.selfImg !== "" ? (
                    <img
                      src={`https://syrianrevolution1.com/images/${single?.user?.selfImg}`}
                      alt="profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <img
                      src={one}
                      alt="profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                    />
                  )}

                  <p>{single?.user?.name}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    height: "40px",
                    backgroundColor: "#2FB9EE",
                    padding: "0 20px",
                    borderRadius: "10px",
                    color: "white",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenSubscrips(true)}
                >
                  <p style={{ fontSize: "14px", marginTop: "12px" }}>مشاركة</p>
                  <FontAwesomeIcon icon={faSubscript} />
                </div>
              </div>
            </div>
            {/* /////////////////////// */}
            <div className="lastSlider1 col-md-4">
              <div className=" muted  overflow-hidden">
                {archief.slice(0, 50).map((e,i) => (
                  <div
                    className="row border-bottom pb-2 pt-2 border-2 overflow-hidden"
                    style={ { backgroundColor: "#ECECEC" } }
                    key={i}
                  >
                    <div className="col-md-4">
                      <img
                        src={`https://syrianrevolution1.com/postImages/${e?.selfImg}`}
                        alt="lastNews"
                        className="w-100"
                      />
                    </div>
                    <div className="col-md-8">
                      <p>
                        {e?.name}
                        <br />
                        <button
                          className=" btu d-inline-block mx-1 px-3 rounded-3"
                          onClick={() => navigate(`/newsDetails/${e._id}`)}
                        >
                          المزيد
                        </button>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openSubscrips && <Subscribes />}
      <Footer />
    </>
  );
}
