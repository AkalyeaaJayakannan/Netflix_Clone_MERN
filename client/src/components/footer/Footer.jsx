import React from "react";
import "./footer.scss";
import { Facebook, Instagram, Twitter, YouTube } from "@material-ui/icons";

const Footer = () => {
  return (
    <div className="footer">
      {/* <div className="footerGrid"> */}
      <div className="iconsContainer">
        <Facebook className="socialIcons" />
        <Instagram className="socialIcons" />
        <Twitter className="socialIcons" />
        <YouTube className="socialIcons" />
      </div>
      <ul className="linksContainer">
        <li className="linkWrapper">
          <a href="#" className="footerLink">
            Audio Description
          </a>
        </li>
        <li className="linkWrapper">
          <a href="#" className="footerLink">
            Help Center
          </a>
        </li>
        <li className="linkWrapper">
          <a href="#" className="footerLink">
            Gift Cards
          </a>
        </li>
        <li className="linkWrapper">
          <a href="#" className="footerLink">
            Media Center
          </a>
        </li>
        <li className="linkWrapper">
          <a href="#" className="footerLink">
            Investor Relations
          </a>
        </li>
        <li className="linkWrapper">
          <a href="#" className="footerLink">
            Jobs
          </a>
        </li>
        <li className="linkWrapper">
          <a href="#" className="footerLink">
            Terms of Use
          </a>
        </li>
        <li className="linkWrapper">
          <a href="#" className="footerLink">
            Privacy
          </a>
        </li>
        <li className="linkWrapper">
          <a href="#" className="footerLink">
            Legal Notices
          </a>
        </li>
        <li className="linkWrapper">
          <a href="#" className="footerLink">
            Cookie Preferences
          </a>
        </li>
        <li className="linkWrapper">
          <a href="#" className="footerLink">
            Corporate Information
          </a>
        </li>
        <li className="linkWrapper">
          <a href="#" className="footerLink">
            Contact Us
          </a>
        </li>
      </ul>
      <div className="footerService">
        <span className="serviceButton">Service Code</span>
      </div>
      <div className="footerCopyright">
        <span>© 1997-2023 Netflix, Inc</span>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Footer;
