import React from 'react'
import styles from "./upgrade.module.css"

const upgradenow = ({Show, setshow}) => {
    const [ShowUpgrade, setShowUpgrade] = useState(Show);
  return (
    <div>
      <Modal centered className="selfie-modal" show={ShowUpgrade} onHide={() => setShowUpgrade(false)}>
                    <Modal.Body className='selfie-modal-body'>
                    <div style={{
                        position: "absolute",
                        backgroundColor: "#606060A3",
                        backdropFilter: "blur(1rem)",
                        inset: 0,
                        top: "5.5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                     
                    }}>
                        <div style={{
                            backgroundColor: "white",
                         
                            borderRadius: "1rem",
                            maxWidth: "330px",
                        }}>
                            <p style={{
                                fontSize: "20px",
                                fontWeight: "600",
                                margin: "0",
                               
                                color: "#424242",
                                textAlign: "center",
                                fontStyle: "Poppins",
                                padding: "1rem",

                            }}>Upgrade to Premium & 
                                Unlock Exclusive Features</p>
                            <div className={styles.likebox}>
                                <p
                                    style={{
                                        fontSize: "16px",
                                        margin: "0",
                                        textAlign: "center",
                                        color: "#515151",
                                        fontStyle: "Poppins",
                                       fontWeight : "400"

                                    }}
                                >
                                   As a Premium member, you can send unlimited messages, see who liked you, view all matches, access special events, and much more!
                                </p>
                                <div style={{
                                    marginTop: "2rem",
                                    display: "flex",
                                    gap: "1rem",
                                    marginInline: "auto",
                                    width: "fit-content"
                                }}>
                                    <div>
                                        <button className='global-next-btn' style={{
                                            background: "#fff",
                                            color: "#F76A7B",
                                        }}
                                        onClick={()=> navigate("/selectplan")}
                                        >
                                            Upgrade Now
                                        </button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                    </Modal.Body>
                </Modal>

    </div>
  )
}

export default upgradenow