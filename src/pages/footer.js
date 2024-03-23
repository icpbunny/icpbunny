import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="middle_cont">
        <div className="container-lg">
          <div className="row">
            <div className="col-md-12">
              <div className="btm_details_boxex text-center pb-5 mb-5">
                <h2>Follow Us</h2>
                <div className="social-icon-top mb-3">
                  <a
                    href="https://discord.gg/FdUcCS3w6S"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-discord"></i>
                  </a>
                  <a
                    href="https://twitter.com/ICPBunny"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCFUfnEkDSPpElfwcVxSZ6qA"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    href="https://t.me/icp_bunny"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-telegram"></i>
                  </a>
                  <a
                    href="https://medium.com/@icpnbunny"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fab fa-medium"></i>
                  </a>
                  <a
                    href="https://linktr.ee/icpbunny"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fas fa-tree"></i>
                  </a>
                </div>
                <div className="details_box">
                  <p>
                    {/* Buy from Entrpot{" "} */}
                    <a
                      target="_blank"
                      href="https://entrepot.app/marketplace/icpbunny"
                      rel="noreferrer"
                    >
                      Buy from Entrepot
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
