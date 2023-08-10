import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { Container, Row } from "react-bootstrap";
import moment from "moment";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart",
        },
    },
};

export default function ChartComponent({ infoDevice }) {
    console.log(infoDevice.results);
    const data = infoDevice?.results || [];
    const temArr = data.map((item) => item.temperature).reverse();
    const humArr = data.map((item) => item.humidity).reverse();
    const briArr = data.map((item) => item.brightness).reverse();
    const timeArr = data.map((item) => item.timestamp).reverse();

    
    for (var i = 0; i < timeArr.length; i++) {
        timeArr[i] = moment(timeArr[i]).format("YYYY-MM-DD HH:mm:ss");
    }

    const labels = timeArr;

    const labelList = ["Temperature", "Humidity", "Brightness"];
    const dataList = [temArr, humArr, briArr];
    const colorList = ["rgb(255, 99, 132)", "rgb(53, 162, 23)", "rgb(53, 162, 235)"];
    const bgColorList = ["rgba(255, 99, 132, 0.5)", "rgba(53, 162, 23, 0.5)", "rgba(53, 162, 235, 0.5)"];

    return (
        <Container>
            <Row>
                {labelList.map((labelItem, index) => {
                    const data = {
                        labels,
                        datasets: [
                            {
                                label: labelItem,
                                data: dataList[index],
                                borderColor: colorList[index],
                                backgroundColor: bgColorList[index],
                            },
                        ],
                    };
                    return (
                        <Row key={index}>
                            <Line options={options} data={data} updateMode="resize" />
                        </Row>
                    );
                })}
            </Row>
        </Container>
    );
    // return <Line options={options} data={data} updateMode="resize" />;
    // return <Line options={options} data={data} updateMode="resize" />;
}
