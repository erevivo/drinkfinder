import "./Logo.css";
import LogoImage from "../../../../assets/images/main_logo.png";
import { Component } from "react"
class Logo extends Component {
    public render(): JSX.Element {
        return (
            <div className="Logo">
                <img src={LogoImage} />
            </div>
        );
    }
}

export default Logo;