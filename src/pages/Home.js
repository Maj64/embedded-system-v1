import { ChartComponent } from "../components";
import "../styles/Home.scss";

const Home = () => {
    return (
        <div className="home-container" style={{ position: "relative", margin: "auto", width: "80vw" }}>
            <ChartComponent />
        </div>
    );
};

export default Home;
