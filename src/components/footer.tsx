import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white/5 max-w-full mx-auto text-gray-300 px-4 mt-2 md:rounded-md py-5 rounded-md">
            <div className="mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                        <h3 className="text-white font-bold text-lg mb-2">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/#" className="text-gray-400 hover:text-white transition">Home</Link>
                            </li>
                            <li>
                                <Link to="/movies#trending" className="text-gray-400 hover:text-white transition">Movies</Link>
                            </li>
                            <li>
                                <Link to="/tvshow#trending" className="text-gray-400 hover:text-white transition">TV Shows</Link>
                            </li>
                            <li>
                                <Link to="/saved#" className="text-gray-400 hover:text-white transition">My Saved</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-2">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/#" className="text-gray-400 hover:text-white transition">Home</Link>
                            </li>
                            <li>
                                <Link to="/movies#trending" className="text-gray-400 hover:text-white transition">Movies</Link>
                            </li>
                            <li>
                                <Link to="/tvshow#trending" className="text-gray-400 hover:text-white transition">TV Shows</Link>
                            </li>
                            <li>
                                <Link to="/saved#" className="text-gray-400 hover:text-white transition">My Saved</Link>
                            </li>
                        </ul>
                    </div>

                     <div>
                        <h3 className="text-white font-bold text-lg mb-2">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link to="/#" className="text-gray-400 hover:text-white transition">Home</Link>
                            </li>
                            <li>
                                <Link to="/movies#trending" className="text-gray-400 hover:text-white transition">Movies</Link>
                            </li>
                            <li>
                                <Link to="/tvshow#trending" className="text-gray-400 hover:text-white transition">TV Shows</Link>
                            </li>
                            <li>
                                <Link to="/saved#" className="text-gray-400 hover:text-white transition">My Saved</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-2">Get Help</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#faq" className="text-gray-400 hover:text-white transition">FAQ</a>
                            </li>
                            <li>
                                <a href="#contact" className="text-gray-400 hover:text-white transition">Contact Us</a>
                            </li>
                            <li>
                                <a href="#privacy" className="text-gray-400 hover:text-white transition">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#terms" className="text-gray-400 hover:text-white transition">Terms of Service</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="https://x.com/kbrandng" className="text-gray-400 hover:text-blue-400 transition text-2xl">
                                <FaTwitter />
                            </a>
                            <a href="https://www.instagram.com/k.brand_ngho/" className="text-gray-400 hover:text-pink-500 transition text-2xl">
                                <FaInstagram />
                            </a>
                            <a href="https://www.linkedin.com/in/komofor-brandon-nghoneyi-151486396/" className="text-gray-400 hover:text-blue-600 transition text-2xl">
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/komoforbrandon" className="text-gray-400 hover:text-white transition text-2xl">
                                <FaGithub />
                            </a>
                        </div>
                    </div>
                </div>

                <div className=" pt-4">
                        <p className="flex items-center gap-1 mb-4 md:mb-0 uppercase">
                            &copy; {currentYear} Ndopflix. All rights reserved.
                        </p>
                </div>
            </div>
        </footer>
    );
}