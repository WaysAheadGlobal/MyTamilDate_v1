import React from 'react'
import styles from "./upgrade.module.css"

const upgradenow = ({ShowUpgrade}) => {
    const [ShowUpgrade, setShowUpgrade] = useState(ShowUpgrade);
  return (
    <div>
      <Modal centered className="selfie-modal" show={ShowUpgrade} onHide={() => setShowUpgrade(false)}>
                    <Modal.Body className='selfie-modal-body'>
                        <p className={styles.headinglable}>
                        Upgrade to Premium & 
                        Unlock Exclusive Features
                        </p>
               
                        {/* <Button variant="secondary" className='duplicate-name-modal-btn' onClick={() => setShowDuplicateNameModal(false)}>
                            Close
                        </Button> */}
                        <div className={styles.lastbox}>
                        <p className={styles.detailstext}>
                        As a Premium member, you can send unlimited messages, see who liked you, view all matches, access special events, and much more!
                        </p>
                        <div style={{marginTop : "65px"}}>
                        <button  type="submit" className='global-save-button'  onClick={() => setShowUpgrade(false)}>
                        Upgrade Now
                            </button>
                        </div>
                        </div>
                    </Modal.Body>
                </Modal>

    </div>
  )
}

export default upgradenow