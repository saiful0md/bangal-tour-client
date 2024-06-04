import { FaFacebook, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";


const Footer = () => {
    return (
        <section>
            <footer className="footer max-w-[1210px] mx-auto p-10  text-base-content">
                <aside>
                    <img src="https://i.ibb.co/TH9qJRg/Orange-and-Blue-Travel-Agency-Logo.png" alt="" />
                    <p>Bangal Tour Ltd.<br /> since 1992</p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <button className=""><FaFacebook className="text-2xl text-blue-600"></FaFacebook></button>
                    <button className=""><FcGoogle className="text-2xl"></FcGoogle></button>
                    <button className=""><FaGithub className="text-2xl "></FaGithub></button>
                </nav>
            </footer>
            <div className="footer footer-center p-4  text-base-content">
                <aside>
                    <p>Copyright © 2024 - All right reserved by Bangal Tour Ltd</p>
                </aside>
            </div>
        </section>
    );
}

export default Footer;
